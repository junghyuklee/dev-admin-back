import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AdmUserService } from './AdmUser.service';
import { AdmUserDto } from './dto/AdmUser.dto';

@Controller('user')
export class AdmUserController {
  constructor(readonly admUserService: AdmUserService) {}

  @Post('/createUser')
  @UseGuards(AuthGuard)
  createUser(@Body() userData: AdmUserDto) {
    return this.admUserService.createUser(userData);
  }

  @Patch('/updateUser')
  @UseGuards(AuthGuard)
  updateUser(@Body() userData: AdmUserDto) {
    return this.admUserService.updateUser(userData);
  }
}
