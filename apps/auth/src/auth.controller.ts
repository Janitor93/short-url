import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter, JwtAuthGuard, CurrentUser } from '@app/common';

import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto } from './dto';
import { TokenResponse } from './interfaces';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public async login(@Body() loginDto: LoginDto): Promise<TokenResponse> {
    const { email, password } = loginDto;
    return await this.authService.login(email, password);
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  public async logout(
    @CurrentUser('email') email: string,
    @Body('refreshToken') refreshToken: string
  ) {
    return await this.authService.logout(email, refreshToken);
  }

  @Post('/refresh_token')
  public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenResponse> {
    const { refreshToken } = refreshTokenDto;
    return await this.authService.refreshToken(refreshToken);
  }
}
