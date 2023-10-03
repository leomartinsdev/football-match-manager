import MatchModel from '../models/MatchModel';
import { NewEntity } from '../Interfaces/index';
import { IMatch } from '../Interfaces/Matches/IMatch';
import { IMatchModel } from '../Interfaces/Matches/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async createMatch(data: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const checkTeam1 = await this.matchModel.findById(data.homeTeamId);
    const checkTeam2 = await this.matchModel.findById(data.awayTeamId);

    if (checkTeam1 === null || checkTeam2 === null) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchModel.create(data);
    return { status: 'CREATED', data: newMatch };
  }

  public async getAllMatches(inProgress?: boolean): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async finishMatch(id: number) {
    const matchFound = await this.matchModel.findById(id);
    if (!matchFound) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };

    await this.matchModel.update(id, { inProgress: false });
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const matchFound = await this.matchModel.findById(id);
    if (!matchFound) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };

    await this.matchModel.update(id, { homeTeamGoals, awayTeamGoals });
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
