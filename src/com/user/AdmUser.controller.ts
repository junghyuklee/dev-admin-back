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
import { CreateAdmUserDto } from './dto/CreateAdmUser.dto';
import { UpdateAdmUserDto } from './dto/UpdateAdmuser.dto';
import { AdmUser } from './entities/AdmUser.entity';
import { AdmUserService } from './AdmUser.service';

@Controller('user')
export class AdmUserController {
  constructor(readonly admUserService: AdmUserService) {}

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
  @Get('/searchUsers')
  search(@Query('user_idnm') user_idnm: string): Promise<AdmUser[]> {
    return this.admUserService.searchUsers(user_idnm);
  }

  @Post('/createUser')
  create(@Body() usersData: CreateAdmUserDto) {
    return this.admUserService.createUser(usersData);
  }

  @Patch('/update')
  update(
    @Query('user_key') user_key: string,
    @Body() usersData: UpdateAdmUserDto,
  ) {
    return this.admUserService.updateUser(user_key, usersData);
  }
}
