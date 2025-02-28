import { GymStatus } from '../enums/gym_status.enum';

export type TGym = {
  gymId: string;
  name: string;
  description: string;
  email: string;
  logo?: string;
  status: GymStatus;
};

export class Gym implements TGym {
  public gymId: string;
  public name: string;
  public description: string;
  public email: string;
  public logo?: string;
  public status: GymStatus;

  constructor(gym: TGym) {
    Object.assign(this, gym);
  }
}
