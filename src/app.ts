import express, {Application} from 'express';
import 'reflect-metadata';
import morgan from 'morgan';
import cors from 'cors';
import * as dynamoose from 'dynamoose';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './ioc/inversify.config';
require('dotenv').config();
import { ddb_config } from '../src/connection/DynamoDBClient';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig'; // Importa el archivo de configuración de Swagger

export class App {
    public app: Application

    //initialize all instances in respective order
    constructor(private port?: number | string) {
        this.app = express()
        this.cors()
        this.setings()
        this.middlewares()
        this.routes()
        this.dynamose()
        this.swagger()
        this.body()
    }
    // identify port by local or environment variable
    setings(){ 
        console.log('port', process.env.PORT)
        this.app.set('port', process.env.PORT )
    }
    // middleware configuration
    middlewares(){ 
        this.app.use(morgan('dev'))
    }
    // route configuration
    routes() {
        const server = new InversifyExpressServer(container);
      
        server.setConfig((app) => {
          app.use(cors());
          app.use(express.json());
          app.use(express.urlencoded({ extended: false }));
        });
    
        // Agrega el enrutador de los controladores a la aplicación Express
        this.app.use(server.build());
      }
    // configure cors
    cors(){
         const corsOptions = {
            origin: "*",
            credentials: false,
            methods: ["GET", "PUT", "POST", "DELETE", "ANY"],
            allowedHeaders: ['Content-Type', 'client-id', 'client-hash', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Origin','Auth'],
        }
        this.app.use(cors(corsOptions));
    }
    swagger(){ 
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
    body(){ 
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
    }
    // use dynamose configuration
    dynamose(){
        this.dynamo();
    }
    // listen on the port configured in the .env
    async listent() {
        this.app.listen(this.app.get('port'))
        console.log('Server on port', this.app.get('port'))
    }
    // the connection is created with the dynamoose library by setting the credentials configured in the /src/connection/DynamoDBClient file
    private dynamo() { 
        const conn = new dynamoose.aws.sdk.DynamoDB(ddb_config);
        dynamoose.aws.ddb.set(conn);

      }

} 
