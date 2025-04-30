import { IsDefined } from 'class-validator';

export class RefreshTokenDto {
  @IsDefined()
  refreshToken: string;
}
