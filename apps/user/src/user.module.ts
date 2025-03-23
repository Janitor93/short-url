import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule, PasswordModule } from '@app/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [DatabaseModule.forRoot([User]), LoggerModule.registry('url'), PasswordModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
