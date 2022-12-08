import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { AdmManageRepository } from './AdmManage.repository';
import { AdmManageDto } from './dto/AdmManage.dto';

@Injectable()
export class AdmManageService {
  constructor(private admManageRepository: AdmManageRepository) {}
  /**
   * 토큰 생성용 사용자 정보 조회
   * @param user_id
   * @returns user_id, user_password
   */
  async getLoginUserInfo(user_id: string): Promise<AdmManageDto | undefined> {
    return await this.admManageRepository.getLoginUserInfo(user_id);
  }

  /**
   * 사용자 정보 user_id or user_name like 검색
   * @param user_idnm
   * @returns 유저 정보(복수)
   */
  async searchUsers(user_idnm: string): Promise<AdmManageDto[]> {
    return await this.admManageRepository.searchUsers(user_idnm);
  }

  /**
   * Group Member 검색
   * @param group_key
   * @returns 유저 정보(복수)
   */
  async searchGroupMembers(group_key: string): Promise<AdmManageDto[]> {
    if (group_key) {
      return (
        await this.admManageRepository.searchGroupMemberGroup(group_key)
      ).concat(await this.admManageRepository.searchGroupMemberUser(group_key));
    } else {
      const error = { message: '잘못된 그룹 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * File Auth 사용자, 그룹 검색
   * @param file_key
   * @returns 유저 또는 그룹 정보(복수)
   */
  async searchFileAuths(file_key: string): Promise<AdmManageDto[]> {
    if (file_key) {
      return (
        await this.admManageRepository.searchFileAuthGroup(file_key)
      ).concat(await this.admManageRepository.searchFileAuthUser(file_key));
    } else {
      const error = { message: '잘못된 정보 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
