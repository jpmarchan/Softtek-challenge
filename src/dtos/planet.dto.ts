import { IsString, IsNotEmpty} from 'class-validator';

export class PlanetDto {
  @IsString()
  public id: string;
  @IsString()
  @IsNotEmpty()
  public climate: string;
  @IsString()
  @IsNotEmpty()
  public diameter: string;
  @IsString()
  @IsNotEmpty()
  public gravity: string;
  @IsString()
  @IsNotEmpty()
  public name: string;
  @IsString()
  @IsNotEmpty()
  public orbital_period: string;
  @IsString()
  @IsNotEmpty()
  public population: string;
  @IsString()
  @IsNotEmpty()
  public residents: string;
  @IsString()
  @IsNotEmpty()
  public films: string;
  @IsString()
  @IsNotEmpty()
  public url: string;
  @IsString()
  @IsNotEmpty()
  public edited: string;
}
