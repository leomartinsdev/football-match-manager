import { ILeadeboard } from './ILeaderboard';

export interface ILeaderboardModel {
  findAll(): Promise<ILeadeboard[][]>,
}
