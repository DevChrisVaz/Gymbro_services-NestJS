import { GymRepository } from '../contracts/gym.repository.contract';
import { TGym } from '../entities/gym.entity';

export type TCheckIfGymAlreadyExistsService = Pick<TGym, 'email'>;

export class CheckIfGymAlreadyExistsService {
  constructor(private readonly _gymRepository: GymRepository) {}

  async exec(gymData: TCheckIfGymAlreadyExistsService): Promise<boolean> {
    let foundGym = await this._gymRepository.findOne({
      email: {
        eq: gymData.email,
      },
    });

    return foundGym ? true : false;
  }
}
