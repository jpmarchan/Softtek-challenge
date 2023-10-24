import dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
require('dotenv').config();

export class Planet extends Document {
  id!: string;
  climate: string;
  diameter: string;
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string;
  films: string;
  url: string;
  create_date: Date;
  update_date: Date;
}

export const PlanetModel = dynamoose.model<Planet>(
  process.env.PLANET_TABLE as string,
  new dynamoose.Schema(
    {
      id: { "type": String, "hashKey": true },
      climate: String,
      diameter: String,
      gravity: String,
      name: String,
      orbital_period: String,
      population: String,
      residents: String,
      films: String,
      url: String,
      create_date: Date,
      update_date: Date,
    },
    {
      saveUnknown: true,
      timestamps: true,
    },
  ),
  {
    create: false,
    waitForActive: { enabled: false },
  },
);
