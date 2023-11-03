import { IUser } from "@interfaces/user.interface";
import User from "@models/user";
import { Service } from "typedi";
import DBService from "./db.service";

@Service()
class UserService {

  constructor(private readonly dbService: DBService) {
  }

  async createUser(data: IUser): Promise<IUser> {
    const user = new User(data.name, data.accessibility, data.price);
    return user.save().catch((e) => {
      console.log(e)
      throw new Error(
        "Erro: Something went wrong while trying to create a user."
      );
    });
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.dbService.read<IUser>('users').catch((e) => {
      console.log(e)
      throw new Error(
        "Erro: Something went wrong while trying to read all users."
      );
    });
  }

  async getUserById(id: number): Promise<IUser> {
    return this.dbService.readById<IUser>('users', id).catch((e) => {
      console.log(e)
      throw new Error(
        `Erro: Something went wrong while trying to get user with id ${id}.`
      );
    });
  }
}

export default UserService;
