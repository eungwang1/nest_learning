import { LoginRequestDto } from './dto/login.request.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt/jwt.payload';
import { CatsService } from 'src/cats/services/cats.service';
import { Cat } from 'src/cats/cats.schema';
@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly catsService: CatsService,
    private jwtService: JwtService,
  ) {}

  async getAccessToken(payload: Payload) {
    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });
    return accessToken;
  }

  async getRefreshToken(payload: Payload) {
    const refreshToken = await this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });
    return refreshToken;
  }

  async updateRefreshTokenInUser(refreshToken: string | null, email: string) {
    if (refreshToken) {
      refreshToken = await bcrypt.hash(refreshToken, 10);
    }
    await this.catsService.update(email, { hashedRefreshToken: refreshToken });
  }

  async getNewAccessAndRefreshToken(payload: Payload) {
    const refreshToken = await this.getRefreshToken(payload);
    await this.updateRefreshTokenInUser(refreshToken, payload.email);
    return {
      accessToken: await this.getAccessToken(payload),
      refreshToken: refreshToken,
    };
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, email: string) {
    const user = await this.catsRepository.findCatByEmail(email);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      await this.updateRefreshTokenInUser(null, email);
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }

  async logIn(data: LoginRequestDto) {
    const { email, password } = data;

    // 해당하는 email이 있는지
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    // password가 일치하는지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const payload = { email, sub: cat.id };
    const accessToken = await this.getAccessToken(payload);
    const refreshToken = await this.getRefreshToken(payload);
    await this.updateRefreshTokenInUser(refreshToken, payload.email);

    return {
      cat,
      accessToken,
      refreshToken,
    };
  }

  async logOut(cat: Cat) {
    await this.updateRefreshTokenInUser(null, cat.email);
  }
}
