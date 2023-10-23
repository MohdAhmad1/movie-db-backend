import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  profile(@Req() req: any) {
    return req.user;
  }
}
