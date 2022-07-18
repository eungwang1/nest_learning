import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './../cats/cats.module';
import { JwtModule } from '@nestjs/jwt';
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtRefreshStrategy } from './jwt/jwt-refresh-strategy';

@Module({
  imports: [
    ConfigModule.forRoot(), // env 쓰기위해서.
    // PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    // JwtModule.register({
    //   secret: process.env.ACCESS_TOKEN_SECRET,
    //   signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
    // }),
    PassportModule.register({}),
    JwtModule.register({}),
    // CatsModule 의 공급자들을 의존성 주입 받기위해서
    // 순환종속성 문제 해결을 위해 forwardRef 사용 (ex. auth에서 cat이 필요 & cat에서도 auth가 필요)
    forwardRef(() => CatsModule),
  ],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
