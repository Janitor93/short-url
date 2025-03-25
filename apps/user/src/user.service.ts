import { Injectable, ForbiddenException } from '@nestjs/common';
import { PasswordService } from '@app/common';

import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  public async checkEmail(email: string): Promise<void> {
    const result = await this.userRepository.isEmailExist(email);
    if (result) throw new ForbiddenException('This email is already registered!');
  }

  public async createUser({ email, password }: CreateUserDto): Promise<User> {
    await this.checkEmail(email);
    const result = await this.userRepository.save({
      email,
      password: await this.passwordService.hashPassword(password),
    });
    return result;
  }

  public async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    return user;
  }

  public async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    return await this.userRepository.update(id, data);
  }
}
