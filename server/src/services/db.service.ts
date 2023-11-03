import axios, { AxiosInstance } from "axios";
import { Service } from "typedi";

@Service()
class DBService {
  private baseURL: string;
  private http: AxiosInstance;

  constructor() {
    this.baseURL = process.env.DB_SERVER_BASE_URL;
    this.http = axios.create({
      baseURL: this.baseURL,
    });
  }

  async read<T>(
    collection: string,
  ): Promise<T[]> {
    return this.http
      .get<T[]>(collection)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        throw new Error(
          "Erro: Something went wrong while trying read from DB."
        );
      });
  }

  async readById<T>(
    collection: string,
    id: number
  ): Promise<T> {
    return this.http
      .get<T>(`${collection}/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        if (e.response && e.response.status === 404) return null
        throw new Error(
          "Erro: Something went wrong while trying read from DB."
        );
      });
  }

  async save<T>(
    collection: string,
    data: T
  ): Promise<T> {
    return this.http
      .post<T>(collection, data)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        throw new Error(
          "Erro: Something went wrong while trying write to DB."
        );
      });
  }
}

export default DBService;
