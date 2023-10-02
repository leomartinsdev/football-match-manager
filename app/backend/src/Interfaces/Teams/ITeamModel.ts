import { ITeam } from './ITeam';

export interface ITeamModel {
  // create(data: Partial<ITeam>): Promise<ITeam>,
  findAll(): Promise<ITeam[]>,
  findById(id: ITeam['id']): Promise<ITeam | null>
  // update(id: ITeam['id'], data: Partial<NewEntity<ITeam>>): Promise<ITeam | null>,
  // delete(id: ITeam['id']): Promise<number>,
}
