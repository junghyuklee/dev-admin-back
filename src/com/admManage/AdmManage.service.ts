import { Injectable, Query } from '@nestjs/common';
import { AdmFileAuthVo } from './../admFileAuth/vo/AdmFileAuth.vo';
import { AdmGroupVo } from './../admGroup/vo/AdmGroup.vo';
import { AdmUserVo } from './../admUser/vo/AdmUser.vo';
import { AdmManageRepository } from './AdmManage.repository';
import { AdmManageVo } from './vo/AdmManage.vo';

@Injectable()
export class AdmManageService {
  constructor(private admManageRepository: AdmManageRepository) {}
  /**
   * 토큰 생성용 사용자 정보 조회
   * @param user_id
   * @returns user_id, user_password
   */
  async getLoginUserInfo(user_id: string): Promise<AdmManageVo | undefined> {
    return await this.admManageRepository.getLoginUserInfo(user_id);
  }

  /**
   * 사용자 정보 user_id or user_name like 검색
   * @param user_idnm
   * @returns 유저 정보(복수)
   */
  async searchUsers(user_idnm: string): Promise<AdmManageVo[]> {
    return await this.admManageRepository.searchUsers(user_idnm);
  }

  /**
   * 사용자별 그룹리스트 검색
   * @param user_key
   * @param group_idnm
   * @returns 그룹 리스트
   */
  async searchUserGroups(
    user_key: string,
    group_idnm: string,
  ): Promise<AdmGroupVo[]> {
    return await this.admManageRepository.searchUserGroups(
      user_key,
      group_idnm,
    );
  }

  /**
   * 사용자별 속하지 않은 그룹리스트 검색
   * @param user_key
   * @param group_idnm
   * @returns 그룹 리스트
   */
  async searchNoneUserGroups(
    user_key: string,
    group_idnm: string,
  ): Promise<AdmGroupVo[]> {
    return await this.admManageRepository.searchNoneUserGroups(
      user_key,
      group_idnm,
    );
  }

  /**
   * 그룹별 멤버리스트 검색
   * @param group_key
   * @param member_idnm
   * @returns 멤버 리스트
   */
  async searchGroupMembers(
    group_key: string,
    member_idnm: string,
  ): Promise<AdmManageVo[]> {
    return (
      await this.admManageRepository.searchGroupMembersGroup(
        group_key,
        member_idnm,
      )
    ).concat(
      await this.admManageRepository.searchGroupMembersUser(
        group_key,
        member_idnm,
      ),
    );
  }

  /**
   * 그룹별 속하지 않은 멤버리스트 검색
   * @param group_key
   * @param member_idnm
   * @returns 멤버 리스트
   */
  async searchNoneGroupMembers(
    group_key: string,
    member_idnm: string,
  ): Promise<AdmManageVo[]> {
    return (
      await this.admManageRepository.searchNoneGroupMembersGroup(
        group_key,
        member_idnm,
      )
    ).concat(
      await this.admManageRepository.searchNoneGroupMembersUser(
        group_key,
        member_idnm,
      ),
    );
  }

  /**
   * File에 권한을 갖고 있는 사용자, 그룹 검색
   * @param file_key
   * @returns 유저 또는 그룹 정보(복수)
   */
  async searchFileAuths(
    @Query('file_key') file_key: string,
    @Query('idnm') idnm: string,
  ): Promise<AdmFileAuthVo[]> {
    return (
      await this.admManageRepository.searchFileAuthGroup(file_key, idnm)
    ).concat(await this.admManageRepository.searchFileAuthUser(file_key, idnm));
  }

  /**
   * File에 권한을 갖고 없는 사용자, 그룹 검색
   * @param file_key
   * @returns 유저 또는 그룹 정보(복수)
   */
  async searchNoneFileAuths(
    @Query('file_key') file_key: string,
    @Query('idnm') idnm: string,
  ): Promise<AdmFileAuthVo[]> {
    return (
      await this.admManageRepository.searchNoneFileAuthGroup(file_key, idnm)
    ).concat(
      await this.admManageRepository.searchNoneFileAuthUser(file_key, idnm),
    );
  }
}
