import { Injectable } from '@nestjs/common';
import { LoggerService, PasswordService } from '@app/common';

import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerService,
    private readonly passwordService: PasswordService,
  ) {}

  public async checkEmail(email: string): Promise<void> {
    try {
      const result = await this.userRepository.isEmailExist(email);
      if (result) throw new Error('This email is already registered!');
    } catch (error) {
      throw error;
    }
  }

  public async createUser({ email, password }: CreateUserDto): Promise<Omit<User, 'password'>> {
    try {
      await this.checkEmail(email);
      const result = await this.userRepository.save({
        email,
        password: await this.passwordService.hashPassword(password),
      });
      delete result.password;
      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
