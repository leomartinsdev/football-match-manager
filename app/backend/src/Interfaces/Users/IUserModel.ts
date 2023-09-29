import { IUser } from './IUser';
// import { NewEntity } from '../index';

export interface IUserModel {
  // create(data: Partial<ITeam>): Promise<ITeam>,
  // findAll(): Promise<IUser[]>,
  findOne(email: IUser['email']): Promise<IUser | null>
  // update(id: ITeam['id'], data: Partial<NewEntity<ITeam>>): Promise<ITeam | null>,
  // delete(id: ITeam['id']): Promise<number>,
}
