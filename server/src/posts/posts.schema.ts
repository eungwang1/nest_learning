import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaOptions, Document } from 'mongoose';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Post extends Document {
  @ApiProperty({
    example: '안녕하세요',
    description: 'content',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  content: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
