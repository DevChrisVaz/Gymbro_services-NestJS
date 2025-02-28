import { CheckIfUserNameAlreadyUsedService, UserNameAlreadyUsedException } from "@auth/domain";
import { Injectable } from "@nestjs/common";
import { HashingService } from "@security/domain";
import { CreateUserService, TCreateUserServiceParams } from "@user/domain";

export type TCreateUserUseCaseParams = {
  user: TCreateUserServiceParams;
};

export type TCreateUserUseCaseResponse = Promise<void>;

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly _checkIfUserNameAlreadyUsedService: CheckIfUserNameAlreadyUsedService,
    private readonly _createUserService: CreateUserService,
    private readonly _hashingService: HashingService,
  ) {}

  async exec(params: TCreateUserUseCaseParams): TCreateUserUseCaseResponse {
    if (
      await this._checkIfUserNameAlreadyUsedService.exec(params.user.userName)
    )
      throw new UserNameAlreadyUsedException();

    params.user.password = await this._hashingService.hash(
      params.user.password,
    );

    await this._createUserService.exec(params.user);
    return;
  }
}
