import {
  Controller,
  Get,
  Post,
  Body,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  RpcAuthServiceController,
  RpcAuthServiceControllerMethods,
  ValidateTokenResponse,
} from '@app/grpc';
import { HttpExceptionFilter, JwtAuthGuard } from '@app/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
@RpcAuthServiceControllerMethods()
export class AuthController implements RpcAuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  validateUserTokenRpc(): ValidateTokenResponse {
    return {} as ValidateTokenResponse;
  }

  @Post('/login')
  public async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    return await this.authService.login(email, password);
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  public async logout() {
    throw new Error('Not implemented yet');
  }
}
