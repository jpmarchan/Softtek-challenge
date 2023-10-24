import { PlanetDto } from "../../dtos/planet.dto";

export interface IPlanetService {
    createPlanets(createPlanetDto: PlanetDto): Promise<any>;
    listAllPlanet(): Promise<any>;
    listAllPlanetById(id: string): Promise<any>;
    deleteById(id: string): Promise<any>;
}
