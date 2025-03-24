import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@app/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { User } from './user.entity';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    return await this.userService.createUser(createUserDto);
  }
}
