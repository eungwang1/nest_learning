import { RefreshTokenDto } from './auth/dto/refresh-token.dto';
import { JwtRefreshTokenGuard } from './auth/jwt/jwt-refresh-token.guard';
import { CatUpdateDto } from './cats/dto/cats.update.dto';
import { CatsService } from './cats/services/cats.service';
import { AuthService } from './auth/auth.service';
import { Cat } from './cats/cats.schema';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt/jwt.guard';
import { CurrentUser } from './common/decorators/user.decorator';
import { LoginRequestDto } from './auth/dto/login.request.dto';
import { ReadOnlyCatDto } from './cats/dto/cat.dto';
import { CatRequestDto } from './cats/dto/cats.request.dto';
import { Response } from 'express';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly catsService: CatsService,
  ) {}

  // loadMyInfo
  @ApiOperation({ summary: '내정보 받아오기' })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  loadMyInfo(@CurrentUser() me: Cat) {
    return me.readOnlyData;
  }

  // login
  @ApiOperation({ summary: '로그인하기' })
  @Post('/login')
  async logIn(
    @Body() data: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, cat } = await this.authService.logIn(
      data,
    );
    res.header('Access-Control-Expose-Headers', 'Set-Cookie');
    res.cookie('access_token', `Bearer ${accessToken}`, {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    });
    res.cookie('refresh_token', refreshToken, {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    });

    return cat.readOnlyData;
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('/refresh-token')
  async refreshToken(
    @CurrentUser() me: Cat,
    @Body() token: RefreshTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user_info = await this.authService.getUserIfRefreshTokenMatches(
      token.refresh_token,
      me.email,
    );
    if (user_info) {
      const userinfo = {
        email: user_info.email,
        sub: user_info.id,
      };
      const { accessToken, refreshToken } =
        await this.authService.getNewAccessAndRefreshToken(userinfo);
      res.header('Access-Control-Expose-Headers', 'Set-Cookie');
      res.cookie('access_token', `Bearer ${accessToken}`, {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
      });
      res.cookie('refresh_token', refreshToken, {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
      });
      return { accessToken };
    } else {
      return null;
    }
  }

  // logout
  @ApiOperation({ summary: '로그아웃하기' })
  @Post('/logout')
  logOut(@CurrentUser() me: Cat, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return 'logout';
  }

  // signUp
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post('join')
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '내 정보 수정하기' })
  @UseGuards(JwtAuthGuard)
  @Put('/me')
  async update(@CurrentUser() cat: Cat, @Body() body: CatUpdateDto) {
    return await this.catsService.update(cat.email, body);
  }
}
