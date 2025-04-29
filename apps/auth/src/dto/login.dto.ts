import { IsEmail, IsDefined } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsDefined()
  password: string;
}
