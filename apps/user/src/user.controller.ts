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
import { HttpExceptionFilter, PasswordInterceptor, RpcExceptionFilter } from '@app/common';
import {
  RpcUserServiceController,
  RpcUserServiceControllerMethods,
  UserCredentials,
  UserCredentialsResponse,
} from '@app/grpc';

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, GetUserListDto } from './dto';
import { User } from './user.entity';

@Controller('users')
@UseFilters(HttpExceptionFilter, RpcExceptionFilter)
@RpcUserServiceControllerMethods()
export class UserController implements RpcUserServiceController {
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

  public async compareCredentials(request: UserCredentials): Promise<UserCredentialsResponse> {
    const { email, password } = request;
    const result = await this.userService.compareCredentials(email, password);
    return result;
  }
}
