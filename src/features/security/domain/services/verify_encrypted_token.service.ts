import { TokenService } from '../contracts/token.service.contract';
import { EncryptionService } from '../contracts/encryption.service.contract';

export type TVerifyEncryptedTokenService = {
  token: string;
  key: string;
};

export class VerifyEncryptedTokenService {
  constructor(
    private readonly _tokenService: TokenService,
    private readonly _encryptionService: EncryptionService,
  ) {}

  async exec<T extends Record<string, any>>(
    params: TVerifyEncryptedTokenService,
  ): Promise<T & { exp?: number }> {
    const encryptedPayload: string =
      await this._tokenService.verifyToken<string>(params.token);

    const payload = this._encryptionService.decrypt(
      encryptedPayload,
      params.key,
    );

    return JSON.parse(payload);
  }
}
