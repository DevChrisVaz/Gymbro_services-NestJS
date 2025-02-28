export type TPerson = {
  personId: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
};

export class Person implements TPerson {
  public personId: string;
  public firstName: string;
  public lastName: string;
  public profilePicture: string;

  constructor(person: TPerson) {
    Object.assign(this, person);
  }
}
