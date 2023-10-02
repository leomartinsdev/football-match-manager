import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/Matches/IMatch';
import { IMatchModel } from '../Interfaces/Matches/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async getAllMatches(inProgress?: boolean): Promise<ServiceResponse<IMatch[]>> {
    console.log('--- LOG2: ', inProgress);
    const allMatches = await this.matchModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }
}
