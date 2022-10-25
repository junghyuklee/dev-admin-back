import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../jwt/jwt.constants';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 쿠키 방식 테스트 후 변경 필요
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   (request: Request) => {
      //     return request?.cookies?.Authentication;
      //   },
      // ]),

      //Request에서 JWT 토큰을 추출하는 방법을 설정 -> Authorization에서 Bearer Token에 JWT 토큰을 담아 전송해야한다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //true로 설정하면 Passport에 토큰 검증을 위임하지 않고 직접 검증, false는 Passport에 검증 위임
      ignoreExpiration: false,
      //검증 비밀 값(유출 주위)
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * 클라이언트가 전송한 jwt 토큰 info
   * @param payload 토큰 내용
   * @returns
   */
  async validate(payload: any) {
    console.log(payload);
    return { user_id: payload.user_id, user_nm: payload.user_nm };
  }
}