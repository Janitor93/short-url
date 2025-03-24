import { Injectable, ForbiddenException, HttpStatus } from '@nestjs/common';
import { LoggerService, PasswordService } from '@app/common';

import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto } from './dto';

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

  public async createUser({ email, password }: CreateUserDto): Promise<Omit<User, 'password'>> {
    await this.checkEmail(email);
    const result = await this.userRepository.save({
      email,
      password: await this.passwordService.hashPassword(password),
    });
    delete result.password;
    return result;
  }
}
