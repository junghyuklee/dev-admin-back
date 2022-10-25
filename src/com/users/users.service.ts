import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassWordService } from '../pass-word/pass-word.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/Users.entity';

@Injectable()
export class UsersService {
  private users: Users[] = [];
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    private readonly passwordService: PassWordService,
  ) {}
  /**
   * 전체 유저 정보 조회
   * @returns 전체 유저 정보
   */
  async getAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  /**
   * 유저 ID,PW 체크용 단일 조회
   * @param user_id
   * @returns 단일 유저 ID,PW
   */
  async getOne(user_id: string): Promise<Users> {
    return await this.usersRepository
      .createQueryBuilder()
      .select(['user_id', 'password'])
      .where('user_id = :user_id', { user_id: `${user_id}` })
      .getRawOne();
  }

  /**
   * 유저 단일 조회
   * @param user_id
   * @returns 단일 유저 정보
   */
  async getUser(user_id: string): Promise<Users> {
    return await this.usersRepository
      .createQueryBuilder()
      .select(['user_id', 'user_nm'])
      .where('user_id = :user_id', { user_id: `${user_id}` })
      .getRawOne();
  }

  /**
   * 유저 테이블 like 유저id or like 유저명 검색
   * @param user_idnm
   * @returns 유저 정보(복수)
   */
  async search(user_idnm: string): Promise<Users[]> {
    console.log(user_idnm);
    user_idnm === undefined || user_idnm === null
      ? (user_idnm = '')
      : user_idnm;
    return await this.usersRepository
      .createQueryBuilder()
      .select([
        'id',
        'user_id',
        'password_chg_date',
        'DATE_FORMAT(password_chg_date,"%Y-%m-%d") AS "password_chg_date"',
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
   * 유저 생성
   * @param usersData
   * @returns Boolean
   */
  async create(usersData: CreateUserDto) {
    if (!(await this.getOne(usersData.user_id))) {
      usersData.password = await this.passwordService.hashPassword(
        usersData.password,
      );
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
  async update(user_id: string, usersData: UpdateUserDto) {
    if (await this.getOne(user_id)) {
      await this.usersRepository.update(
        {
          user_id: user_id,
        },
        usersData,
      );
    } else {
      const error = { user_id: '등록되지 않은 사용자 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
