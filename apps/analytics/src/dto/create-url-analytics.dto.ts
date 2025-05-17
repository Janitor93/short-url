import { IsString, IsIP, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlAnalyticsDto {
  @IsString()
  @ApiProperty({ example: 'userId', description: 'User\'s ID from UserService' })
  userId: string;

  @IsString()
  @ApiProperty({ example: 'urlId', description: 'URL\'s ID from UrlService' })
  urlId: string;

  @IsIP()
  @IsOptional()
  @ApiProperty({ example: '176.115.158.45', description: 'IP Address' })
  ip?: string;
}
