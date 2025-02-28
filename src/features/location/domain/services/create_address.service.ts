import { UUIDService } from 'src/shared/uuid/contracts/uuid.service.contract';
import { Address, TAddress } from '@location/domain';
import { AddressRepository } from '../contracts/address.repository.contract';
import { AddressStatus } from '../enums/address_status.enum';

export type TCreateAddressServiceParams = Omit<
  TAddress,
  'addressId' | 'status'
>;

export class CreateAddressService {
  constructor(
    private readonly _addressRepository: AddressRepository,
    private readonly _uuidService: UUIDService,
  ) {}

  async exec(params: TCreateAddressServiceParams): Promise<Address> {
    const addressId = this._uuidService.generateV7();
    const address = await this._addressRepository.save({
      ...params,
      addressId,
      status: AddressStatus.ACTIVE,
    });

    return address;
  }
}
