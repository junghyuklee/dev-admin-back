import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdmUserCreateDto } from './dto/AdmUserCreate.dto';
import { AdmUserUpdateDto } from './dto/AdmUserUpdate.dto';
import { AdmUserUpdatePasswordDto } from './dto/AdmUserUpdatePassword.dto';
import { AdmUser } from './entities/AdmUser.entity';

@Injectable()
export class AdmUserRepository {
  constructor(
    @InjectRepository(AdmUser)
    private admUserRepository: Repository<AdmUser>,
  ) {}
  /**
   * user_key 체크용 단일 조회
   * @param user_key
   * @returns user_key, user_password
   */
  async getOneUserKeyCheck(user_key: string): Promise<AdmUser | undefined> {
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
  async getOneUserIdCheck(user_id: string): Promise<AdmUser | undefined> {
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
  async createUser(userData: AdmUserCreateDto) {
    /* Type-ORM 기본제공 save */
    return await this.admUserRepository.save(userData);
  }

  /**
   * 유저 정보 수정
   * @param usersData
   * @returns
   */
  async updateUser(userData: AdmUserUpdateDto) {
    /* Type-ORM 기본제공 update */
    return await this.admUserRepository.update(
      {
        user_key: userData.user_key,
      },
      userData,
    );
  }

  /**
   * 유저 패스워드 수정
   * @param usersData
   * @returns
   */
  async updateUserPassword(userData: AdmUserUpdatePasswordDto) {
    console.log(userData);
    /* Type-ORM 기본제공 update */
    return await this.admUserRepository.update(
      {
        user_key: userData.user_key,
      },
      userData,
    );
  }

  /**
   * 유저 삭제
   * @param user_key
   * @returns
   */
  async deleteUser(user_key: string) {
    /* Type-ORM 기본제공 update */
    return await this.admUserRepository.update(
      {
        user_key: user_key,
      },
      {
        use_yn: 'N',
      },
    );
  }
}
