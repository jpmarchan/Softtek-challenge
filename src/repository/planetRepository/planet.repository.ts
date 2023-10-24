import { provide } from 'inversify-binding-decorators';
import { IPlanetRepository } from '.';
import TYPES from '../../ioc/types';
import { PlanetDto } from '../../dtos/planet.dto';
import { PlanetModel } from '../../models/Planet';
import { hashMD5 } from '../../helpers/helpers';

@provide(TYPES.IPlanetRepository)
export class PlanetRepository implements IPlanetRepository {
  constructor() { }

  public async createPlanets(createPlanet: PlanetDto): Promise<any> {
    const date = new Date().getTime() / 1000;
    const id = hashMD5(`${createPlanet.name}${date}`);
    createPlanet.id = id;
    return await PlanetModel.create(createPlanet);
  }

  public async listAllPlanets(): Promise<any> {
    return await PlanetModel.scan().all().exec();
  }

  public async listAllPlanetById(id: string): Promise<any> {
    return await PlanetModel.scan("id").eq(id).exec();
  }

  public async deletePlanetById(id: string): Promise<any> {
    return await PlanetModel.delete(id);
  }

}


