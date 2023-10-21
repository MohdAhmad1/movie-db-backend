import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserService],
  controllers: [AuthController],
  providers: [UserService, JwtService],
})
export class AuthModule {}
