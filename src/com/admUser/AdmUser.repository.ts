import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AdmUser } from './entities/AdmUser.entity';

@Injectable()
export class AdmUserRepository extends Repository<AdmUser> {
  /**
   * user_key 체크용 단일 조회
   * @param user_key
   * @returns user_key, user_password
   */
  async getOneUserKeyCheck(user_key: string): Promise<AdmUser | undefined> {
    return await this.createQueryBuilder()
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
    return await this.createQueryBuilder()
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
    return await this.createQueryBuilder()
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
}
