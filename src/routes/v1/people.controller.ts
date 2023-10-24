import * as express from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  interfaces,
  next,
  requestParam,
  response
} from 'inversify-express-utils';
import { IPeopleService } from '~/services/peopleService';
import TYPES from '../../ioc/types';

/**
 * @swagger
 * tags:
 *   name: People
 *   description: Operaciones relacionadas con las personas
 */

@controller('/v1/people')
export class PeopleController implements interfaces.Controller {
  constructor(
    @inject(TYPES.IPeopleService) private peopleService: IPeopleService
  ) { }

  /**
   * @swagger
   * /v1/people/{index}:
   *   get:
   *     summary: Obtiene información de una persona de Swapi por índice.
   *     tags:
   *       - People
   *     parameters:
   *       - in: path
   *         name: index
   *         required: true
   *         schema:
   *           type: string
   *         description: Índice de la de la pagina en Swapi que se va a recuperar.
   *     responses:
   *       '200':
   *         description: Información de la persona recuperada con éxito.
   *       '404':
   *         description: Persona no encontrada.
   */
  @httpGet('/:index')
  public async listPeopleFromSwapi(
    @requestParam('index') index: string,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ) {
    const Res = await this.peopleService.listPeopleFromSwapi(index);
    res.status(Res.code).json(Res.body);
    nextFunc();
  }
}
