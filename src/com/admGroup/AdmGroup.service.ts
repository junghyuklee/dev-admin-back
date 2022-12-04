import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdmGroupDto } from './dto/AdmGroup.dto';
import { AdmGroup } from './entities/AdmGroup.entity';

@Injectable()
export class AdmGroupService {
  constructor(
    @InjectRepository(AdmGroup)
    private admGroupRepository: Repository<AdmGroup>,
  ) {}
  /**
   * group_key 체크용 단일 조회
   * @param group_key
   * @returns group_id
   */
  async getOneGroupKeyCheck(group_key?: string): Promise<AdmGroup | undefined> {
    return await this.admGroupRepository
      .createQueryBuilder()
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
    return await this.admGroupRepository
      .createQueryBuilder()
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
    group_idnm === undefined || group_idnm === null
      ? (group_idnm = '')
      : group_idnm;
    return await this.admGroupRepository
      .createQueryBuilder()
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

  /**
   * 그룹 생성
   * @param groupData
   * @returns Boolean
   */
  async createGroup(groupData: AdmGroupDto) {
    if (!(await this.getOneGroupIdCheck(groupData.group_id))) {
      await this.admGroupRepository.save(groupData);
    } else {
      const error = { group_id: '이미 사용중인 아이디 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * 그룹 정보 수정
   * @param groupData
   * @returns Boolean
   */
  async updateGroup(groupData: AdmGroupDto) {
    if (await this.getOneGroupIdCheck(groupData.group_id)) {
      await this.admGroupRepository.update(
        {
          group_key: groupData.group_key,
        },
        groupData,
      );
    } else {
      const error = { user_key: '등록되지 않은 그룹 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
