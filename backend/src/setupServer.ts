import express, { Application, Request, Response} from 'express';
import http from 'http'
import path from 'path'
// import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan';
// import 'express-async-errors'
import { config } from './config';

import applicationRoutes from './routes';


const SERVER_PORT = config.PORT;

export class ManagementServer{
   private app: Application;

   constructor(app: Application){
    this.app = app;
   }

   public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routeMiddleware(this.app);
   //  this.globalErrorMiddleware(this.app);
    this.startServer(this.app);
   }

   private securityMiddleware(app: Application): void {
      // app.use(cors({
      //    origin: config.CLIENT_URL,
      //    credentials: true,
      //    optionsSuccessStatus: 200,
      //    methods: ['GET','POST','PUT','DELETE','OPTIONS']
      // }));
      app.use(cors());
      app.use(express.static(path.join(__dirname,'./client/dist')))
   }
   private standardMiddleware(app: Application): void {
      app.use(morgan('dev'));
      app.use(express.json());
   }
   private routeMiddleware(app: Application): void {
      app.get('*',(req: Request,res: Response) => {
         res.sendFile(path.join(__dirname,'./client/dist/index.html'))
      })
      applicationRoutes(app);
   }

   // private globalErrorMiddleware(app: Application): void {
    
   // }

   private async startServer(app: Application): Promise<void> {
       try {
         const httpServer: http.Server = new http.Server(app);
         this.startHttpServer(httpServer);
       } catch (error) {
         console.log(error);
       }
   }

   private startHttpServer(httpServer: http.Server): void {
      console.log(`Server had Started with process ${process.pid} `);
       httpServer.listen(SERVER_PORT,() => {
         console.log(`Server running on port ${SERVER_PORT}`);

       })
   }
}
