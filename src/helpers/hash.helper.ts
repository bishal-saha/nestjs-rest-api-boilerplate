import * as bcrypt from 'bcryptjs';
import { InternalServerErrorException } from '@nestjs/common';

export class HashHelper {
  private static salt = 12;

  /**
   * Encrypts plain text
   * @param str
   * @return Promise<string> returns encrypted text
   */
  public static async encrypt(str: string): Promise<string> {
    try {
      return await bcrypt.hash(str, this.salt);
    } catch (err) {
      throw new InternalServerErrorException('Encryption failed!');
    }
  }

  /**
   * Compare provided plain text with provided ecrypted text
   * @param plainText {string}
   * @param encryptedText {string}
   * @return Promise<boolean> returns boolean
   */
  public static async compare(
    plainText: string,
    encryptedText: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(plainText, encryptedText);
    } catch (err) {
      throw new InternalServerErrorException(
        'Encrypted text comparison failed!',
      );
    }
  }
}
