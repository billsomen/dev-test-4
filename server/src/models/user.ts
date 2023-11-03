import { accessibility } from "@custom-types/activity.accessibility";
import { price } from "@custom-types/activity.price";
import { IUser } from "@interfaces/user.interface";
import DBService from "@services/db.service";

class User implements IUser {
  private collection: string;
  private db: DBService;
  readonly name: string;
  readonly accessibility: accessibility;
  readonly price: price;

  constructor(
    userName: string,
    userAccessibility: accessibility,
    userPrice: price
  ) {
    this.collection = "users";
    this.db = new DBService();
    this.name = userName;
    this.accessibility = userAccessibility;
    this.price = userPrice;
  }

  async save(): Promise<IUser> {
    return this.db.save<IUser>(this.collection, this);
  }
}

export default User;
