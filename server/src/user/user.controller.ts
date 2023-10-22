import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  @Get()
  @UseGuards(AuthGuard)
  profile(@Req() req: any) {
    return req.user;
  }
}
