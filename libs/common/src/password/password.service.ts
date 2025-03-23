import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private static readonly SALT_ROUNDS = 10;

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, PasswordService.SALT_ROUNDS);
  }

  public async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
