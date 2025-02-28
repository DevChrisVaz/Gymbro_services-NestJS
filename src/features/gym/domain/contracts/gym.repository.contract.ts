import { Repository } from '@database/domain/contracts/repository.contract';
import { TGym } from '../entities/gym.entity';

export abstract class GymRepository extends Repository<TGym> {}
