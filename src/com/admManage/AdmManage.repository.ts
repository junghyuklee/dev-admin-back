import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdmUser } from 'src/com/admUser/entities/AdmUser.entity';
import { Repository } from 'typeorm';
import { AdmFile } from '../admFile/entities/AdmFile.entity';
import { AdmGroup } from '../admGroup/entities/AdmGroup.entity';
import { AdmGroupMember } from '../admGroupMember/entities/AdmGroupMember.entity';
import { AdmFileAuth } from './../admFileAuth/entities/AdmFileAuth.entity';
import { AdmFileAuthVo } from './../admFileAuth/vo/AdmFileAuth.vo';
import { AdmGroupVo } from './../admGroup/vo/AdmGroup.vo';
import { AdmUserVo } from './../admUser/vo/AdmUser.vo';
import { AdmManageVo } from './vo/AdmManage.vo';

@Injectable()
export class AdmManageRepository {
  constructor(
    @InjectRepository(AdmUser)
    private admUserManageRepository: Repository<AdmUser>,

    @InjectRepository(AdmGroup)
    private admGroupManageRepository: Repository<AdmGroup>,

    @InjectRepository(AdmGroupMember)
    private admGroupMemberManageRepository: Repository<AdmGroupMember>,

    @InjectRepository(AdmFile)
    private admFileManageRepository: Repository<AdmFile>,

    @InjectRepository(AdmFileAuth)
    private admFileAuthManageRepository: Repository<AdmFileAuth>,
  ) {}
  /**
   * 토큰 생성용 사용자 정보 조회
   * @param user_id
   * @returns 사용자 정보
   */
  async getLoginUserInfo(user_id?: string): Promise<AdmManageVo | undefined> {
    return await this.admUserManageRepository
      .createQueryBuilder('user')
      .select([
        'user.user_key AS "user_key"',
        'user.user_id AS "user_id"',
        'user.user_password AS "user_password"',
        'user.user_login_fail_cnt AS "user_login_fail_cnt"',
        'user.user_admin_flag AS "user_admin_flag"',
      ])
      .where('user.user_id = :user_id', { user_id: `${user_id}` })
      .andWhere('user.use_yn = "Y"')
      .getRawOne();
  }

  /**
   * 사용자 정보 user_id or user_name like 검색
   * @param user_idnm
   * @returns 사용자 정보(복수)
   */
  async searchUsers(user_idnm: string): Promise<AdmManageVo[]> {
    /**
     * 사용자 별 그룹 리스트 조회 subquery
     */
    const getUserGroupsList = this.admUserManageRepository
      .createQueryBuilder()
      .subQuery()
      .select([
        'user.user_key AS "user_key"',
        'group_concat(group.group_name) AS "group_name_list"',
      ])
      .from(AdmUser, 'user')
      .leftJoin(
        AdmGroupMember,
        'groupMember',
        'user.user_key = groupMember.child_key',
      )
      .leftJoin(AdmGroup, 'group', 'groupMember.parent_key = group.group_key')
      .where('group.use_yn = "Y"')
      .groupBy('user.user_key')
      .getQuery();

    return await this.admUserManageRepository
      .createQueryBuilder('user')
      .distinct()
      .select([
        'user.user_key AS "user_key"',
        'user.user_id AS "user_id"',
        'DATE_FORMAT(user.user_password_chg_date,"%Y-%m-%d") AS "user_password_chg_date"',
        'user.user_name AS "user_name"',
        'user.user_login_fail_cnt AS "user_login_fail_cnt"',
        'user.user_admin_flag AS "user_admin_flag"',
        'user.user_desc AS "user_desc"',
        'user.use_yn AS "use_yn"',
        'DATE_FORMAT(user.created_at,"%Y-%m-%d") AS "created_dt"',
        'user.create_user_id AS "create_user_id"',
        'DATE_FORMAT(user.updated_at,"%Y-%m-%d") AS "updated_dt"',
        'user.update_user_id AS "update_user_id"',
        'userGroup.group_name_list AS "group_name_list"',
      ])
      .leftJoin(
        AdmGroupMember,
        'groupMember',
        'user.user_key = groupMember.child_key',
      )
      .leftJoin(AdmGroup, 'group', 'groupMember.parent_key = group.group_key')
      .leftJoin(
        getUserGroupsList,
        'userGroup',
        'user.user_key = userGroup.user_key',
      )
      .where(
        '(user.user_id like :user_idnm or user.user_name like :user_idnm)',
        { user_idnm: `%${user_idnm}%` },
      )
      .addOrderBy('user.user_id', 'ASC')
      .getRawMany();
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
    return this.admGroupMemberManageRepository
      .createQueryBuilder('groupMember')
      .select([
        'groupMember.parent_key AS "group_key"',
        'group.group_id AS "group_id"',
        'group.group_name AS "group_name"',
        'group.group_desc AS "group_desc"',
      ])
      .leftJoin(AdmGroup, 'group', 'groupMember.parent_key = group.group_key')
      .where('groupMember.child_key = :user_key', { user_key: `${user_key}` })
      .andWhere('group.use_yn = "Y"')
      .andWhere(
        '(group.group_id like :group_idnm or group.group_name like :group_idnm)',
        {
          group_idnm: `%${group_idnm}%`,
        },
      )
      .andWhere('groupMember.child_internal_div_cd = "U0"')
      .orderBy('group.group_id')
      .getRawMany();
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
    const getNoneUserGroupList = this.admGroupMemberManageRepository
      .createQueryBuilder()
      .subQuery()
      .select(['groupMember.parent_key AS "group_key"'])
      .from(AdmGroupMember, 'groupMember')
      .where(`groupMember.child_key = '${user_key}'`)
      .getQuery();

    return this.admGroupManageRepository
      .createQueryBuilder('group')
      .select([
        'group.group_key AS "group_key"',
        'group.group_id AS "group_id"',
        'group.group_name AS "group_name"',
        'group.group_desc AS "group_desc"',
      ])
      .where('group.group_key NOT IN (' + getNoneUserGroupList + ')')
      .andWhere('group.use_yn = "Y"')
      .andWhere(
        '(group.group_id like :group_idnm or group.group_name like :group_idnm)',
        {
          group_idnm: `%${group_idnm}%`,
        },
      )
      .orderBy('group.group_id')
      .getRawMany();
  }

  /**
   * 그룹별 자식리스트 검색(그룹)
   * @param group_key
   * @param member_idnm
   * @returns 멤버 리스트(그룹)
   */
  async searchGroupMembersGroup(
    group_key: string,
    member_idnm: string,
  ): Promise<AdmManageVo[]> {
    return this.admGroupMemberManageRepository
      .createQueryBuilder('groupMember')
      .select([
        'groupMember.child_key AS "child_key"',
        'group.group_id AS "child_id"',
        'group.group_name AS "child_name"',
        'groupMember.child_internal_div_cd AS "child_internal_div_cd"',
        '"그룹" AS "child_internal_div_nm"',
        'group.group_desc AS "child_desc"',
      ])
      .leftJoin(AdmGroup, 'group', 'groupMember.child_key = group.group_key')
      .where('groupMember.child_internal_div_cd = "G0"')
      .andWhere('groupMember.parent_key = :group_key', {
        group_key: `${group_key}`,
      })
      .andWhere('group.use_yn = "Y"')
      .andWhere(
        '(group.group_id like :member_idnm or group.group_name like :member_idnm)',
        {
          member_idnm: `%${member_idnm}%`,
        },
      )
      .orderBy('group.group_id')
      .getRawMany();
  }

  /**
   * 그룹별 자식리스트 검색(사용자)
   * @param group_key
   * @param member_idnm
   * @returns 멤버 리스트(사용자)
   */
  async searchGroupMembersUser(
    group_key: string,
    member_idnm: string,
  ): Promise<AdmManageVo[]> {
    return this.admGroupMemberManageRepository
      .createQueryBuilder('groupMember')
      .select([
        'groupMember.child_key AS "child_key"',
        'user.user_id AS "child_id"',
        'user.user_name AS "child_name"',
        'groupMember.child_internal_div_cd AS "child_internal_div_cd"',
        '"사용자" AS "child_internal_div_nm"',
        'user.user_desc AS "child_desc"',
      ])
      .leftJoin(AdmUser, 'user', 'groupMember.child_key = user.user_key')
      .where('groupMember.child_internal_div_cd = "U0"')
      .andWhere('groupMember.parent_key = :group_key', {
        group_key: `${group_key}`,
      })
      .andWhere('user.use_yn = "Y"')
      .andWhere(
        '(user.user_id like :member_idnm or user.user_name like :member_idnm)',
        {
          member_idnm: `%${member_idnm}%`,
        },
      )
      .orderBy('user.user_id')
      .getRawMany();
  }

  /**
   * 그룹별 속하지 않은 멤버리스트 검색(그룹)
   * @param group_key
   * @param member_idnm
   * @returns 멤버 리스트(그룹)
   */
  async searchNoneGroupMembersGroup(
    group_key: string,
    member_idnm: string,
  ): Promise<AdmManageVo[]> {
    const getMemberList = this.admGroupMemberManageRepository
      .createQueryBuilder()
      .subQuery()
      .select(['groupMember.child_key AS "group_key"'])
      .from(AdmGroupMember, 'groupMember')
      .where(`groupMember.parent_key = '${group_key}'`)
      .andWhere('groupMember.child_internal_div_cd = "G0"')
      .getQuery();

    return this.admGroupManageRepository
      .createQueryBuilder('group')
      .select([
        'group.group_key AS "child_key"',
        'group.group_id AS "child_id"',
        'group.group_name AS "child_name"',
        'group.internal_div_cd AS "child_internal_div_cd"',
        '"그룹" AS "child_internal_div_nm"',
        'group.group_desc AS "child_desc"',
      ])
      .where('group.group_key NOT IN (' + getMemberList + ')')
      .andWhere(`group.group_key != '${group_key}'`)
      .andWhere('group.use_yn = "Y"')
      .andWhere(
        '(group.group_id like :member_idnm or group.group_name like :member_idnm)',
        {
          member_idnm: `%${member_idnm}%`,
        },
      )
      .orderBy('group.group_id')
      .getRawMany();
  }

  /**
   * 그룹별 속하지 않은 멤버리스트 검색(사용자)
   * @param group_key
   * @param member_idnm
   * @returns 멤버 리스트(사용자)
   */
  async searchNoneGroupMembersUser(
    group_key: string,
    member_idnm: string,
  ): Promise<AdmManageVo[]> {
    const getMemberList = this.admGroupMemberManageRepository
      .createQueryBuilder()
      .subQuery()
      .select(['groupMember.child_key AS "user_key"'])
      .from(AdmGroupMember, 'groupMember')
      .where(`groupMember.parent_key = '${group_key}'`)
      .andWhere('groupMember.child_internal_div_cd = "U0"')
      .getQuery();

    return this.admUserManageRepository
      .createQueryBuilder('user')
      .select([
        'user.user_key AS "child_key"',
        'user.user_id AS "child_id"',
        'user.user_name AS "child_name"',
        'user.internal_div_cd AS "child_internal_div_cd"',
        '"사용자" AS "child_internal_div_nm"',
        'user.user_desc AS "child_desc"',
      ])
      .where('user.user_key NOT IN (' + getMemberList + ')')
      .andWhere('user.use_yn = "Y"')
      .andWhere(
        '(user.user_id like :member_idnm or user.user_name like :member_idnm)',
        {
          member_idnm: `%${member_idnm}%`,
        },
      )
      .orderBy('user.user_id')
      .getRawMany();
  }

  /**
   * File 또는 Folder에 권한이 있는 그룹 검색
   * @param file_key
   * @returns 그룹 정보(복수)
   */
  async searchFileAuthGroup(
    file_key: string,
    idnm: string,
  ): Promise<AdmFileAuthVo[]> {
    return this.admFileAuthManageRepository
      .createQueryBuilder('admFileAuth')
      .select([
        'admFileAuth.auth_key AS "auth_key"',
        'authGroup.group_id AS "auth_id"',
        'authGroup.group_name AS "auth_name"',
        'admFileAuth.auth_internal_div_cd AS "auth_internal_div_cd"',
        '"그룹" AS "auth_internal_div_nm"',
        'authGroup.group_desc AS "auth_desc"',
      ])
      .leftJoin(
        AdmGroup,
        'authGroup',
        'admFileAuth.auth_key = authGroup.group_key',
      )
      .where('admFileAuth.file_key = :file_key', { file_key: `${file_key}` })
      .andWhere('admFileAuth.auth_internal_div_cd = "G0"')
      .andWhere('authGroup.use_yn = "Y"')
      .andWhere(
        '(authGroup.group_id like :idnm or authGroup.group_name like :idnm)',
        {
          idnm: `%${idnm}%`,
        },
      )
      .andWhere('admFileAuth.auth_internal_div_cd = "G0"')
      .orderBy('authGroup.group_id')
      .getRawMany();
  }

  /**
   * File 또는 Folder에 권한이 있는 사용자 검색
   * @param file_key
   * @returns 사용자 정보(복수)
   */
  async searchFileAuthUser(
    file_key: string,
    idnm: string,
  ): Promise<AdmFileAuthVo[]> {
    return this.admFileAuthManageRepository
      .createQueryBuilder('admFileAuth')
      .select([
        'admFileAuth.auth_key AS "auth_key"',
        'authUser.user_id AS "auth_id"',
        'authUser.user_name AS "auth_name"',
        'admFileAuth.auth_internal_div_cd AS "auth_internal_div_cd"',
        '"사용자" AS "auth_internal_div_nm"',
        'authUser.user_desc AS "auth_desc"',
      ])
      .leftJoin(AdmUser, 'authUser', 'admFileAuth.auth_key = authUser.user_key')
      .where('admFileAuth.file_key = :file_key', { file_key: `${file_key}` })
      .andWhere('admFileAuth.auth_internal_div_cd = "U0"')
      .andWhere('authUser.use_yn = "Y"')
      .andWhere(
        '(authUser.user_id like :idnm or authUser.user_name like :idnm)',
        {
          idnm: `%${idnm}%`,
        },
      )
      .orderBy('authUser.user_id')
      .getRawMany();
  }

  /**
   * File 또는 Folder에 권한이 없는 그룹 검색
   * @param file_key
   * @returns 그룹 정보(복수)
   */
  async searchNoneFileAuthGroup(
    file_key: string,
    idnm: string,
  ): Promise<AdmFileAuthVo[]> {
    const getAuthList = this.admFileAuthManageRepository
      .createQueryBuilder()
      .subQuery()
      .select(['fileAuth.auth_key AS "group_key"'])
      .from(AdmFileAuth, 'fileAuth')
      .where(`fileAuth.file_key = '${file_key}'`)
      .andWhere('fileAuth.auth_internal_div_cd = "G0"')
      .getQuery();

    return this.admFileAuthManageRepository
      .createQueryBuilder('group')
      .select([
        'group.group_key AS "auth_key"',
        'group.group_id AS "auth_id"',
        'group.group_name AS "auth_name"',
        'group.internal_div_cd AS "auth_internal_div_cd"',
        '"그룹" AS "auth_internal_div_nm"',
        'group.group_desc AS "auth_desc"',
      ])
      .where('group.group_key NOT IN (' + getAuthList + ')')
      .andWhere('group.use_yn = "Y"')
      .andWhere('(group.group_id like :idnm or group.group_name like :idnm)', {
        idnm: `%${idnm}%`,
      })
      .orderBy('group.group_id')
      .getRawMany();
  }

  /**
   * File 또는 Folder에 권한이 없는 사용자 검색
   * @param group_key
   * @param member_idnm
   * @returns 멤버 리스트(사용자)
   */
  async searchNoneFileAuthUser(
    file_key: string,
    idnm: string,
  ): Promise<AdmManageVo[]> {
    const getAuthList = this.admFileAuthManageRepository
      .createQueryBuilder()
      .subQuery()
      .select(['fileAuth.auth_key AS "user_key"'])
      .from(AdmFileAuth, 'fileAuth')
      .where(`fileAuth.file_key = '${file_key}'`)
      .andWhere('fileAuth.auth_internal_div_cd = "U0"')
      .getQuery();

    return this.admUserManageRepository
      .createQueryBuilder('user')
      .select([
        'user.user_key AS "auth_key"',
        'user.user_id AS "auth_id"',
        'user.user_name AS "auth_name"',
        'user.internal_div_cd AS "auth_internal_div_cd"',
        '"사용자" AS "auth_internal_div_nm"',
        'user.user_desc AS "auth_desc"',
      ])
      .where('user.user_key NOT IN (' + getAuthList + ')')
      .andWhere('user.use_yn = "Y"')
      .andWhere('(user.user_id like :idnm or user.user_name like :idnm)', {
        idnm: `%${idnm}%`,
      })
      .orderBy('user.user_id')
      .getRawMany();
  }
}
