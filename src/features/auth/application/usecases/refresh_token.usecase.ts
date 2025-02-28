import { ValidateTokensService } from '@auth/domain/services/validate_tokens.service';
import { CacheService } from '@database/domain/contracts/cache.service.contract';
import { GenerateEncryptedTokenService } from '@security/domain/services/generate_encrypted_token.service';

export type TRefreshTokenUseCaseParams = {
  accessToken: string;
  refreshToken: string;
};

export type TRefreshTokenUseCaseResponse = Promise<{
  accessToken: string;
  refreshToken: string;
}>;

export class RefreshTokenUseCase {
  constructor(
    private readonly _validateTokensService: ValidateTokensService,
    private readonly _generateEncryptedTokenService: GenerateEncryptedTokenService,
    private readonly _cacheService: CacheService,
  ) {}

  async exec(params: TRefreshTokenUseCaseParams): TRefreshTokenUseCaseResponse {
    const tokensInfo = await this._validateTokensService.exec({
      accessToken: params.accessToken,
      refreshToken: params.refreshToken,
    });

    const accessToken = await this._generateEncryptedTokenService.exec({
      key: '',
      payload: tokensInfo.accessTokenPayload,
      exp: tokensInfo.expirations.accessToken,
    });

    const refreshToken = await this._generateEncryptedTokenService.exec({
      key: '',
      payload: {
        accessToken,
      },
      exp: tokensInfo.expirations.refreshToken,
    });

    await this._cacheService.set(
      `TOKENS:${tokensInfo.accessTokenPayload.userId}:${tokensInfo.accessTokenPayload.deviceId}`,
      JSON.stringify({
        accessToken,
        refreshToken,
      }),
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
