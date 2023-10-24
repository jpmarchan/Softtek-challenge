import { PlanetDto } from "~/dtos/planet.dto";

export interface IPlanetRepository {
    createPlanets(createPlanetDto: PlanetDto): Promise<any>;
    listAllPlanets(): Promise<any>;
    listAllPlanetById(id: string): Promise<any>;
    deletePlanetById(id: string): Promise<any>;
}
