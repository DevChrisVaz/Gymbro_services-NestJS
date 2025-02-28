export interface IEquipment {
  branchId: string;
  description: string;
  equipmentId: string;
  gymId: string;
  image: string;
  name: string;
  status: string;
}

export class Equipment implements IEquipment {
  public branchId: string;
  public description: string;
  public equipmentId: string;
  public gymId: string;
  public image: string;
  public name: string;
  public status: string;

  constructor(equipment: IEquipment) {
    Object.assign(this, equipment);
  }
}
