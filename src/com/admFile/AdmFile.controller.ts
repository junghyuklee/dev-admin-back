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
import { AdmFileDto } from './dto/AdmFile.dto';
import { AdmFile } from './entities/AdmFile.entity';
import { AdmFileService } from './AdmFile.service';

@Controller('file')
export class AdmFileController {
  constructor(readonly admFileService: AdmFileService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('/searchFiles')
  searchFiles(@Query('file_idnm') file_idnm: string): Promise<AdmFile[]> {
    return this.admFileService.searchFiles(file_idnm);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/createFile')
  create(@Body() fileData: AdmFileDto) {
    return this.admFileService.createFile(fileData);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch('/updateFile')
  update(@Body() fileData: AdmFileDto) {
    return this.admFileService.updateFile(fileData);
  }
}
