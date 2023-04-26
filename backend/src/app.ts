import express, { Express } from 'express';
import { ManagementServer } from './setupServer';
import databaseConnection from './setupDatabase';
import { config } from './config';
console.log(databaseConnection);

class Application{
    public initialize(): void {
        this.loadConfig();
        databaseConnection();
        const app: Express = express();
        const server: ManagementServer= new ManagementServer(app);
        server.start();
    }
    private loadConfig(): void {
       config.validateConfig();
    }
}

const application: Application = new Application();
application.initialize();
