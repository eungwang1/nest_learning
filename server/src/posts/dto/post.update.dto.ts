import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './post.create.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
