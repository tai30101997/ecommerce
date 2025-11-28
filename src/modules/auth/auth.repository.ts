import { UserDocument, UserModel } from "../../models";
import { User } from "../../models/user/user";


export class AuthRepository {
  static async findUser(email: string) {
    let user = await UserModel.findOne({ email }).lean();
    return user;
  }

  static async createUser(data: Partial<User>): Promise<UserDocument> {
    let user = new UserModel({
      name: data.name || '',
      email: data.email || '',
      password: data.password || '',
      role: data.role || 1,
      privileges: data.privileges || 7,
    });
    await user.save();
    return user
  };
  // let user = await UserModel.create(data);


}