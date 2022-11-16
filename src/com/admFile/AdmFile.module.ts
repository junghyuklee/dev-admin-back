import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmFile } from './entities/AdmFile.entity';
import { AdmFileController } from './AdmFile.controller';
import { AdmFileService } from './AdmFile.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdmFile])],
  controllers: [AdmFileController],
  providers: [AdmFileService],
  exports: [AdmFileService],
})
export class AdmFileModule {}
