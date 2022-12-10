import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { PassWordService } from '../passWord/PassWord.service';
import { AdmUserRepository } from './AdmUser.repository';
import { AdmUserCreateDto } from './dto/AdmUserCreate.dto';
import { AdmUserUpdateDto } from './dto/AdmUserUpdate.dto';
import { AdmUserUpdatePasswordDto } from './dto/AdmUserUpdatePassword.dto';
import { AdmUser } from './entities/AdmUser.entity';

@Injectable()
export class AdmUserService {
  constructor(
    readonly admUserRepository: AdmUserRepository,

    // @InjectRepository(AdmUser)
    // private admUserRepository: Repository<AdmUser>,
    private readonly passwordService: PassWordService,
  ) {}
  /**
   * user_key 체크용 단일 조회
   * @param user_key
   * @returns user_id, user_password
   */
  async getOneUserKeyCheck(user_key: string): Promise<AdmUser | undefined> {
    return await this.admUserRepository.getOneUserKeyCheck(user_key);
  }

  /**
   * user_id 중복 체크용 단일 조회
   * @param user_id
   * @returns user_key, user_password
   */
  async getOneUserIdCheck(user_id: string): Promise<AdmUser | undefined> {
    return await this.admUserRepository.getOneUserIdCheck(user_id);
  }

  /**
   * user_info 단일 조회(Detail 화면)
   * @param user_key
   * @returns user_info
   */
  async selectUser(user_key: string): Promise<AdmUser | undefined> {
    return await this.admUserRepository.selectUser(user_key);
  }

  /**
   * 유저 생성
   * @param userData
   * @returns
   */
  async createUser(userData: AdmUserCreateDto) {
    if (userData && userData.user_id && userData.user_password) {
      if (await this.getOneUserIdCheck(userData.user_id)) {
        userData.user_password = await this.passwordService.hashPassword(
          userData.user_password,
        );
        return await this.admUserRepository.createUser(userData);
      } else {
        const error = { message: '이미 사용중인 아이디 입니다.' };
        throw new HttpException(
          { message: 'Input data validation failed', error },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  /**
   * 유저 정보 수정
   * @param usersData
   * @returns
   */
  async updateUser(userData: AdmUserUpdateDto) {
    if (userData && userData.user_id) {
      if (await this.getOneUserIdCheck(userData.user_id)) {
        return await this.admUserRepository.updateUser(userData);
      } else {
        const error = { message: '등록되지 않은 사용자 입니다.' };
        throw new HttpException(
          { message: 'Input data validation failed', error },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  /**
   * 유저 패스워드 수정
   * @param usersData
   * @returns
   */
  async updateUserPassword(userData: AdmUserUpdatePasswordDto) {
    if (userData && userData.user_key) {
      if (await this.getOneUserKeyCheck(userData.user_key)) {
        if (userData.user_password) {
          userData.user_password = await this.passwordService.hashPassword(
            userData.user_password,
          );
        }
        return await this.admUserRepository.updateUserPassword(userData);
      }
    } else {
      const error = { message: '등록되지 않은 사용자 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
