import { CacheService } from '@database/domain/contracts/cache.service.contract';
import { VerifyEncryptedTokenService } from '@security/domain/services/verify_encrypted_token.service';
import { TTokens } from '../types/credentials.type';
import { CannotPerformAccessTokenRefreshingException } from '../exceptions/cannot_perform_access_token_refreshing.exception';

export type TValidateTokensServiceResponse = Promise<{
  accessTokenPayload: Record<string, any> & {
    userId: string;
    deviceId: string;
  };
  expirations: {
    accessToken: number;
    refreshToken?: number;
  };
}>;

export class ValidateTokensService {
  constructor(
    private readonly _verifyEncryptedTokenService: VerifyEncryptedTokenService,
    private readonly _cacheService: CacheService,
  ) {}

  async exec(tokens: TTokens): TValidateTokensServiceResponse {
    const refreshTokenPayload = await this._verifyEncryptedTokenService.exec<{
      accessToken: string;
    }>({
      token: tokens.refreshToken,
      key: '',
    });

    if (!(tokens.accessToken === refreshTokenPayload.accessToken))
      throw new CannotPerformAccessTokenRefreshingException(
        'Access token provided is not contained in refresh token payload',
      );

    const accessTokenPayloadWithExp =
      await this._verifyEncryptedTokenService.exec<{
        userId: string;
        deviceId: string;
      }>({
        token: tokens.accessToken,
        key: '',
      });

    const { exp: accessTokenExp, ...accessTokenPayload } =
      accessTokenPayloadWithExp;

    const allowedTokens = await this._cacheService.get<{
      accessToken: string;
      refreshToken: string;
    }>(`TOKENS:${accessTokenPayload.userId}:${accessTokenPayload.deviceId}`);

    if (!allowedTokens)
      throw new CannotPerformAccessTokenRefreshingException(
        'Tokens were not found in cache',
      );

    if (
      !(
        tokens.accessToken === allowedTokens.accessToken &&
        tokens.refreshToken === allowedTokens.refreshToken
      )
    )
      throw new CannotPerformAccessTokenRefreshingException(
        'Tokens provided are not the ones stored in cache',
      );

    return {
      accessTokenPayload: accessTokenPayload,
      expirations: {
        accessToken: accessTokenExp!,
        refreshToken: refreshTokenPayload.exp,
      },
    };
  }
}
