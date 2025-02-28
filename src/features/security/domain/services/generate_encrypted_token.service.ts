import { EncryptionService } from '../contracts/encryption.service.contract';
import { TokenService } from '../contracts/token.service.contract';

export type TGenerateEncryptedTokenServiceParams<T = Record<string, any>> = {
  payload: T;
  key: string;
  exp?: number;
};

export class GenerateEncryptedTokenService {
  constructor(
    private readonly _encryptionService: EncryptionService,
    private readonly _tokenService: TokenService,
  ) {}

  async exec<T = Record<string, any>>(
    params: TGenerateEncryptedTokenServiceParams<T>,
  ): Promise<string> {
    const encryptedPayload = this._encryptionService.encrypt(
      JSON.stringify({
        ...params.payload,
        exp: params.exp,
      }),
      params.key,
    );
    const token = await this._tokenService.generateToken(
      encryptedPayload,
      params.exp,
    );

    return token;
  }
}
