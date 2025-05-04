import { Injectable, Inject, OnModuleInit, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { RpcUserServiceClient, RPC_USER_SERVICE_NAME, UserCredentialsResponse } from '@app/grpc';
import { firstValueFrom } from 'rxjs';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { RedisService } from '@app/common';

import { TokenPayload, TokenResponse } from './interfaces';
import { appConfig } from './config';

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

  public async login(email: string, password: string): Promise<TokenResponse> {
    let user: UserCredentialsResponse;
    try {
      user = await firstValueFrom(this.userService.compareCredentials({ email, password }));
    } catch (error) {
      throw new ForbiddenException({
        code: error.code,
        message: error.details || error.message,
      });
    }
    const payload: TokenPayload = { sub: user.userId, email };
    const response = this.generateTokenResponse(payload);

    await this.cacheManager.set(response.refreshToken, email);

    return response;
  }

  public async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const userInfo = this.validateToken(refreshToken);
    const userEmail = await this.cacheManager.get<string>(refreshToken);
    if (userInfo.email !== userEmail) throw new UnauthorizedException('Invalid refresh token');

    const payload: TokenPayload = { sub: userInfo.sub, email: userInfo.email };
    const response: TokenResponse = this.generateTokenResponse(payload);

    await Promise.all([
      this.cacheManager.del(refreshToken),
      this.cacheManager.set(response.refreshToken, payload.email),
    ]);

    return response;
  }

  private generateTokenResponse(payload: TokenPayload): TokenResponse {
    return {
      accessToken: this.generateToken(payload),
      refreshToken: this.generateToken(payload, { expiresIn: appConfig.cache.expiresIn }),
    };
  }

  private generateToken(payload: TokenPayload, options?: JwtSignOptions): string {
    return this.jwtService.sign(payload, options);
  }

  private validateToken(token: string) {
    try {
      const payload = this.jwtService.verify<TokenPayload>(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  public async logout(email: string, refreshToken: string) {
    const userEmail = await this.cacheManager.get(refreshToken);
    if (email !== userEmail) throw new UnauthorizedException();
    await this.cacheManager.del(refreshToken);
    return { message: 'success' };
  }
}
