import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(inProgress: boolean | undefined): Promise<IMatch[]>,
}
