import { UUIDService } from 'src/shared/uuid/contracts/uuid.service.contract';
import { PersonRepository } from '../contracts/person.repository.contract';
import { UserRepository } from '../contracts/user.repository.contract';
import { TUser } from '../entities/user.entity';
import { UserStatus } from '../enums/user_status.enum';
import { CredentialsRepository, TCredentials } from '@auth/domain';

export type TCreateUserServiceParams = Omit<TUser, 'userId' | 'status'> &
  Omit<TCredentials, 'credentialsId'>;

export type TCreateUserServiceResponse = Promise<void>;

export class CreateUserService {
  constructor(
    private readonly _personRepository: PersonRepository,
    private readonly _userRepository: UserRepository,
    private readonly _credentialsRepository: CredentialsRepository,
    private readonly _uuidService: UUIDService,
  ) {}

  async exec(user: TCreateUserServiceParams): TCreateUserServiceResponse {
    const userId = this._uuidService.generateV7();

    await this._personRepository.save({
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: user.profilePicture,
      personId: userId,
    });

    await this._credentialsRepository.save({
      credentialsId: userId,
      password: user.password,
      userName: user.userName,
    });

    await this._userRepository.save({
      userId: userId,
      status: UserStatus.PENDING,
    });

    return;
  }
}
