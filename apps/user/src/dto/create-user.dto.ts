import { IsEmail, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'test@test.com', description: 'User\'s email address' })
  email: string;

  @IsStrongPassword({ minLength: 8 })
  @ApiProperty({ example: '12345678', description: 'User\'s password' })
  password: string;
}
