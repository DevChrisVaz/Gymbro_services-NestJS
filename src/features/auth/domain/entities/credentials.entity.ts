export type TCredentials = {
  credentialsId: string;
  password: string;
  userName: string;
};

export class Credentials implements TCredentials {
  public credentialsId: string;
  public password: string;
  public userName: string;

  constructor(credentials: TCredentials) {
    Object.assign(this, credentials);
  }
}
