import { PickType } from '@nestjs/swagger';
import { Post } from '../posts.schema';
export class CreatePostDto extends PickType(Post, ['content'] as const) {}
