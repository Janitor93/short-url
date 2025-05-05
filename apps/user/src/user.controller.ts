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
import { ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, GetUserListDto } from './dto';
import { User } from './user.entity';

@Controller('users')
@UseFilters(HttpExceptionFilter, RpcExceptionFilter)
@RpcUserServiceControllerMethods()
export class UserController implements RpcUserServiceController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create user',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns user information except the password',
    example: {
      email: 'test1@test.com',
      id: '685cbce5-64e3-42de-b457-60e9d7be0e45',
      createdAt: '2025-05-05T18:03:44.685Z',
      updatedAt: '2025-05-05T18:03:44.685Z'
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Email already exists, validation errors and etc.',
    example: {
      statusCode: 403,
      message: 'This email is already registered!'
    },
  })
  @UseInterceptors(PasswordInterceptor)
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get user by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns user information',
    example: {
      email: 'test1@test.com',
      id: '685cbce5-64e3-42de-b457-60e9d7be0e45',
      createdAt: '2025-05-05T18:03:44.685Z',
      updatedAt: '2025-05-05T18:03:44.685Z'
    },
  })
  @UseInterceptors(PasswordInterceptor)
  public async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getById(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get list of users',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns array of users',
    example: [{
      email: 'test1@test.com',
      id: '685cbce5-64e3-42de-b457-60e9d7be0e45',
      createdAt: '2025-05-05T18:03:44.685Z',
      updatedAt: '2025-05-05T18:03:44.685Z'
    }],
  })
  @UseInterceptors(PasswordInterceptor)
  public async getUsers(@Query() getUserListDto: GetUserListDto): Promise<User[]> {
    return await this.userService.getUsers(getUserListDto);
  }

  @Put()
  @ApiOperation({
    summary: 'Update user information',
  })
  @ApiHeader({ name: 'Authorization', description: 'Valid access token', required: true })
  @ApiResponse({
    status: 200,
    description: 'Returns user information',
    example: {
      email: 'test1@test.com',
      id: '685cbce5-64e3-42de-b457-60e9d7be0e45',
      createdAt: '2025-05-05T18:03:44.685Z',
      updatedAt: '2025-05-05T18:03:44.685Z'
    },
  })
  @ApiResponse({
    status: 403,
    description: 'The reason why record could not been updated',
    example: {
      statusCode: 403,
      message: 'This email is already registered!'
    },
  })
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
  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiHeader({ name: 'Authorization', description: 'Valid access token', required: true })
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden error if access token is invalid',
    example: {
      statusCode: 401,
      message: 'Unauthorized'
    },
  })
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
