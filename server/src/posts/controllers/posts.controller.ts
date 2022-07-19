import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { CreatePostDto } from '../dto/post.create.dto';
import { UpdatePostDto } from '../dto/post.update.dto';
import { PostsService } from '../services/posts.service';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Cat } from 'src/cats/cats.schema';
import { CatsService } from 'src/cats/services/cats.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @CurrentUser() cat: Cat) {
    return this.postsService.uploadPost(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') id: string) {
    return this.postsService.findOne(+id);
  }

  // @Patch(':_id')
  // update(@Param('_id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(+id, updatePostDto);
  // }

  @Delete(':_id')
  remove(@Param('_id') id: string) {
    return this.postsService.remove(+id);
  }
}
