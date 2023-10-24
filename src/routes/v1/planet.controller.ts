import { plainToClass } from 'class-transformer';
import * as express from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  interfaces,
  next,
  request,
  requestParam,
  response
} from 'inversify-express-utils';
import { PlanetDto } from '../../dtos/planet.dto';
import TYPES from '../../ioc/types';
import { IPlanetService } from '../../services/planetService';

/**
 * @swagger
 * tags:
 *   name: Planet
 *   description: Operaciones relacionadas con los planetas
 */

@controller('/v1/planet')
export class PlanetController implements interfaces.Controller {
  constructor(
    @inject(TYPES.IPlanetService) private planetService: IPlanetService
  ) { }

  /**
   * @swagger
   * /v1/planet:
   *   post:
   *     summary: Crea un nuevo planeta.
   *     tags:
   *       - Planet
   *     responses:
   *       '201':
   *         description: Planeta creado con éxito.
   *       '400':
   *         description: Solicitud incorrecta.
   */
  @httpPost('')
  public async create(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ) {
    const createPlanetRequest = plainToClass(PlanetDto, req.body);
    const Res = await this.planetService.createPlanets(createPlanetRequest);
    res.status(Res.code).json(Res.body);
    nextFunc();
  }

  /**
   * @swagger
   * /v1/planet:
   *   get:
   *     summary: Lista todos los planetas.
   *     tags:
   *       - Planet
   *     responses:
   *       '200':
   *         description: Lista de planetas recuperada con éxito.
   *       '400':
   *         description: Solicitud incorrecta.
   */
  @httpGet('')
  public async list(
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ) {
    const Res = await this.planetService.listAllPlanet();
    res.status(Res.code).json(Res.body);
    nextFunc();
  }

  /**
   * @swagger
   * /v1/planet/{id}:
   *   get:
   *     summary: Obtiene información de un planeta por ID.
   *     tags:
   *       - Planet
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del planeta que se va a recuperar.
   *     responses:
   *       '200':
   *         description: Información del planeta recuperada con éxito.
   *       '404':
   *         description: Planeta no encontrado.
   */
  @httpGet('/:id')
  public async listById(
    @requestParam('id') id: string,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ) {
    const Res = await this.planetService.listAllPlanetById(id);
    res.status(Res.code).json(Res.body);
    nextFunc();
  }

  /**
   * @swagger
   * /v1/planet/{id}:
   *   delete:
   *     summary: Elimina un planeta por ID.
   *     tags:
   *       - Planet
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del planeta que se va a eliminar.
   *     responses:
   *       '204':
   *         description: Planeta eliminado con éxito.
   *       '404':
   *         description: Planeta no encontrado.
   */
  @httpDelete('/:id')
  public async delete(
    @requestParam('id') id: string,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ) {
    const Res = await this.planetService.deleteById(id);
    res.status(Res.code).json(Res.body);
    nextFunc();
  }
}
