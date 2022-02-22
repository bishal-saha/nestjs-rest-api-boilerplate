import { HashHelper } from '@src/common/helpers/hash.helper';
import { InternalServerErrorException } from '@nestjs/common';

describe('HashHelper', () => {
  describe('encrypt()', () => {
    it('should throw an error when provided text is null', async () => {
      const plainText = null;
      try {
        await HashHelper.encrypt(plainText);
      } catch (err) {
        expect(err).toBeInstanceOf(InternalServerErrorException);
        expect(err).toHaveProperty('message', 'Encryption failed!');
      }
    });

    it('should return encrypted string', async () => {
      const plainText = 'my-text';
      const encryptedText = await HashHelper.encrypt(plainText);
      expect(encryptedText.length).not.toEqual(0);
    });
  });

  describe('compare()', () => {
    it('should throw an error, if provided plain text is null', async () => {
      const plainText = null;
      const encryptedText = 'abcdefg';

      try {
        await HashHelper.compare(plainText, encryptedText);
      } catch (err) {
        expect(err).toBeInstanceOf(InternalServerErrorException);
        expect(err).toHaveProperty(
          'message',
          'Encrypted text comparison failed!',
        );
      }
    });

    it('should throw an error, if provided encrypted text is null', async () => {
      const plainText = 'my-password';
      const encryptedText = null;

      try {
        await HashHelper.compare(plainText, encryptedText);
      } catch (err) {
        expect(err).toBeInstanceOf(InternalServerErrorException);
        expect(err).toHaveProperty(
          'message',
          'Encrypted text comparison failed!',
        );
      }
    });

    it('should return false, if plain text and encrypted text do nat matches', async () => {
      const plainText = 'my-password';
      const encryptedText = 'my-other-password';

      expect(await HashHelper.compare(plainText, encryptedText)).toBeFalsy();
    });

    it('should return true, if plain text and encrypted text do nat matches', async () => {
      const plainText = 'my-password';
      const encryptedText = await HashHelper.encrypt(plainText);

      expect(await HashHelper.compare(plainText, encryptedText)).toBeTruthy();
    });
  });
});
