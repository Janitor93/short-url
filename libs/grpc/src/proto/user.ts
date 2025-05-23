// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v5.29.3
// source: src/proto/user.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserCredentialsResponse {
  userId: string;
  email: string;
}

export const USER_PACKAGE_NAME = "user";

export interface RpcUserServiceClient {
  compareCredentials(request: UserCredentials): Observable<UserCredentialsResponse>;
}

export interface RpcUserServiceController {
  compareCredentials(
    request: UserCredentials,
  ): Promise<UserCredentialsResponse> | Observable<UserCredentialsResponse> | UserCredentialsResponse;
}

export function RpcUserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["compareCredentials"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("RpcUserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("RpcUserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const RPC_USER_SERVICE_NAME = "RpcUserService";
