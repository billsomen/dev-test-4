import { accessibility } from "@custom-types/activity.accessibility";
import { price } from "@custom-types/activity.price";

export interface IActivity {
  activity: string;
  accessibility: accessibility;
  type: string;
  participants: number;
  price: price;
  link: string;
  key: string;
}