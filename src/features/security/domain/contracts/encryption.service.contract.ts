export abstract class EncryptionService {
  abstract encrypt(plain: string, key: string): string;
  abstract decrypt(encrypted: string, key: string): string;
}
