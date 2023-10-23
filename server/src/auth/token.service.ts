import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async generateAccessToken(sub: string) {
    const token = await this.jwtService.signAsync(
      {
        sub,
        issuer: 'https://movies.db.com', // to be replaced by env variables,
        audience: 'https://movies.db.com',
        exp: Date.now() + Number(5000), // 3hours from now
        iat: Date.now(),
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );

    return token;
  }

  generateRefreshToken() {
    return crypto.randomUUID().replaceAll(/-/g, '');
  }

  async validateRefreshToken(previous_token: string) {
    const token = await this.prisma.refreshTokens.findFirst({
      where: { token: previous_token },
    });

    if (!token) throw new UnauthorizedException();

    // expire token on single use
    await this.deleteRefreshToken(previous_token);

    return {
      isValid: true,
      userId: token.userId,
    };
  }

  async deleteRefreshToken(token: string) {
    await this.prisma.refreshTokens.delete({ where: { token } });
  }
}
