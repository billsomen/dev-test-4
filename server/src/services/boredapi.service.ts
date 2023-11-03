import axios, { AxiosInstance } from "axios";
import { Service } from "typedi";

import { ActivityDTO } from "@interfaces/activity.dto";
import { IUser } from "@interfaces/user.interface";

@Service()
class BoredAPIService {
  private baseURL: string;
  private http: AxiosInstance;

  constructor() {
    this.baseURL = process.env.BORED_API_BASE_URL;
    this.http = axios.create({
      baseURL: this.baseURL,
    });
  }

  async getActivity(user?: IUser): Promise<ActivityDTO> {
    const params = new URLSearchParams();
    if (user) {
      switch (user.accessibility) {
        case 'High':
          params.append('maxaccessibility', '0.25')
          break;
        case 'Medium':
          params.append('minaccessibility', '0.26')
          params.append('maxaccessibility', '0.75')
          break;
        case 'Low':
          params.append('minaccessibility', '0.76')
          break;
        default:
          break;
      }
      switch (user.price) {
        case 'Free':
          params.append('price', '0')
          break;
        case 'Low':
          params.append('maxprice', '0.5')
          break;
        case 'High':
          params.append('minprice', '0.6')
          break;
        default:
          break;
      }
    }

    console.log(user, 'yo', params.toString());

    return this.http
      .get<ActivityDTO>(`/activity/?${params.toString()}`)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        throw new Error(
          "Erro: Something went wrong while trying to fetch the activity."
        );
      });
  }
}

export default BoredAPIService;
