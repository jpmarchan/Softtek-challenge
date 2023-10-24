import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IPeopleService } from '.';
import TYPES from '../../ioc/types';
import { IHttpRepository } from '~/repository/httpRepository';
import PeopleReturnEs from '~/dtos/PeopleReturnEs.dto';
import PeopleResultsEs from '~/dtos/PeopleResultsEs.dto';

@provide(TYPES.IPeopleService)
export class PeopleService implements IPeopleService {
  constructor(
    @inject(TYPES.IHttpRepository) private httpRepository: IHttpRepository
  ) { }

  public async listPeopleFromSwapi(index: string): Promise<any> {
    const result = await this.httpRepository.listPeopleFromSwapi(index);
    const dataPeople = this.BuildPeopleFromSwapiEs(result.data)
    return {
      code: 200,
      body: {
        people: dataPeople
      }
    }; 
  }

  public BuildPeopleFromSwapiEs(data: any): PeopleReturnEs{
    let arrayEs: any = [];
    let resultEs: PeopleReturnEs = {  //declaramos variable "resultEs" modelo PeopleReturnEs 
      count: data.count,
      next: data.next,
      results: arrayEs,
    }
    if (data.results != undefined && data.results?.length > 0) { //validamos los posibles respuestas sin datos
      for (const item of data.results) {// seteo valores del modelo en ingles al del español
        let dataPeopleEs: PeopleResultsEs = { // respuesta con los parametros en español modelo "PeopleResultsEs" 
          nombre: item.name,
          altura: item.height,
          masa: item.mass,
          color_cabello: item.hair_color,
          color_piel: item.skin_color,
          color_ojos: item.eye_color,
          anio_nacimiento: item.birth_year,
          genero: item.gender,
          mundo_natal: item.homeworld,
          peliculas: item.films,
          especies: item.species,
          vehiculos: item.vehicles,
          naves_estelares: item.starships,
          url: item.url,
          creado: item.created,
          editado: item.edited,
        }
        resultEs.results?.push(dataPeopleEs)
      }
    }
    return resultEs; 
  }
}