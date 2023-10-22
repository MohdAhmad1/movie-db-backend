import {
  Body,
  ConflictException,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto/login.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { RegisterDTO } from './dto/register.dto';
import { TokenService } from './token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('/login')
  async login(@Body() creds: LoginDTO) {
    const user = await this.userService.findUserByEmail(creds.email);

    if (!user) throw new UnauthorizedException();

    const passCompareRes = await bcrypt.compare(creds.password, user.password);

    if (!passCompareRes) throw new UnauthorizedException();

    delete user.password;

    const accessToken = await this.tokenService.generateAccessToken(user.id);

    const refreshToken = this.tokenService.generateRefreshToken();

    await this.userService.updateUser(user.id, {
      RefreshTokens: {
        create: {
          token: refreshToken,
        },
      },
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  @Post('/register')
  async register(@Body() creds: RegisterDTO) {
    const exsist = await this.userService.userExsist(creds.email);

    if (exsist)
      throw new ConflictException('user with this email already exsist');

    const refreshToken = this.tokenService.generateRefreshToken();

    const user = await this.userService.createUser({
      email: creds.email.toLowerCase(),
      firstName: creds.firstName,
      lastName: creds.lastName,
      password: await bcrypt.hash(creds.password, 10),
      RefreshTokens: {
        create: {
          token: refreshToken,
        },
      },
    });

    const accessToken = await this.tokenService.generateAccessToken(user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('/refresh-token')
  async refreshToken(@Body() body: RefreshTokenDTO) {
    // first check if the current refresh token is valid
    const tokenValidationResult = await this.tokenService.validateRefreshToken(
      body.refresh_token,
    );

    const refreshToken = this.tokenService.generateRefreshToken();

    const user = await this.userService.updateUser(
      tokenValidationResult.userId,
      {
        RefreshTokens: {
          create: {
            token: refreshToken,
          },
        },
      },
    );

    const accessToken = await this.tokenService.generateAccessToken(user.id);

    return {
      accessToken,
      refreshToken,
    };
  }
}
