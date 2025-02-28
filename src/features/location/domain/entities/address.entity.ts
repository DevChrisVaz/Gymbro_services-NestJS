import { AddressStatus } from '../enums/address_status.enum';

export type TAddress = {
  addressId: string;
  street: string;
  buildingNumber: string;
  zipCode: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  status: AddressStatus;
};

export class Address implements TAddress {
  public addressId: string;
  public street: string;
  public buildingNumber: string;
  public zipCode: string;
  public neighborhood: string;
  public city: string;
  public state: string;
  public country: string;
  public status: AddressStatus;

  constructor(address: TAddress) {
    Object.assign(this, address);
  }
}
