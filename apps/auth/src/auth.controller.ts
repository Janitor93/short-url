import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter, JwtAuthGuard, CurrentUser } from '@app/common';
import { ApiOperation, ApiResponse, ApiHeader, ApiBody } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto } from './dto';
import { TokenResponse } from './interfaces';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({
    summary: 'Authorization using login and password',
    description: `Checks the credentials in User Service via gRPC and generates
      access and refresh tokens. Requires the running User Service`,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns access and refresh tokens',
    example: {
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Returns Forbidden error if credentials are wrong',
    example: {
      statusCode: 403,
      message: 'Login or password is incorrect'
    },
  })
  public async login(@Body() loginDto: LoginDto): Promise<TokenResponse> {
    const { email, password } = loginDto;
    return await this.authService.login(email, password);
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  @ApiHeader({ name: 'Authorization', description: 'Valid access token', required: true })
  @ApiOperation({
    summary: 'Invalidate the refresh token',
    description: 'Removes the current refresh token, validates the access token',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: {
          type: 'string',
          example: 'refresh_token',
          description: 'Valid refresh token. Will be removed from the storage',
        },
      },
      required: ['refresh_token'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Success message',
    example: {
      message: 'success',
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden error if access or refresh token is invalid',
    example: {
      statusCode: 401,
      message: 'Unauthorized'
    },
  })
  public async logout(
    @CurrentUser('email') email: string,
    @Body('refreshToken') refreshToken: string
  ) {
    return await this.authService.logout(email, refreshToken);
  }

  @Post('/refresh_token')
  @ApiOperation({
    summary: 'Refreshes token',
    description: 'Refreshes token, replace the old one by new one',
    
  })
  @ApiResponse({
    status: 200,
    description: 'Returns access and refresh tokens',
    example: {
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Returns Forbidden error if something is wring with refresh token',
    example: {
      statusCode: 401,
      message: 'Unauthorized'
    },
  })
  public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenResponse> {
    const { refreshToken } = refreshTokenDto;
    return await this.authService.refreshToken(refreshToken);
  }
}
