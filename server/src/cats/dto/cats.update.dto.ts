import { ApiProperty } from '@nestjs/swagger';

export class CatUpdateDto {
  @ApiProperty({
    example: 'eung',
    description: 'name',
  })
  name?: string;

  @ApiProperty({
    example: '12345',
    description: 'password',
  })
  password?: string;

  @ApiProperty({
    example: '12312312313',
    description: 'refreshToken',
  })
  hashedRefreshToken?: string;
}
