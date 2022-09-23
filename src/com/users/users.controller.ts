import { UpdateUsersDto } from './dto/update-users.dto';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { Body, Controller, Post, Get, Patch, Query } from '@nestjs/common';
import { Users } from './entities/Users.entity';

@Controller('users')
export class UsersController {
  constructor(readonly UsersService: UsersService) {}
  /**
   * 전체 유저 정보 조회
   * @returns 전체 유저 정보
   */
  @Get('/getAll')
  getAll(): Promise<Users[]> {
    return this.UsersService.getAll();
  }

  /**
   * 유저 단일 조회(create 또는 update 사용 전 Validate check용)
   * @param user_id
   * @returns 단일 유저 정보
   */
  @Get('/getOne')
  getOne(@Query('user_id') user_id: string): Promise<Users> {
    return this.UsersService.getOne(user_id);
  }

  /**
   * 유저 테이블 like 유저id or like 유저명 검색
   * @param user_id
   * @param user_nm
   * @returns 유저 정보(복수)
   */
  @Get('/search')
  search(@Query('user_idnm') user_idnm: string): Promise<Users[]> {
    return this.UsersService.search(user_idnm);
  }

  /**
   * 유저 생성
   * @param usersData
   * @returns Boolean
   */
  @Post('/create')
  create(@Body() usersData: CreateUsersDto) {
    return this.UsersService.create(usersData);
  }

  /**
   * 유저 정보 수정
   * @param user_id
   * @param usersData
   * @returns Boolean
   */
  @Patch('/update')
  update(@Query('user_id') user_id: string, @Body() usersData: UpdateUsersDto) {
    return this.UsersService.update(user_id, usersData);
  }
}
