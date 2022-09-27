import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassWordService } from '../pass-word/pass-word.service';
import { Users } from '../users/entities/Users.entity';
import { UsersService } from '../users/users.service';
import { UsersModule } from './../users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './jwt/jwt.constants';
import { JwtStrategy } from './stategy/jwt.strategy';
import { LocalStrategy } from './stategy/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
    UsersModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PassWordService,
    UsersService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
