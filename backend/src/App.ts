import 'reflect-metadata';
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import errorHandle from './utils/errorHandle';
import { logRequest } from './utils/logger';
import session from 'express-session'
import passportConfig from './utils/passportConfig';
import convictConfig from './utils/convictConfig';

class App {
    private app: express.Application;
    private port: number;
    private host: string
    private secretKey = convictConfig.get('SECRET_KEY')
    private corsOptions = {
      origin: 'http://localhost:3000', 
      credentials: true, 
    };
    constructor(controllers: any[], port: number, host:string) {
      this.app = express();
      this.port = port;
      this.host = host;
      this.initializeMiddlewares();
      this.initializePassport()
      this.initializeControllers(controllers);
      this.initializeErrorHandle()
    }
  
    private initializeMiddlewares() {
      this.app.use(cors(this.corsOptions));
      this.app.use(bodyParser.json());
      this.app.use(express.static('public'));
      this.app.use(
        session({
          secret: this.secretKey,
          cookie: { maxAge: 60000 },
          resave: false,
          saveUninitialized: false,
        })
      );
      this.app.use(logRequest);
    }
  
    private initializePassport() {
      passportConfig(); 
    }

    private initializeControllers(controllers: any[]) {
      controllers.forEach((controller) => {
        this.app.use('/', controller.router);
      });
    }

    private initializeErrorHandle() {
      this.app.use(errorHandle)
    }
  
    public listen() {
      this.app.listen(this.port, this.host, () => {
        console.log(`App listening on http://${this.host}:${this.port}`);
      });
    }
}

export default App;