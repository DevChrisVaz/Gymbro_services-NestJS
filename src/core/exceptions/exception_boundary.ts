import { DomainService } from '../services/domain_service.contract';
import { Exception } from './exception';

export class ExceptionBoundary<T extends DomainService<any, any>[]> {
  private _index = 0;
  private _errors: Exception[] = [];

  constructor(private readonly _services: T) {}

  hasNext(): boolean {
    return this._index < this._services.length;
  }

  next(
    params?: Parameters<T[number]['exec']>[0],
  ): ReturnType<T[number]['exec']> | null {
    if (!this.hasNext()) {
      return null;
    }

    const service = this._services[this._index++];
    try {
      return service.exec(params);
    } catch (error) {
      this._errors.push(error);
      return null;
    }
  }
}
