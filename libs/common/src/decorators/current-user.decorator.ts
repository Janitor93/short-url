import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: 'userId' | 'email' = 'userId', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.locals.user[data] || null;
  }
);