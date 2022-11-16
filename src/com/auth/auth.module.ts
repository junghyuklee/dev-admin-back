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
import { LocalStrategy } from './stategy/local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdmUser]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
    PassWordModule,
    AdmManageModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
