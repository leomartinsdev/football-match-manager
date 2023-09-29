// import { NewEntity } from '../Interfaces/index';
import * as bcrypt from 'bcryptjs';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { Token } from '../Interfaces/Token';
import { Login } from '../Interfaces/Login';
import UserModel from '../models/UserModel';
import jwt from '../utils/jwt.util';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async verifyLogin(login: Login): Promise<ServiceResponse<Token>> {
    const foundUser = await this.userModel.findOne(login.email);

    if (!foundUser || !bcrypt.compareSync(login.password, foundUser.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const { id, role } = foundUser;
    const token = jwt.sign({ id, role });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
