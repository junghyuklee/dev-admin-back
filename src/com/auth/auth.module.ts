import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassWordService } from '../passWord/passWord.service';
import { AdmUser } from '../user/entities/AdmUser.entity';
import { AdmUserService } from '../user/AdmUser.service';
import { AdmUserModule } from '../user/AdmUser.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './jwt/jwt.constants';
import { JwtStrategy } from './stategy/jwt.strategy';
import { LocalStrategy } from './stategy/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdmUser]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
    AdmUserModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PassWordService,
    AdmUserService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
