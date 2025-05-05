import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'test@test.com', description: 'User\'s email address' })
  email: string;
}
