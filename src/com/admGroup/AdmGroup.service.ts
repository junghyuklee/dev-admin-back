import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { AdmGroupRepository } from './AdmGroup.repository';
import { AdmGroupDto } from './dto/AdmGroup.dto';
import { AdmGroup } from './entities/AdmGroup.entity';

@Injectable()
export class AdmGroupService {
  constructor(private admGroupRepository: AdmGroupRepository) {}
  /**
   * group_key 체크용 단일 조회
   * @param group_key
   * @returns group_id
   */
  async getOneGroupKeyCheck(group_key: string): Promise<AdmGroup | undefined> {
    return await this.admGroupRepository.getOneGroupKeyCheck(group_key);
  }

  /**
   * group_id 중복 체크용 단일 조회
   * @param group_id
   * @returns group_key
   */
  async getOneGroupIdCheck(group_id: string): Promise<AdmGroup | undefined> {
    return await this.admGroupRepository.getOneGroupIdCheck(group_id);
  }

  /**
   * 그룹 테이블 group_id or group_name like 검색
   * @param group_idnm
   * @returns 유저 정보(복수)
   */
  async searchGroups(group_idnm: string): Promise<AdmGroup[]> {
    return await this.admGroupRepository.searchGroups(group_idnm);
  }

  /**
   * 그룹 생성
   * @param groupData
   * @returns Boolean
   */
  async createGroup(groupData: AdmGroupDto) {
    if (groupData && groupData.group_id) {
      if (await this.getOneGroupIdCheck(groupData.group_id)) {
        /* Type-ORM 기본제공 save */
        return await this.admGroupRepository.save(groupData);
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
   * 그룹 정보 수정
   * @param groupData
   * @returns Boolean
   */
  async updateGroup(groupData: AdmGroupDto) {
    if (groupData && groupData.group_id) {
      if (await this.getOneGroupIdCheck(groupData.group_id)) {
        return await this.admGroupRepository.update(
          {
            group_key: groupData.group_key,
          },
          groupData,
        );
      } else {
        const error = { message: '등록되지 않은 그룹 입니다.' };
        throw new HttpException(
          { message: 'Input data validation failed', error },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
