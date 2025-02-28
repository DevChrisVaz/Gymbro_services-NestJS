export abstract class CacheService {
  abstract get<T extends Record<string, any> | string | number | boolean>(
    key: string,
  ): Promise<T | null>;
  abstract set(key: string, value: string, exp?: number): Promise<void>;
  abstract del(key: string): Promise<void>;
}
