import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // usernaem 키 이름 변경 user_id로 요청
    super({
      usernameField: 'user_id',
    });
  }

  async validate(loginData: any): Promise<any> {
    const user = await this.authService.login(loginData);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
