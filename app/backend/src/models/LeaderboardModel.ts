import SequelizeLeaderboard from '../database/models/SequelizeLeaderboard';
import { ILeadeboard } from '../Interfaces/Leaderboard/ILeaderboard';
import { ILeaderboardModel } from '../Interfaces/Leaderboard/ILeaderboardModel';

export default class LeaderboardModel implements ILeaderboardModel {
  private model = SequelizeLeaderboard;
  private query = `SELECT
  teams.team_name AS name,
  SUM(CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 3 ELSE CASE 
    WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END END) AS totalPoints,
  COUNT(*) AS totalGames,
  SUM(CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 1 ELSE 0 END) 
  AS totalVictories,
  SUM(CASE WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
  SUM(CASE WHEN matches.home_team_goals < matches.away_team_goals THEN 1 ELSE 0 END) AS totalLosses,
  SUM(matches.home_team_goals) AS goalsFavor,
  SUM(matches.away_team_goals) AS goalsOwn,
  SUM(matches.home_team_goals) - SUM(matches.away_team_goals) AS goalsBalance,
  ROUND(SUM(CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 3 
    ELSE CASE WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END END) 
    / (COUNT(*) * 3) * 100, 2) AS efficiency
  FROM matches
  INNER JOIN teams ON matches.home_team_id = teams.id
  WHERE matches.in_progress = false
  GROUP BY teams.team_name
  ORDER BY totalPoints DESC, totalVictories DESC,goalsBalance DESC, goalsFavor DESC;`;

  async findAll(): Promise<ILeadeboard[][]> {
    const dbData = await this.model.sequelize?.query(this.query);

    return dbData as unknown as ILeadeboard[][];
  }
}
