import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly pService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async generateAccessToken(sub: string) {
    const token = await this.jwtService.signAsync({
      sub,
      issuer: 'https://movies.db.com', // to be replaced by env variables,
      audience: 'https://movies.db.com',
      exp: Date.now() + 60 * 3000, // 3hours from now
      iat: Date.now(),
    });

    return token;
  }

  generateRefreshToken() {
    return crypto.randomUUID().replaceAll(/-/g, '');
  }
}
