import SequelizeUser from '../database/models/SequelizeUser';
import { IUser } from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  // async findAll(): Promise<IUser[]> {
  //   const dbData = await this.model.findAll();
  //   return dbData.map(({ id, username, role, email, password }) => (
  //     { id, username, role, email, password }
  //   ));
  // }

  async findOne(email: IUser['email']): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });
    if (dbData == null) return null;

    const { id, username, role, password }: IUser = dbData;
    return { id, username, role, email, password };
  }
}
