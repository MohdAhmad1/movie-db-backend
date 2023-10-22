import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { TokenService } from './token.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [UserService, JwtService, PrismaService, TokenService],
})
export class AuthModule {}
