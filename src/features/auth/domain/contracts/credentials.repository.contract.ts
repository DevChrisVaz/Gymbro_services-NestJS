import { Repository } from '@database/domain/contracts/repository.contract';
import { Credentials, TCredentials } from '../entities/credentials.entity';

export abstract class CredentialsRepository extends Repository<TCredentials> {}
