import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassWordService } from '../passWord/passWord.service';
import { CreateAdmUserDto } from './dto/CreateAdmUser.dto';
import { UpdateAdmUserDto } from './dto/UpdateAdmUser.dto';
import { AdmUser } from './entities/AdmUser.entity';

@Injectable()
export class AdmUserService {
  private user: AdmUser[] = [];
  constructor(
    @InjectRepository(AdmUser)
    private admUserRepository: Repository<AdmUser>,

    private readonly passwordService: PassWordService,
  ) {}
  /**
   * 전체 유저 정보 조회
   * @returns 전체 유저 정보
   */
  async getAllUsers(): Promise<AdmUser[]> {
    return await this.admUserRepository.find();
  }

  /**
   * 유저 ID,PW 체크용 단일 조회
   * @param user_key
   * @returns 단일 유저 ID,PW
   */
  async getOneUserCheck(user_key: string): Promise<AdmUser> {
    return await this.admUserRepository
      .createQueryBuilder()
      .select(['user_key', 'user_id', 'user_password'])
      .where('user_key = :user_key', { user_key: `${user_key}` })
      .getRawOne();
  }

  /**
   * 유저 단일 조회
   * @param user_key
   * @returns 단일 유저 정보
   */
  async getOneUser(user_key: string): Promise<AdmUser> {
    return await this.admUserRepository
      .createQueryBuilder()
      .select(['user_key', 'user_id', 'user_name'])
      .where('user_key = :user_key', { user_key: `${user_key}` })
      .getRawOne();
  }

  /**
   * 유저 테이블 like 유저id or like 유저명 검색
   * @param user_idnm
   * @returns 유저 정보(복수)
   */
  async searchUsers(user_idnm: string): Promise<AdmUser[]> {
    console.log(user_idnm);
    user_idnm === undefined || user_idnm === null
      ? (user_idnm = '')
      : user_idnm;
    return await this.admUserRepository
      .createQueryBuilder()
      .select([
        'user_key',
        'user_id',
        'user_password_chg_date',
        'DATE_FORMAT(password_chg_date,"%Y-%m-%d") AS "password_chg_date"',
        'user_name',
        'user_login_fail_cnt',
        'user_admin_flag',
        'user_desc',
        'use_yn',
        'created_at',
        'create_user_id',
        'updated_at',
        'update_user_id',
      ])
      .where('user_id like :user_id', { user_id: `%${user_idnm}%` })
      .orWhere('user_nm like :user_nm', { user_nm: `%${user_idnm}%` })
      .addOrderBy('user_id', 'ASC')
      .getRawMany();
  }

  /**
   * 유저 생성
   * @param usersData
   * @returns Boolean
   */
  async createUser(usersData: CreateAdmUserDto) {
    if (!(await this.getOneUserCheck(usersData.user_id))) {
      usersData.user_password = await this.passwordService.hashPassword(
        usersData.user_password,
      );
      await this.admUserRepository.save(usersData);
    } else {
      const error = { user_id: '이미 사용중인 아이디 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * 유저 수정
   * @param usersData
   * @returns Boolean
   */
  async updateUser(user_key: string, usersData: UpdateAdmUserDto) {
    if (await this.getOneUserCheck(user_key)) {
      await this.admUserRepository.update(
        {
          user_key: user_key,
        },
        usersData,
      );
    } else {
      const error = { user_key: '등록되지 않은 사용자 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
