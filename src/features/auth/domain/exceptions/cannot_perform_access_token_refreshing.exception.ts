import { Exception } from 'src/core/exceptions/exception';

export class CannotPerformAccessTokenRefreshingException extends Exception {
  /**
   * @param detail A human-readable explanation specific to this occurrence of the problem.
   */
  constructor(detail?: string) {
    super({
      code: 'CannotPerformAccessTokenRefreshingException',
      detail: detail ?? 'An error ocurred while trying to refresh the token',
      title: 'Cannot perform the access token refreshing',
      status: '403',
      hideDetails: true,
    });
  }
}
