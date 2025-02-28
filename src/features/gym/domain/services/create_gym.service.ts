import { UUIDService } from 'src/shared/uuid/contracts/uuid.service.contract';
import { GymRepository } from '../contracts/gym.repository.contract';
import { Gym, TGym } from '../entities/gym.entity';
import { GymStatus } from '../enums/gym_status.enum';

export type TCreateGymServiceParams = Pick<
  TGym,
  'name' | 'email' | 'description' | 'logo'
>;

export class CreateGymService {
  constructor(
    private readonly _gymRepository: GymRepository,
    private readonly _uuidService: UUIDService,
  ) {}

  async exec(params: TCreateGymServiceParams): Promise<Gym> {
    const gymUUID = this._uuidService.generateV7();
    const gym = await this._gymRepository.save({
      ...params,
      gymId: gymUUID,
      status: GymStatus.PENDING,
    });

    return gym;
  }
}
