import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthStrategy } from './strategies/local-auth.strategy';
import { JwtAuthStrategy } from './strategies/jwt-auth-strategy';
import { EmailModule } from 'src/email/email.module';
import { GoogleAuthStrategy } from './strategies/google-auth.strategy';
import { KakaoAuthStrategy } from './strategies/kakao-auth.strategy';
import { NaverAuthStrategy } from './strategies/naver-auth.strategy';
import { MetaAuthStrategy } from './strategies/meta_auth.strategy';

@Module({
  imports: [ConfigModule, JwtModule.register({}), UserModule, EmailModule],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy, JwtAuthStrategy, GoogleAuthStrategy, KakaoAuthStrategy, NaverAuthStrategy, MetaAuthStrategy],
})
export class AuthModule {}
