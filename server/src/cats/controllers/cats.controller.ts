import { Cat } from './../cats.schema';
import { AuthService } from '../../auth/auth.service';
import { Param, Put, UseFilters, UseInterceptors } from '@nestjs/common';
import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatsService } from '../services/cats.service';
import { ReadOnlyCatDto } from '../dto/cat.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  // getAllCats
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadOnlyCatDto,
    isArray: true,
  })
  @ApiOperation({ summary: '모든 고양이 가져오기' })
  @Get('')
  async getAllCats() {
    return await this.catsService.getAllCats();
  }

  // findCatById
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: 'id와 매칭되는 고양이 한마리 가져오기' })
  @Get('/:id')
  async findCatById(@Param('id') id: string) {
    return await this.catsService.findCatByIdWithoutPassword(id);
  }

  // uploadImage
  @ApiOperation({ summary: '이미지 업로드하기' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
