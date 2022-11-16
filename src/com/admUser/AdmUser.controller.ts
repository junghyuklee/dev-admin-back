import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { AdmUserDto } from './dto/AdmUser.dto';
import { AdmUserService } from './AdmUser.service';

@Controller('user')
export class AdmUserController {
  constructor(readonly admUserService: AdmUserService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('/createUser')
  createUser(@Body() userData: AdmUserDto) {
    return this.admUserService.createUser(userData);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch('/updateUser')
  updateUser(@Body() userData: AdmUserDto) {
    return this.admUserService.updateUser(userData);
  }
}
