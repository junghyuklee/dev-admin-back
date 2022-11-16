import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmFileAuth } from './entities/AdmFileAuth.entity';
import { AdmFileAuthController } from './AdmFileAuth.controller';
import { AdmFileAuthService } from './AdmFileAuth.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdmFileAuth])],
  controllers: [AdmFileAuthController],
  providers: [AdmFileAuthService],
  exports: [AdmFileAuthService],
})
export class AdmFileAuthModule {}
