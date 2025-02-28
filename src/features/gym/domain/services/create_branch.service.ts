import { UUIDService } from 'src/shared/uuid/contracts/uuid.service.contract';
import { BranchRepository } from '../contracts/branch.repository.contract';
import { Branch, TBranch } from '../entities/branch.entity';
import { BranchStatus } from '../enums/branch_status.enum';

export type TCreateBranchServiceParams = Omit<TBranch, 'branchId' | 'status'>;

export class CreateBranchService {
  constructor(
    private readonly _uuidService: UUIDService,
    private readonly _branchRepository: BranchRepository,
  ) {}

  async exec(params: TCreateBranchServiceParams): Promise<Branch> {
    const branchId = this._uuidService.generateV7();
    const branch = await this._branchRepository.save({
      ...params,
      branchId,
      status: BranchStatus.PENDING,
    });
    return branch;
  }
}
