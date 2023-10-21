import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UserService } from 'src/user/user.service';

// I am just directly using bcrypt instead of Dependncy Injection

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(creds: LoginDTO) {
    const user = await this.userService.findUserByEmail(creds.email);

    if (!user) throw new UnauthorizedException();

    const passCompareRes = await bcrypt.compare(creds.password, user.password);
    if (!passCompareRes) throw new UnauthorizedException();

    delete user.password;

    return {
      access_token: await this.jwtService.signAsync(user),
      refresh_token: await this.generateRefreshToken(user.id),
      user,
    };
  }

  async register(data: RegisterDTO) {
    return this.userService.createUser({
      email: data.email.toLowerCase(),
      firstName: data.firstName,
      lastName: data.lastName,
      password: await bcrypt.hash(data.password, 10),
    });
  }

  private async generateRefreshToken(userId: string) {
    const refresh_token = await this.prisma.refreshTokens.create({
      data: {
        userId,
        token: crypto.randomUUID().replaceAll(/-/g, ''),
      },
    });

    return refresh_token.token;
  }

  async genereateNewAccessToken(token: string) {
    const refreshTokenEntity = await this.prisma.refreshTokens.findFirst({
      where: { token },
      include: {
        user: true,
      },
    });

    if (!refreshTokenEntity) throw new UnauthorizedException();

    await this.prisma.refreshTokens.delete({
      where: { token: refreshTokenEntity.token },
    });

    const { user } = refreshTokenEntity;
    delete user.password;

    return {
      access_token: await this.jwtService.signAsync(user),
      refresh_token: await this.generateRefreshToken(user.id),
      user,
    };
  }
}
