import { Repository } from '@database/domain';
import { User } from '../entities/user.entity';

export type UserDB = Pick<User, 'userId' | 'status'>;

export abstract class UserRepository extends Repository<UserDB> {}
