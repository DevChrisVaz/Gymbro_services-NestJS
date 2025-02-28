import { Exception } from 'src/core/exceptions/exception';

export class GymAlreadyExistsException extends Exception {
  constructor() {
    super({
      code: 'GymAlreadyExistsException',
      detail: 'The gym you are trying to register already exists.',
      title: 'Gym Already Exists',
      status: '400',
    });
  }
}
