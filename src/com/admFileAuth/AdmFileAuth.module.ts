import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmFileAuth } from './entities/AdmFileAuth.entity';
import { AdmFileAuthController } from './AdmFileAuth.controller';
import { AdmFileAuthService } from './AdmFileAuth.service';
import { AdmFileAuthRepository } from './AdmFileAuth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdmFileAuth])],
  controllers: [AdmFileAuthController],
  providers: [AdmFileAuthService, AdmFileAuthRepository],
  exports: [AdmFileAuthService],
})
export class AdmFileAuthModule {}
