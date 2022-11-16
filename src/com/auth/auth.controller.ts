import { AuthService } from './auth.service';
import { Controller, Body, Response, UseGuards, Post } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { LocalAuthGuard } from '../auth/guard/local.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: any, @Response() res: any): Promise<any> {
    const jwt = await this.authService.login(body);
    res.send({
      accessToken: jwt.accessToken,
      message: 'success',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logOutlogin(@Body() body: any, @Response() res: any) {
    res.cookie('jwt', '');
    return res.sendStatus(200);
  }
}
