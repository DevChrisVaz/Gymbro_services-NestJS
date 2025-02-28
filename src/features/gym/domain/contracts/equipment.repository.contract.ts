import { Repository } from '@database/domain/contracts/repository.contract';
import { Equipment } from '../entities/equipment.entity';

export abstract class EquipmentRepository extends Repository<Equipment> {}
