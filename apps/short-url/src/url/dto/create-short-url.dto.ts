import { IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShortUrlDto {
  @IsUrl()
  @ApiProperty({ example: 'https://chess.com', description: 'Url address that needs to shorten' })
  originalUrl: string;
}
