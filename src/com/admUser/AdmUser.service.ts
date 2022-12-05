import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassWordService } from '../passWord/PassWord.service';
import { AdmUserDto } from './dto/AdmUser.dto';
import { AdmUser } from './entities/AdmUser.entity';

@Injectable()
export class AdmUserService {
  constructor(
    @InjectRepository(AdmUser)
    private admUserRepository: Repository<AdmUser>,
    private readonly passwordService: PassWordService,
  ) {}
  /**
   * user_key 체크용 단일 조회
   * @param user_key
   * @returns user_key, user_password
   */
  async getOneUserKeyCheck(user_key?: string): Promise<AdmUser | undefined> {
    return await this.admUserRepository
      .createQueryBuilder()
      .select(['user_id', 'user_password'])
      .where('user_key = :user_key', { user_key: `${user_key}` })
      .getRawOne();
  }

  /**
   * user_id 중복 체크용 단일 조회
   * @param user_id
   * @returns user_key, user_password
   */
  async getOneUserIdCheck(user_id?: string): Promise<AdmUser | undefined> {
    return await this.admUserRepository
      .createQueryBuilder()
      .select(['user_key', 'user_password'])
      .where('user_id = :user_id', { user_id: `${user_id}` })
      .getRawOne();
  }

  /**
   * user_info 단일 조회
   * @param user_key
   * @returns user_info
   */
  async selectUser(user_key?: string): Promise<AdmUser | undefined> {
    return await this.admUserRepository
      .createQueryBuilder()
      .select([
        'user_key',
        'user_id',
        'user_name',
        'user_desc',
        'user_admin_flag',
        'use_yn',
      ])
      .where('user_key = :user_key', { user_key: `${user_key}` })
      .getRawOne();
  }

  /**
   * 유저 생성
   * @param userData
   * @returns
   */
  async createUser(userData: AdmUserDto) {
    if (!(await this.getOneUserIdCheck(userData.user_id))) {
      if (userData.user_password !== undefined) {
        userData.user_password = await this.passwordService.hashPassword(
          userData.user_password,
        );
      }
      return await this.admUserRepository.save(userData);
    } else {
      const error = { message: '이미 사용중인 아이디 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * 유저 정보 수정
   * @param usersData
   * @returns
   */
  async updateUser(userData: AdmUserDto) {
    if (await this.getOneUserIdCheck(userData.user_id)) {
      if (userData.user_password !== undefined) {
        userData.user_password = await this.passwordService.hashPassword(
          userData.user_password,
        );
      }
      return await this.admUserRepository.update(
        {
          user_key: userData.user_key,
        },
        userData,
      );
    } else {
      const error = { message: '등록되지 않은 사용자 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
