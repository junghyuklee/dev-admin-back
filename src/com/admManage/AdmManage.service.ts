import { AdmUser } from 'src/com/admUser/entities/AdmUser.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdmGroup } from '../admGroup/entities/AdmGroup.entity';
import { AdmGroupMember } from '../admGroupMember/entities/AdmGroupMember.entity';
import { AdmFile } from '../admFile/entities/AdmFile.entity';
import { AdmFileAuth } from './../admFileAuth/entities/AdmFileAuth.entity';
import { AdmManageDto } from './dto/AdmManage.dto';

@Injectable()
export class AdmManageService {
  constructor(
    @InjectRepository(AdmUser)
    private admUserManageRepository: Repository<AdmUser>,

    @InjectRepository(AdmGroup)
    private admGroupManageRepository: Repository<AdmGroup>,

    @InjectRepository(AdmFile)
    private admFileManageRepository: Repository<AdmFile>,
  ) {}
  /**
   * login_user 토큰 생성용 조회
   * @param user_id
   * @returns user_id, user_password
   */
  async getUserLogin(user_id?: string): Promise<AdmManageDto | undefined> {
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
   * @returns 유저 정보(복수)
   */
  async searchUsers(user_idnm: string): Promise<AdmManageDto[]> {
    user_idnm === undefined || user_idnm === null
      ? (user_idnm = '')
      : user_idnm;

    /**
     * 사용자 별 그룹 리스트 조회 subquery
     */
    const getUserGroupsList = this.admUserManageRepository
      .createQueryBuilder()
      .subQuery()
      .select([
        'user.user_key AS "user_key"',
        // 'group_concat(groupMember.parent_key) AS "group_key_list"',
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
      .andWhere('user.use_yn = "Y"')
      .groupBy('user.user_key')
      .getQuery();

    return await this.admUserManageRepository
      .createQueryBuilder('user')
      .distinct()
      .select([
        'user.user_key AS "user_key"',
        'user.user_id AS "user_id"',
        'user.user_password AS "user_password"',
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
      .where('group.use_yn = "Y"')
      .andWhere('user.user_id like :user_id', { user_id: `%${user_idnm}%` })
      .orWhere('user.user_name like :user_name', {
        user_name: `%${user_idnm}%`,
      })
      .addOrderBy('user.user_id', 'ASC')
      .getRawMany();
  }

  /**
   * Group Member 검색
   * @param group_id
   * @returns 유저 정보(복수)
   */
  async searchGroupMembers(group_id: string): Promise<AdmManageDto[]> {
    if (group_id) {
      const groupMemberGroup = this.admGroupManageRepository
        .createQueryBuilder('group')
        .select([
          'group.group_key AS "parent_key"',
          'group.group_id AS "parent_id"',
          'group.group_name AS "parent_name"',
          'groupMember.child_key AS "child_key"',
          'childGroup.group_id AS "child_id"',
          'childGroup.group_name AS "child_name"',
        ])
        .leftJoin(
          AdmGroupMember,
          'groupMember',
          'group.group_key = groupMember.parent_key',
        )
        .leftJoin(
          AdmGroup,
          'childGroup',
          'groupMember.child_key = childGroup.group_key',
        )
        .where('group.group_id = :group_id', { group_id: `${group_id}` })
        .andWhere('groupMember.child_internal_div_cd = "G0"')
        .orderBy('childGroup.group_id')
        .getRawMany();

      const groupMemberUser = this.admGroupManageRepository
        .createQueryBuilder('group')
        .select([
          'group.group_key AS "parent_key"',
          'group.group_id AS "parent_id"',
          'group.group_name AS "parent_name"',
          'groupMember.child_key AS "child_key"',
          'childUser.user_id AS "child_id"',
          'childUser.user_name AS "child_name"',
        ])
        .leftJoin(
          AdmGroupMember,
          'groupMember',
          'group.group_key = groupMember.parent_key',
        )
        .leftJoin(
          AdmUser,
          'childUser',
          'groupMember.child_key = childUser.user_key',
        )
        .where('group.group_id = :group_id', { group_id: `${group_id}` })
        .andWhere('groupMember.child_internal_div_cd = "U0"')
        .orderBy('childUser.user_id')
        .getRawMany();

      return (await groupMemberGroup).concat(await groupMemberUser);
    } else {
      const error = { group_id: '그룹 아이디가 없습니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * File Auth 사용자, 그룹 검색
   * @param file_id
   * @returns 유저 또는 그룹 정보(복수)
   */
  async searchFileAuths(file_id: string): Promise<AdmManageDto[]> {
    console.log(file_id);
    if (file_id) {
      const fileAuthGroup = this.admFileManageRepository
        .createQueryBuilder()
        .select([
          'AdmFile.file_key AS "file_key"',
          'AdmFile.file_id AS "file_id"',
          'AdmFile.file_name AS "file_name"',
          'AdmFile.internal_div_cd AS "file_inter_div_cd"',
          'authMember.auth_key AS "auth_key"',
          'authGroup.group_id AS "auth_id"',
          'authGroup.group_name AS "auth_name"',
        ])
        .leftJoin(
          AdmFileAuth,
          'authMember',
          'AdmFile.file_key = authMember.file_key',
        )
        .leftJoin(
          AdmGroup,
          'authGroup',
          'authMember.auth_key = authGroup.group_key',
        )
        .where('AdmFile.file_id = :file_id', { file_id: `${file_id}` })
        .andWhere('authMember.auth_internal_div_cd = "G0"')
        .orderBy('authGroup.group_id')
        .getRawMany();

      const fileAuthUser = this.admFileManageRepository
        .createQueryBuilder()
        .select([
          'AdmFile.file_key AS "file_key"',
          'AdmFile.file_id AS "file_id"',
          'AdmFile.file_name AS "file_name"',
          'AdmFile.internal_div_cd AS "file_inter_div_cd"',
          'authMember.auth_key AS "auth_key"',
          'authUser.user_id AS "auth_id"',
          'authUser.user_name AS "auth_name"',
        ])
        .leftJoin(
          AdmFileAuth,
          'authMember',
          'AdmFile.file_key = authMember.file_key',
        )
        .leftJoin(
          AdmUser,
          'authUser',
          'authMember.auth_key = authUser.user_key',
        )
        .where('AdmFile.file_id = :file_id', { file_id: `${file_id}` })
        .andWhere('authMember.auth_internal_div_cd = "U0"')
        .orderBy('authUser.User_id')
        .getRawMany();

      return (await fileAuthGroup).concat(await fileAuthUser);
    } else {
      const error = { file_id: '잘못된 아이디 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
