import { TFilters } from '../types/filter.type';

export abstract class Repository<T> {
  abstract find(filter: TFilters<T>): Promise<T[]>;
  abstract findOne(filter: TFilters<T>): Promise<T | null>;
  abstract save(item: T): Promise<T>;
  abstract update(id: string, item: Partial<T>): Promise<T>;
  abstract delete(id: string): Promise<T>;
}
