import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/post.create.dto';
import { Post } from './posts.schema';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async uploadPost(post: CreatePostDto): Promise<Post> {
    return await this.postModel.create(post);
  }
}
