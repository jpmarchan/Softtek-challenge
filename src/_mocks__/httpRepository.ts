import { IHttpRepository } from "../repository/httpRepository"; 
import 'reflect-metadata'; 

export class MockHttpRepository implements IHttpRepository {
  public async listPeopleFromSwapi(index: string): Promise<any> {
    return Promise.resolve({
      data: {
        name: 'Luke Skywalker',
        height: '172',
      },
      status: 200,
    });
  }
}