import { CredentialsRepository } from '../contracts/credentials.repository.contract';
import { TCredentials } from '../entities/credentials.entity';
import { HashingService } from '@security/domain';

export class CheckCredentialsService {
  constructor(
    private readonly _credentialsRepository: CredentialsRepository,
    private readonly _hashingService: HashingService,
  ) {}

  async exec(params: Omit<TCredentials, 'credentialsId'>): Promise<string> {
    const foundCredentials: TCredentials | null =
      await this._credentialsRepository.findOne({
        userName: {
          eq: params.userName,
        },
      });

    if (!foundCredentials) throw new Error('');

    if (
      !this._hashingService.compare(params.password, foundCredentials.password)
    )
      throw new Error('');

    return foundCredentials.credentialsId;
  }
}
