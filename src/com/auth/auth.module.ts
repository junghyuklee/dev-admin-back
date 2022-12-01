import { AdmManageModule } from './../admManage/AdmManage.module';
import { PassWordModule } from './../passWord/PassWord.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmUser } from '../admUser/entities/AdmUser.entity';
import { AuthService } from './auth.service';
import { jwtConstants } from './jwt/jwt.constants';
import { JwtStrategy } from './stategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { AdmUserModule } from '../admUser/AdmUser.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdmUser]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '18000s' },
    }),
    PassWordModule,
    AdmManageModule,
    AdmUserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
