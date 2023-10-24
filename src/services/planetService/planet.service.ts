import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IPlanetService } from '.';
import { PlanetDto } from '../../dtos/planet.dto';
import { IPlanetRepository } from '@repository/planetRepository';
import TYPES from '../../ioc/types';

@provide(TYPES.IPlanetService)
export class PlanetService implements IPlanetService {
  constructor(
    @inject(TYPES.IPlanetRepository) private planetRepository: IPlanetRepository
  ) { }

  public async createPlanets(createPlanet: PlanetDto): Promise<any> {
    const result = await this.planetRepository.createPlanets(createPlanet);
    return {
      code: 200,
      body: {
        id: result.id,
        message: "Planet created sucessfull"
      }
    };
  }

  public async listAllPlanet(): Promise<any> {
    const result = await this.planetRepository.listAllPlanets();
    return {
      code: 200,
      body: {
        message: "List Planet sucessfull",
        planets: result
      }
    };
  }

  public async listAllPlanetById(id: string): Promise<any> {
    const result = await this.planetRepository.listAllPlanetById(id);
    return {
      code: 200,
      body: {
        message: "List Planet sucessfull",
        planets: result
      }
    };
  }

  public async deleteById(id: string): Promise<any> {
    const result = await this.planetRepository.deletePlanetById(id);
    return {
      code: 200,
      body: {
        message: "Delete Planet sucessfull",
        planets: result
      }
    };
  }
}