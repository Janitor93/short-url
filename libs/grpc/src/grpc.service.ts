import { Injectable } from '@nestjs/common';

@Injectable()
export class GrpcService {
  public static getAuthProtoPath(): string {
    return 'src/proto/auth.proto';
  }

  public static getUserProtoPath(): string {
    return 'src/proto/user.proto';
  }
}
