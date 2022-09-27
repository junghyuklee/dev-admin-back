import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassWordService } from '../pass-word/pass-word.service';
import { Users } from '../Users/entities/Users.entity';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    private readonly usersService: UsersService,

    private readonly passwordService: PassWordService,
  ) {}

  /**
   * 로그인 아이디 패스워드 체크
   * @param user_id
   * @param plainTextPassword
   * @returns JWT 토큰
   */
  async validateUser(
    user_id: string,
    plainTextPassword: string,
  ): Promise<Users> {
    const user = await this.usersService.getOne(user_id);
    if (user) {
      const passwordValid = await this.passwordService.validatePassword(
        plainTextPassword,
        user.password,
      );
      if (passwordValid) {
        const userData = await this.usersService.getUser(user_id);
        return userData;
      } else {
        throw new BadRequestException('패스워드가 맞지 않습니다.');
      }
    } else {
      throw new NotFoundException(
        `등록되지 않은 사용자 입니다. id:${user.user_id}.`,
      );
    }
  }

  /**
   * 로그인
   * @param user_id
   * @param password
   * @returns jwt 토큰
   */
  async login(user_id: string, password: string) {
    const user = await this.validateUser(user_id, password);
    const payload = { user_id: user.user_id, user_nm: user.user_nm };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
