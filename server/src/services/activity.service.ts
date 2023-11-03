import { Service } from "typedi";

import { accessibility } from "@custom-types/activity.accessibility";
import { price } from "@custom-types/activity.price";
import { ActivityDTO } from "@interfaces/activity.dto";
import { IActivity } from "@interfaces/activity.interface";

export const HIGH_ACCESSIBILITY = "High";
export const MEDIUM_ACCESSIBILITY = "Medium";
export const LOW_ACCESSIBILITY = "Low";
export const FREE_PRICE = "Free";
export const LOW_PRICE = "Low";
export const HIGH_PRICE = "High";

@Service()
class ActivityService {
  private mapAccessibility(value: number): accessibility {
    if (value <= 0.25) return HIGH_ACCESSIBILITY;
    if (value <= 0.75) return MEDIUM_ACCESSIBILITY;
    return LOW_ACCESSIBILITY;
  }

  private mapPrice(value: number): price {
    if (value === 0) return FREE_PRICE;
    if (value <= 0.5) return LOW_PRICE;
    return HIGH_PRICE;
  }

  getActivity(dto: ActivityDTO): IActivity {
    const activity: IActivity = {
      ...dto,
      accessibility: this.mapAccessibility(dto.accessibility),
      price: this.mapPrice(dto.price),
    };
    return activity;
  }
}

export default ActivityService;
