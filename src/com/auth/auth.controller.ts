import { Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(readonly AuthService: AuthService) {}

  @Post('/login')
  login(@Req() request: Request) {
    const { user_id, password } = request.body;
    return this.AuthService.login(user_id, password);
  }

  @Get('/getUserAuth')
  getUserAuth() {}

  @Get('/logout')
  logout() {}
}
