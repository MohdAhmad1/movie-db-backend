import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';

// I am just directly using bcrypt instead of Dependncy Injection

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(creds: LoginDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: creds.email,
      },
    });

    if (!user) throw new UnauthorizedException();

    const passCompareRes = await bcrypt.compare(creds.password, user.password);

    if (!passCompareRes) throw new UnauthorizedException();

    return { success: true };
  }

  async register(data: RegisterDTO) {
    // I am returning data for testing purpose only
    return this.prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: await this.hashPassword(data.password),
      },
    });
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
