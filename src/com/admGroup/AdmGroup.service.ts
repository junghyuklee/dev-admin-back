import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { AdmGroupRepository } from './AdmGroup.repository';
import { AdmGroupCreateDto } from './dto/AdmGroupCreate.dto';
import { AdmGroupUpdateDto } from './dto/AdmGroupUpdate.dto';
import { AdmGroupVo } from './vo/AdmGroup.vo';

@Injectable()
export class AdmGroupService {
  constructor(private admGroupRepository: AdmGroupRepository) {}
  /**
   * group_key 체크용 단일 조회
   * @param group_key
   * @returns group_id
   */
  async getOneGroupKeyCheck(
    group_key: string,
  ): Promise<AdmGroupVo | undefined> {
    return await this.admGroupRepository.getOneGroupKeyCheck(group_key);
  }

  /**
   * group_id 중복 체크용 단일 조회
   * @param group_id
   * @returns group_key
   */
  async getOneGroupIdCheck(group_id: string): Promise<AdmGroupVo | undefined> {
    return await this.admGroupRepository.getOneGroupIdCheck(group_id);
  }

  /**
   * group_info 단일 조회(Detail 화면)
   * @param group_key
   * @returns group_info
   */
  async selectGroup(group_key: string): Promise<AdmGroupVo | undefined> {
    return await this.admGroupRepository.selectGroup(group_key);
  }

  /**
   * 그룹 테이블 group_id or group_name like 검색
   * @param group_idnm
   * @returns 유저 정보(복수)
   */
  async searchGroups(group_idnm: string): Promise<AdmGroupVo[]> {
    return await this.admGroupRepository.searchGroups(group_idnm);
  }

  /**
   * 그룹 생성
   * @param groupData
   * @returns Boolean
   */
  async createGroup(groupData: AdmGroupCreateDto) {
    if (groupData && groupData.group_id) {
      if (!(await this.getOneGroupIdCheck(groupData.group_id))) {
        return await this.admGroupRepository.createGroup(groupData);
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
  async updateGroup(groupData: AdmGroupUpdateDto) {
    if (groupData && groupData.group_id) {
      if (await this.getOneGroupIdCheck(groupData.group_id)) {
        return await this.admGroupRepository.updateGroup(groupData);
      } else {
        const error = { message: '등록되지 않은 그룹 입니다.' };
        throw new HttpException(
          { message: 'Input data validation failed', error },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  /**
   * 그룹 삭제
   * @param groupKeyList
   * @returns
   */
  async deleteGroup(groupKeyList: any[]) {
    if (groupKeyList.length > 0) {
      for (const i in groupKeyList) {
        if (await this.getOneGroupKeyCheck(groupKeyList[i].key)) {
          await this.admGroupRepository.deleteGroup(groupKeyList[i].key);
        } else {
          const error = { message: '등록되지 않은 그룹 입니다.' };
          throw new HttpException(
            { message: 'Input data validation failed', error },
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      return 200;
    } else {
      const error = { message: '삭제하려는 그룹을 선택해주세요.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
