import { AdmFileAuthModule } from './com/admFileAuth/AdmFileAuth.module';
import { AdmFile } from './com/admFile/entities/AdmFile.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './com/auth/auth.module';
import { PassWordModule } from './com/passWord/PassWord.module';
import { AdmUserModule } from './com/admUser/AdmUser.module';
import { AdmManageModule } from './com/admManage/AdmManage.module';
import { AdmGroupModule } from './com/admGroup/AdmGroup.module';
import { AdmGroupMemberModule } from './com/admGroupMember/AdmGroupMember.module';
import { AdmFileModule } from './com/admFile/AdmFile.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    PassWordModule,
    AdmUserModule,
    AdmGroupModule,
    AdmManageModule,
    AdmGroupMemberModule,
    AdmFileModule,
    AdmFileAuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
