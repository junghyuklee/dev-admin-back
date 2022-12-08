import { AdmUserService } from './../admUser/AdmUser.service';
import { Payload } from './jwt/jwt.payload';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdmManageService } from '../admManage/AdmManage.service';
import { AdmManageDto } from '../admManage/dto/AdmManage.dto';
import { user } from '../interface/user';
import { PassWordService } from '../passWord/PassWord.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PassWordService,
    private readonly admManageService: AdmManageService,
    private readonly admUserService: AdmUserService,
  ) {}

  /**
   * 로그인 아이디 패스워드 체크
   * @param user_id
   * @param plainTextPassword
   * @returns jwt 토큰
   */
  async validateUser(
    user_id: string,
    plainTextPassword: string,
  ): Promise<AdmManageDto | undefined> {
    const admUser = await this.admManageService.getLoginUserInfo(user_id);
    if (admUser !== undefined && admUser.user_password !== undefined) {
      const passwordValid = await this.passwordService.validatePassword(
        plainTextPassword,
        admUser.user_password,
      );

      if (passwordValid) {
        return admUser;
      } else {
        throw new BadRequestException('패스워드가 맞지 않습니다.');
      }
    } else {
      throw new NotFoundException(`등록되지 않은 사용자 입니다.`);
    }
  }

  /**
   * 로그인
   * @param user_id
   * @param user_password
   * @returns jwt 토큰
   */
  async login(
    loginData: any,
  ): Promise<{ accessToken: string; userInfo: user; message: string }> {
    const userData = await this.validateUser(
      loginData.user_id,
      loginData.user_password,
    );
    let accessToken = '';
    let message = '';
    let userInfo: user = {
      user_key: '',
      user_id: '',
      user_login_fail_cnt: 0,
    };

    if (userData) {
      userData.user_key
        ? (userInfo.user_key = userData.user_key)
        : userInfo.user_key;
      userData.user_id
        ? (userInfo.user_id = userData.user_id)
        : userInfo.user_id;
      userData.user_login_fail_cnt
        ? (userInfo.user_login_fail_cnt = userData.user_login_fail_cnt)
        : userInfo.user_login_fail_cnt;
    }
    accessToken = this.jwtService.sign(userInfo);

    if (userInfo.user_login_fail_cnt > 10) {
      throw new BadRequestException('비밀번호 오류 횟수를 초과 하였습니다.');
    }

    return {
      accessToken,
      userInfo,
      message,
    };
  }

  /* 토큰 체크 */
  async tokenValidateUser(payload: Payload): Promise<AdmManageDto | undefined> {
    return await this.admUserService.getOneUserKeyCheck(payload.user_key);
  }
}
