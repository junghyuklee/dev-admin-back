import { Body, Controller, Post, Response, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: any, @Response() res: any): Promise<any> {
    const payload = await this.authService.login(body);
    res.send({
      accessToken: payload.accessToken,
      userInfo: payload.userInfo,
      message: 'success',
    });
  }
}
