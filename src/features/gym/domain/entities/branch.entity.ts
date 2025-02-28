import { BranchStatus } from '../enums/branch_status.enum';

export type TBranch = {
  branchId: string;
  gymId: string;
  addressId: string;
  name: string;
  phone: string;
  email: string;
  status: BranchStatus;
};

export class Branch implements TBranch {
  public branchId: string;
  public gymId: string;
  public addressId: string;
  public name: string;
  public phone: string;
  public email: string;
  public status: BranchStatus;

  constructor(branch: TBranch) {
    Object.assign(this, branch);
  }
}
