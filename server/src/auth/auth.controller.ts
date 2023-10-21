import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() creds: LoginDTO) {
    return this.authService.login(creds);
  }

  @Post('/register')
  register(@Body() creds: RegisterDTO) {
    return this.authService.register(creds);
  }

  @Post('/refresh-token')
  refreshToken(@Body() body: RefreshTokenDTO) {
    return this.authService.genereateNewAccessToken(body.refresh_token);
  }
}
