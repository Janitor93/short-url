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
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  HttpExceptionFilter,
  PasswordInterceptor,
  RpcExceptionFilter,
  JwtAuthGuard,
} from '@app/common';
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
  @UseInterceptors(PasswordInterceptor)
  public async getUsers(@Query() getUserListDto: GetUserListDto): Promise<User[]> {
    return await this.userService.getUsers(getUserListDto);
  }

  @Put()
  @UseInterceptors(PasswordInterceptor)
  @UseGuards(JwtAuthGuard)
  public async updateUser(
    @Request() request,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    const { userId } = request.user;
    return await this.userService.update(userId, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  public async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.delete(id);
  }

  public async compareCredentials(request: UserCredentials): Promise<UserCredentialsResponse> {
    const { email, password } = request;
    const result = await this.userService.compareCredentials(email, password);
    return result;
  }
}
