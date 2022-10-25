import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { LocalAuthGuard } from '../auth/guard/local.auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/Users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(readonly UsersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any, @Response() res: any) {
    debugger;
    const token = req.user;
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, //1 hour
    });
    return res.send({ message: 'success' });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logOutlogin(@Request() req: any, @Response() res: any) {
    res.cookie('jwt', '');
    return res.sendStatus(200);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/search')
  search(@Query('user_idnm') user_idnm: string): Promise<Users[]> {
    return this.UsersService.search(user_idnm);
  }

  @Post('/create')
  create(@Body() usersData: CreateUserDto) {
    return this.UsersService.create(usersData);
  }

  @Patch('/update')
  update(@Query('user_id') user_id: string, @Body() usersData: UpdateUserDto) {
    return this.UsersService.update(user_id, usersData);
  }
}
