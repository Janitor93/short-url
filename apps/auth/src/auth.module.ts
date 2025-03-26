import { Module } from '@nestjs/common';
import { RedisModule } from '@app/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [RedisModule.register('refresh')],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
