import { JwtAuthGuard } from './../jwt/jwt.guard';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Users } from './entities/Users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(readonly UsersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/search')
  search(@Query('user_idnm') user_idnm: string): Promise<Users[]> {
    return this.UsersService.search(user_idnm);
  }

  @Post('/create')
  create(@Body() usersData: CreateUsersDto) {
    return this.UsersService.create(usersData);
  }

  @Patch('/update')
  update(@Query('user_id') user_id: string, @Body() usersData: UpdateUsersDto) {
    return this.UsersService.update(user_id, usersData);
  }
}
