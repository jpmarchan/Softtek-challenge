import { PeopleService } from '../services/peopleService/people.service';
import { MockHttpRepository } from '../_mocks__/httpRepository';
import 'reflect-metadata'; 
describe('PeopleService', () => {
  const service = new PeopleService(new MockHttpRepository());

  it('debería retornar la respuesta esperada al listar personas de Swapi', async () => {
    const response = await service.listPeopleFromSwapi('1');    
    expect(response.code).toBe(200);
    expect(response.body.people.results[0].nombre).toBe('Luke Skywalker');
  });
});

