import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AdmFileService } from './AdmFile.service';
import { AdmFileDto } from './dto/AdmFile.dto';
import { AdmFile } from './entities/AdmFile.entity';

@Controller('file')
export class AdmFileController {
  constructor(readonly admFileService: AdmFileService) {}

  @Get('/selectFile')
  @UseGuards(AuthGuard)
  selectFile(
    @Query('file_key') file_key: string,
  ): Promise<AdmFileDto | undefined> {
    return this.admFileService.selectFile(file_key);
  }

  @Get('/searchFiles')
  @UseGuards(AuthGuard)
  searchFiles(@Query('file_idnm') file_idnm: string): Promise<AdmFile[]> {
    return this.admFileService.searchFiles(file_idnm);
  }

  @Post('/createFile')
  @UseGuards(AuthGuard)
  create(@Body() fileData: AdmFileDto) {
    return this.admFileService.createFile(fileData);
  }

  @Patch('/updateFile')
  @UseGuards(AuthGuard)
  update(@Body() fileData: AdmFileDto) {
    return this.admFileService.updateFile(fileData);
  }
}
