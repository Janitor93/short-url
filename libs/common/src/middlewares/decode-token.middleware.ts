import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DecodeTokenMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request & { locals: Record<string, unknown> }, _res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    req.locals = { user: {} };

    try {
      const userInfo = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });
      req.locals.user = {
        userId: userInfo.sub,
        email: userInfo.email,
      };
    } catch (_error) {
      console.error(_error);
    }

    next();
  }
}
