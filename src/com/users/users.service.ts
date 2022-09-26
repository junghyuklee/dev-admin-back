import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Users } from './entities/Users.entity';

@Injectable()
export class UsersService {
  private users: Users[] = [];
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  /**
   * 전체 유저 정보 조회
   * @returns 전체 유저 정보
   */
  async getAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  /**
   * 유저 단일 조회(create 또는 update 사용 전 Validate check용)
   * @param user_id
   * @returns 단일 유저 정보
   */
  async getOne(user_id: string): Promise<Users> {
    return await this.usersRepository
      .createQueryBuilder()
      .select('user_id')
      .where('user_id = :user_id', { user_id: `${user_id}` })
      .getRawOne();
  }
  /**
   * 유저 테이블 like 유저id or like 유저명 검색
   * @param user_idnm
   * @returns 유저 정보(복수)
   */
  async search(user_idnm: string): Promise<Users[]> {
    user_idnm === undefined || user_idnm === null
      ? (user_idnm = '')
      : user_idnm;
    return await this.usersRepository
      .createQueryBuilder()
      .select([
        'user_id',
        'password_chg_date',
        'user_nm',
        'login_fail_cnt',
        'admin_flag',
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
   * 패스워드 암호화
   * @param usersData
   * @returns
   */
  async transformPassword(usersData: CreateUsersDto): Promise<void> {
    usersData.password = await bcrypt.hash(usersData.password, 10);
    return Promise.resolve();
  }

  /**
   * 유저 생성
   * @param usersData
   * @returns Boolean
   */
  async create(usersData: CreateUsersDto) {
    if (!(await this.getOne(usersData.user_id))) {
      await this.transformPassword(usersData);
      await this.usersRepository.save(usersData);
    } else {
      const error = { user_id: '이미 사용중인 아이디 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * 유저 생성
   * @param usersData
   * @returns Boolean
   */
  async update(user_id: string, usersData: UpdateUsersDto) {
    if (await this.getOne(user_id)) {
      await this.usersRepository.update(
        {
          user_id: user_id,
        },
        usersData,
      );
    } else {
      const error = { user_id: '등록되지 사용자 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
