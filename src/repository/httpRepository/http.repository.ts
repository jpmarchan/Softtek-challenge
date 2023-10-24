import { provide } from 'inversify-binding-decorators';
import { IHttpRepository } from '.';
import TYPES from '../../ioc/types';
import axios from 'axios';
require('dotenv').config();

@provide(TYPES.IHttpRepository)
export class HttpRepository implements IHttpRepository {
  constructor() { }

  public async listPeopleFromSwapi(index: string): Promise<any> {
    try {
      const endpointSwapi = process.env.ENDPOINT_GET_PEOPLE_SWAPI as string
      return await axios.get(`${endpointSwapi}=${index}`)
    } catch (error) {
      return error
    }
  }

}


