import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { HttpExceptionFilter, PasswordInterceptor } from '@app/common';

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, GetUserListDto } from './dto';
import { User } from './user.entity';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(PasswordInterceptor)
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get('/:id')
  @UseInterceptors(PasswordInterceptor)
  public async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getById(id);
  }

  @Get()
  public async getUsers(@Query() getUserListDto: GetUserListDto): Promise<User[]> {
    return await this.userService.getUsers(getUserListDto);
  }

  @Put('/:id')
  @UseInterceptors(PasswordInterceptor)
  public async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete('/:id')
  public async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.delete(id);
  }
}
