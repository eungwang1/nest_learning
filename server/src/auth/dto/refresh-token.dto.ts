import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'Bearer adsacdqwdzxzcwerqdazxcsadwqeqwasdaszxc',
    description: 'refresh-token',
    required: true,
  })
  @IsString()
  refresh_token: string;
}
