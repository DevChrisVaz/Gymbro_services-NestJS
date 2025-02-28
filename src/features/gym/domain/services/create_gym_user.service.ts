import { CredentialsRepository, TCredentials } from '@auth/domain';
import { GymUserRepository } from '../contracts/gym_user.repository';
import { TGymUser } from '../entities/gym_user.entity';
import { PersonRepository } from '@user/domain';
import { UUIDService } from 'src/shared/uuid/contracts/uuid.service.contract';
import { GymUserStatus } from '../enums/gym_user_status.enum';

export type TCreateGymUserServiceParams = Omit<
  TGymUser,
  'status' | 'gymUserId'
> &
  Omit<TCredentials, 'credentialsId'>;

export class CreateGymUserService {
  constructor(
    private readonly _personRepository: PersonRepository,
    private readonly _gymUserRepository: GymUserRepository,
    private readonly _credentialsRepository: CredentialsRepository,
    private readonly _uuidService: UUIDService,
  ) {}

  async exec(params: TCreateGymUserServiceParams): Promise<void> {
    const gymUserUUID = this._uuidService.generateV7();
    await this._personRepository.save({
      firstName: params.firstName,
      lastName: params.lastName,
      profilePicture: params.profilePicture,
      personId: gymUserUUID,
    });

    await this._credentialsRepository.save({
      credentialsId: gymUserUUID,
      password: params.password,
      userName: params.userName,
    });

    await this._gymUserRepository.save({
      gymUserId: gymUserUUID,
      gymId: params.gymId,
      role: params.role,
      status: GymUserStatus.ACTIVE,
    });
  }
}
