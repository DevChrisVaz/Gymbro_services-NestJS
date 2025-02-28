import {
  CheckIfUserNameAlreadyUsedService,
  UserNameAlreadyUsedException,
} from '@auth/domain';
import { GymAlreadyExistsException } from '@gym/domain/exceptions/gym_already_exists.exception';
import { CheckIfGymAlreadyExistsService } from '@gym/domain/services/check_if_gym_already_exists.service';
import { TCreateBranchServiceParams } from '@gym/domain/services/create_branch.service';
import {
  CreateGymService,
  TCreateGymServiceParams,
} from '@gym/domain/services/create_gym.service';
import {
  CreateGymUserService,
  TCreateGymUserServiceParams,
} from '@gym/domain/services/create_gym_user.service';
import { TCreateAddressServiceParams } from '@location/domain/services/create_address.service';

export type TRegisterGymUseCaseParams = {
  gym: Omit<TCreateGymServiceParams, 'gymId'>;
  user: Omit<TCreateGymUserServiceParams, 'gymId'>;
  branchAddress: TCreateAddressServiceParams;
  branch: Omit<TCreateBranchServiceParams, 'gymId' | 'addressId'>;
};

export class RegisterGymUseCase {
  constructor(
    private readonly _checkIfUserNameAlreadyUsedService: CheckIfUserNameAlreadyUsedService,
    private readonly _checkIfGymAlreadyExistsService: CheckIfGymAlreadyExistsService,
    private readonly _createGymService: CreateGymService,
    private readonly _createGymUserService: CreateGymUserService,
  ) {}

  async exec(params: TRegisterGymUseCaseParams): Promise<void> {
    if (
      await this._checkIfUserNameAlreadyUsedService.exec(params.user.userName)
    )
      throw new UserNameAlreadyUsedException();

    if (
      await this._checkIfGymAlreadyExistsService.exec({
        email: params.gym.email,
      })
    ) {
      throw new GymAlreadyExistsException();
    }

    const createdGym = await this._createGymService.exec(params.gym);
  }
}
