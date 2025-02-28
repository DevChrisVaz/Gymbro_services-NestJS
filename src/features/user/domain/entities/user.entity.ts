import { TCredentials } from '@auth/domain';
import { TPerson, Person } from './person.entity';
import { UserStatus } from '../enums';

export type TUser = Omit<TPerson, 'personId'> &
  Pick<TCredentials, 'userName'> & {
    userId: string;
    status: UserStatus;
  };

export class User extends Person implements TUser {
  public userId: string;
  public status: UserStatus;
  public userName: string;

  constructor(user: TUser) {
    super({
      firstName: user.firstName,
      lastName: user.lastName,
      personId: user.userId,
      profilePicture: user.profilePicture,
    });
    Object.assign(this, {
      userId: user.userId,
      status: user.status,
      userName: user.userName,
    });
  }
}
