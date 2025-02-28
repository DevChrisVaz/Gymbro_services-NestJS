import { CredentialsRepository } from '../contracts/credentials.repository.contract';

export class CheckIfUserNameAlreadyUsedService {
  constructor(private readonly _credentialsRepository: CredentialsRepository) {}

  async exec(userName: string): Promise<boolean> {
    const foundCredentials = await this._credentialsRepository.findOne({
      userName: {
        eq: userName,
      },
    });

    return foundCredentials ? true : false;
  }
}
