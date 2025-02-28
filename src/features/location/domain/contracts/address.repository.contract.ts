import { Repository } from '@database/domain';
import { TAddress } from '../entities/address.entity';

export abstract class AddressRepository extends Repository<TAddress> {}
