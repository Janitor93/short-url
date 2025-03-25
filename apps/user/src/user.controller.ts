import { Controller, Post, Get, Param, Body, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter, PasswordInterceptor } from '@app/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { User } from './user.entity';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(PasswordInterceptor)
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Get('/:id')
  @UseInterceptors(PasswordInterceptor)
  public async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }
}
