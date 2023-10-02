import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatch } from '../Interfaces/Matches/IMatch';
import { IMatchModel } from '../Interfaces/Matches/IMatchModel';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(inProgress?: boolean): Promise<IMatch[]> {
    console.log('--- LOG: ', inProgress);
    const dbData = await this.model.findAll({
      where: inProgress !== undefined ? { inProgress } : {},
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }
}
