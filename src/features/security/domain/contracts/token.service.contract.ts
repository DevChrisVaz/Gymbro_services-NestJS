export abstract class TokenService {
  abstract generateToken<T = null>(payload: T, exp?: number): Promise<string>;
  abstract verifyToken<T = null>(token: string): Promise<T>;
}
