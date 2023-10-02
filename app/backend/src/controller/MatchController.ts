import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    let serviceResponse;
    if (inProgress) {
      const isProgressTrue = inProgress === 'true'; // Retorna true se inProgress for True, e false se for False
      serviceResponse = await this.matchService.getAllMatches(isProgressTrue);
    } else {
      serviceResponse = await this.matchService.getAllMatches(); // Se inProgress não for passado, retorna todos os jogos (ele passa undefined pra função)
    }

    res.status(200).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchService.finishMatch(Number(id));

    return res.status(200).json(serviceResponse.data);
  }
}
