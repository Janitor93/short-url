import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserListDto {
  @IsOptional()
  @ApiProperty({ example: 1, description: 'Page number' })
  page?: number = 1;

  @IsOptional()
  @ApiProperty({ example: 10, description: 'Records per page' })
  limit?: number = 10;
}
