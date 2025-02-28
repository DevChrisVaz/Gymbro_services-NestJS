import { Injectable } from '@nestjs/common';
import { CheckCredentialsService, TCredentials } from '@auth/domain';
import { FindUserService } from '@user/domain/services/find_user.service';
import { GenerateEncryptedTokenService } from '@security/domain/services/generate_encrypted_token.service';
import { CacheService } from '@database/domain/contracts/cache.service.contract';

export type TLoginUseCaseParams = Omit<TCredentials, 'credentialsId'> & {
  deviceId: string;
};

export type TLoginUseCaseResponse = Promise<{
  accessToken: string;
  refreshToken: string;
}>;

@Injectable()
export class UserLoginUseCase {
  constructor(
    private readonly _findCredentialsService: CheckCredentialsService,
    private readonly _findUserService: FindUserService,
    private readonly _generateEncryptedTokenService: GenerateEncryptedTokenService,
    private readonly _cacheService: CacheService,
  ) {}

  async exec(params: TLoginUseCaseParams): TLoginUseCaseResponse {
    const credentialsId: string =
      await this._findCredentialsService.exec(params);

    const foundUser = await this._findUserService.exec({
      userId: {
        eq: credentialsId,
      },
    });

    if (!foundUser) throw new Error('');

    const accessToken = await this._generateEncryptedTokenService.exec({
      key: '',
      payload: {
        userId: foundUser.userId,
        deviceId: params.deviceId
      },
      exp: 0,
    });

    const refreshToken = await this._generateEncryptedTokenService.exec({
      key: '',
      payload: {
        accessToken,
      },
      exp: 0,
    });

    await this._cacheService.set(
      `TOKENS:${foundUser.userId}:${params.deviceId}`,
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
