import { Payload } from './jwt/jwt.payload';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassWordService } from '../passWord/PassWord.service';
import { AdmManageService } from '../admManage/AdmManage.service';
import { AdmManageDto } from '../admManage/dto/AdmManage.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    private readonly passwordService: PassWordService,

    private readonly admManageService: AdmManageService,
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
    const admUser = await this.admManageService.getUserLogin(user_id);
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
  async login(loginData: any): Promise<{ accessToken: string }> {
    const userData = await this.validateUser(
      loginData.user_id,
      loginData.user_password,
    );
    const payload: Payload = {
      user_id: '',
      user_name: '',
      user_admin_flag: '',
      group_key: '',
    };
    if (userData) {
      payload.user_id = userData.user_id ? userData.user_id : '';
      payload.user_name = userData.user_name ? userData.user_name : '';
      payload.user_admin_flag = userData.user_admin_flag
        ? userData.user_admin_flag
        : '';
      payload.group_key = userData.group_key ? userData.group_key : '';
    }
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
