import LeaderboardModel from '../models/LeaderboardModel';
import { ILeadeboard } from '../Interfaces/Leaderboard/ILeaderboard';
import { ILeaderboardModel } from '../Interfaces/Leaderboard/ILeaderboardModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: ILeaderboardModel = new LeaderboardModel(),
  ) {}

  public async getLeaderboard(): Promise<ServiceResponse<ILeadeboard[]>> {
    const [leaderboard] = await this.leaderboardModel.findAll();
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
