import { IsNumber, IsOptional } from 'class-validator';

export class GetUserListDto {
  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 10;
}
