
import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import '../routes/v1/planet.controller';
import '../services/planetService/planet.service';
import '../repository/planetRepository/planet.repository';

import '../routes/v1/people.controller';
import '../services/peopleService/people.service';
import '../repository/httpRepository/http.repository';

const container = new Container();

// Registra el módulo de proveedores
container.load(buildProviderModule());

// Opcionalmente, registra otras dependencias en el contenedor
// container.bind(ClaseDeDependencia).toSelf();
export { container };
