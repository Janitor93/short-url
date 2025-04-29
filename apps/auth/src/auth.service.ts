import { Injectable, Inject, OnModuleInit, ForbiddenException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { RpcUserServiceClient, RPC_USER_SERVICE_NAME, UserCredentialsResponse } from '@app/grpc';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '@app/common';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: RpcUserServiceClient;

  constructor(
    @Inject(RPC_USER_SERVICE_NAME) private readonly client: ClientGrpc,
    private readonly jwtService: JwtService,
    private readonly cacheManager: RedisService,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService(RPC_USER_SERVICE_NAME);
  }

  public async login(email: string, password: string) {
    let user: UserCredentialsResponse;
    try {
      user = await firstValueFrom(this.userService.compareCredentials({ email, password }));
    } catch (error) {
      throw new ForbiddenException({
        code: error.code,
        message: error.details || error.message,
      });
    }
    const payload = { sub: user.userId, email };

    const response = {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, { expiresIn: '10d' }),
    };

    await this.cacheManager.set(response.refreshToken, email);

    return response;
  }
}
