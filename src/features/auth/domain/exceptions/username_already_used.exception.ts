import { Exception } from 'src/core/exceptions/exception';

export class UserNameAlreadyUsedException extends Exception {
  constructor() {
    super({
      code: 'UserNameAlreadyUsedException',
      detail:
        'The username you provided is already associated with an existing account. Please use a different username.',
      title: 'Username Already Used',
      status: '400',
    });
  }
}
