import { Injectable } from '@nestjs/common';

@Injectable()
export class GrpcService {
  public static getAuthProtoPath() {
    return 'src/proto/auth.proto';
  }
}
