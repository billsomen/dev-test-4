import { accessibility } from "@custom-types/activity.accessibility";
import { price } from "@custom-types/activity.price";

export interface IUser {
  readonly name: string;
  readonly accessibility: accessibility;
  readonly price: price;
}
