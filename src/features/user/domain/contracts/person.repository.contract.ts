import { Repository } from '@database/domain';
import { Person } from '../entities/person.entity';

export abstract class PersonRepository extends Repository<Person> {}
