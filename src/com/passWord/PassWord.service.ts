import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class PassWordService {
  /**
   * 패스워드 암호화
   * @param plainTextPassword 암호화되지 않은 패스워드
   * @returns hashedPassword 암호화 된 패스워드
   */
  async hashPassword(userPassword: string): Promise<string> {
    return await hash(userPassword, 10);
  }

  /**
   * 패스워드 비교
   * @param plainTextPassword 암호화 되지 않은 패스워드
   * @param hashedPassword 암호화 된 패스워드
   * @returns Boolean
   */
  async validatePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(plainTextPassword, hashedPassword);
  }
}
