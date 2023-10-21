import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() creds: LoginDTO) {
    return this.authService.login(creds);
  }

  @Post('/register')
  register(@Body() creds: RegisterDTO) {
    return this.authService.login(creds);
  }
}
