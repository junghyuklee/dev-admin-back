import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AdmGroup } from './entities/AdmGroup.entity';

@Injectable()
export class AdmGroupRepository extends Repository<AdmGroup> {
  /**
   * group_key 체크용 단일 조회
   * @param group_key
   * @returns group_id
   */
  async getOneGroupKeyCheck(group_key: string): Promise<AdmGroup | undefined> {
    return await this.createQueryBuilder()
      .select(['group_id'])
      .where('group_key = :group_key', { group_key: `${group_key}` })
      .getRawOne();
  }

  /**
   * group_id 중복 체크용 단일 조회
   * @param group_id
   * @returns group_key
   */
  async getOneGroupIdCheck(group_id?: string): Promise<AdmGroup | undefined> {
    return await this.createQueryBuilder()
      .select(['group_key'])
      .where('group_id = :group_id', { group_id: `${group_id}` })
      .getRawOne();
  }

  /**
   * 그룹 테이블 group_id or group_name like 검색
   * @param group_idnm
   * @returns 유저 정보(복수)
   */
  async searchGroups(group_idnm: string): Promise<AdmGroup[]> {
    return await this.createQueryBuilder()
      .select([
        'group_key',
        'group_id',
        'group_name',
        'group_desc',
        'use_yn',
        'DATE_FORMAT(created_at,"%Y-%m-%d") AS "created_date"',
        'create_user_id',
        'DATE_FORMAT(updated_at,"%Y-%m-%d") AS "updated_date"',
        'update_user_id',
      ])
      .where('group_id like :group_id', { group_id: `%${group_idnm}%` })
      .orWhere('group_name like :group_name', { group_name: `%${group_idnm}%` })
      .addOrderBy('group_id', 'ASC')
      .getRawMany();
  }
}
