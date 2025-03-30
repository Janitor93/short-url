import { Controller, Get } from '@nestjs/common';
import { RpcAuthServiceController, RpcAuthServiceControllerMethods, ValidateTokenResponse } from '@app/grpc';
import { AuthService } from './auth.service';

@Controller('auth')
@RpcAuthServiceControllerMethods()
export class AuthController implements RpcAuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  validateUserTokenRpc(): ValidateTokenResponse {
    return {} as ValidateTokenResponse;
  }
}
