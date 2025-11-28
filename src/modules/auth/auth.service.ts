import { HttpError } from "../../core/httpError";
import { CUSTOMER_PRIVILEGES, LoginSuccessResponse, RegisterSuccessResponseData, ResponseModel, UserRole } from "../../core/Type";
import { UserModel } from "../../models";
import { AuthProvider } from "./auth.provider";
import { AuthRepository } from "./auth.repository";


export class AuthService {
  static async register({ name, email, password }): Promise<ResponseModel<RegisterSuccessResponseData>> {
    let rs = new ResponseModel<RegisterSuccessResponseData>();
    rs.success = false;
    rs.message = 'Register  was unsuccessful.';
    try {
      if (!name || !email || !password) {
        const errorInfo = [{ errorCode: "400", errorMessage: "Name, email, and password are required." }];
        throw new HttpError({ status: 400, message: "Missing required fields", errors: errorInfo });
      }
      const exists = await AuthRepository.findUser(email);

      if (exists) {
        rs.success = false;
        rs.message = 'User with this email or name already exists.';
        return rs;
      };
      const hashed = await AuthProvider.hashPassword(password);
      const user = await AuthRepository.createUser({
        name,
        email,
        password: hashed,
        role: UserRole.Customer,
        privileges: CUSTOMER_PRIVILEGES
      });
      if (user) {
        rs.message = 'Register was successful.';
        rs.success = true;
        rs.data = {
          name: user.name,
          userId: (user.userId).toString(),
          email: user.email,
          role: user.role.toString(),
          privileges: user.privileges.toString(),

        };
      }
    } catch (err) {
      const errorInfo = [{ errorCode: "500", errorMessage: "Unknown error" }]
      throw new HttpError({ status: 400, message: "Invalid email or password", errors: errorInfo });
    }
    return rs;

  }

  static async login({ email, password }): Promise<ResponseModel<LoginSuccessResponse>> {
    let rs = new ResponseModel<LoginSuccessResponse>();
    rs.success = false;
    rs.message = 'Login was unsuccessful.';

    try {
      const user = await AuthRepository.findUser(email);
      if (!user) {
        const errorInfo = [{ errorCode: "400", errorMessage: "email, and password are required." }];
        throw new HttpError({ status: 400, message: "Invalid email or password", errors: errorInfo });
      }

      const match = await AuthProvider.comparePassword(password, user.password);
      if (!match) {
        const errorInfo = [{ errorCode: "401", errorMessage: "Invalid email or password" }];
        throw new HttpError({ status: 400, message: "Invalid email or password", errors: errorInfo });
      }

      const token = AuthProvider.signToken({
        id: user.userId,
        role: user.role,
        email: user.email,
        name: user.name,
        privileges: user.privileges,
      });
      if (token) {
        rs.message = 'Login was successful.';
        rs.success = true;
        rs.data = {
          token,
        };
      }
    } catch (error) {
      const errorInfo = [{ errorCode: "500", errorMessage: "Unknown error" }]
      throw new HttpError({ status: 400, message: "Invalid email or password", errors: errorInfo });
    }

    return rs;
  }
}