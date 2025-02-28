import { Repository } from '@database/domain';
import { GymUser, TGymUser } from '../entities/gym_user.entity';

export type TGymUserDB = Pick<
  TGymUser,
  'gymId' | 'role' | 'status' | 'gymUserId'
>;

export abstract class GymUserRepository extends Repository<TGymUserDB> {}
