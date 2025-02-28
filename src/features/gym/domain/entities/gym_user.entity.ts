import { TCredentials } from '@auth/domain';
import { Person, TPerson } from '@user/domain';
import { GymUserRoles } from '../enums/gym_user_roles.enum';
import { GymUserStatus } from '../enums/gym_user_status.enum';

export type TGymUser = Omit<TPerson, 'personId'> &
  Pick<TCredentials, 'userName'> & {
    gymUserId: string;
    gymId: string;
    role: GymUserRoles;
    status: GymUserStatus;
  };

export class GymUser extends Person implements TGymUser {
  public gymUserId: string;
  public gymId: string;
  public role: GymUserRoles;
  public userName: string;
  public status: GymUserStatus;

  constructor(gymUser: TGymUser) {
    super({
      firstName: gymUser.firstName,
      lastName: gymUser.lastName,
      personId: gymUser.gymUserId,
      profilePicture: gymUser.profilePicture,
    });
    Object.assign(this, {
      gymUserId: gymUser.gymUserId,
      gymId: gymUser.gymId,
      role: gymUser.role,
      userName: gymUser.userName,
    });
  }
}
