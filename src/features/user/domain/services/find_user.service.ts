import { PersonRepository, UserRepository } from '../contracts';
import { CredentialsRepository } from '@auth/domain';
import { TUser, User } from '../entities';
import { TFilters } from '@database/domain';

export class FindUserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _personRepository: PersonRepository,
    private readonly _credentialsRepository: CredentialsRepository,
  ) {}
  async exec(filter: TFilters<TUser>): Promise<User | null> {
    const foundUser = await this._userRepository.findOne({
      status: filter.status,
      userId: filter.userId,
    });

    if (!foundUser) return null;

    const foundCredentials = await this._credentialsRepository.findOne({
      credentialsId: filter.userId,
      userName: filter.userName,
    });

    if (!foundCredentials) return null;

    const foundPerson = await this._personRepository.findOne({
      firstName: filter.firstName,
      lastName: filter.lastName,
      personId: filter.userId,
    });

    if (!foundPerson) return null;

    return new User({
      firstName: foundPerson.firstName,
      lastName: foundPerson.lastName,
      profilePicture: foundPerson.profilePicture,
      status: foundUser.status,
      userId: foundUser.userId,
      userName: foundCredentials.userName,
    });
  }
}
