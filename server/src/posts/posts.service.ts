import { PostsRepository } from './posts.repository';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/post.create.dto';
import { UpdatePostDto } from './dto/post.update.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}
  async uploadPost(createPostDto: CreatePostDto) {
    return await this.postsRepository.uploadPost(createPostDto);
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
