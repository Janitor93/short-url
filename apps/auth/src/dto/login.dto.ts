import { IsEmail, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'test@test.com', description: 'User\'s email address' })
  email: string;

  @IsDefined()
  @ApiProperty({ example: '12345678', description: 'User\'s password' })
  password: string;
}
