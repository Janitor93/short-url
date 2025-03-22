import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from '@app/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User]), LoggerModule.registry('url')],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
