import { IMatch } from './IMatch';
import { NewEntity } from '../index';

export interface IMatchModel {
  findAll(inProgress: boolean | undefined): Promise<IMatch[]>,
  findById(id: IMatch['id']): Promise<IMatch | null>,
  update(id: IMatch['id'], data: Partial<NewEntity<IMatch>>): Promise<IMatch | null>,
}
