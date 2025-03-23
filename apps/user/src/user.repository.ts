import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository } from '@app/common';

import { User } from './user.entity';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  public async isEmailExist(email: string): Promise<boolean> {
    return await this.userRepository.existsBy({ email });
  }
}
