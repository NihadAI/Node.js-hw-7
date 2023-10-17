import { Service } from "typedi";
import { IUsers } from "../../interfaces";
import FileDB from "../dal/FileDB";

@Service()
class UsersService {

  constructor(private users: FileDB<IUsers>, ) {
    this.initializeNewsPosts();
}

private async initializeNewsPosts() {
    try {
        this.users = await FileDB.getTable('users');
        console.log(this.users);
    } catch (error) {
        console.log(error);
    }
}

  getUserByEmail = async (email: string) => {
    const user = await this.users.getById(email, "email")
    return user ? { ...user } : null;
  };

  createAUser = async (user: IUsers) => {
    user.id = (await this.users.getAll()).length + 1;
    return this.users.create(user)
  };

}

export default UsersService;
