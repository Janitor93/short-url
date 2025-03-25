import { Injectable, ForbiddenException } from '@nestjs/common';
import { PasswordService } from '@app/common';

import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto, GetUserListDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  private async checkEmail(email: string): Promise<void> {
    const result = await this.userRepository.isEmailExist(email);
    if (result) throw new ForbiddenException('This email is already registered!');
  }

  private async checkUserById(id: string): Promise<void> {
    const result = await this.userRepository.findById(id);
    if (!result) throw new ForbiddenException('User doesn\'t exist.');
  }

  public async create({ email, password }: CreateUserDto): Promise<User> {
    await this.checkEmail(email);
    const result = await this.userRepository.save({
      email,
      password: await this.passwordService.hashPassword(password),
    });
    return result;
  }

  public async getById(id: string): Promise<User> {
    await this.checkUserById(id);
    const user = await this.userRepository.findById(id);
    return user;
  }

  public async getUsers(pagination: GetUserListDto): Promise<User[]> {
    const { page, limit } = pagination;
    const users = await this.userRepository.findAll({
      skip: (page - 1) * limit,
      take: limit,
    });

    return users;
  }

  public async update(id: string, data: UpdateUserDto): Promise<User> {
    await this.checkUserById(id);
    return await this.userRepository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.checkUserById(id);
    await this.userRepository.delete(id);
  }
}
