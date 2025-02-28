import { Repository } from '@database/domain/contracts/repository.contract';
import { Branch } from '../entities/branch.entity';

export abstract class BranchRepository extends Repository<Branch> {}
