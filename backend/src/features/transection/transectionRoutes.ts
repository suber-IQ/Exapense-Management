import express, { Router } from 'express';
import { TransectionController } from './transectionController';

class TransectionRoutes{
    private router: Router;
    private transectionController = new TransectionController();

    constructor(){
        this.router = express.Router();
    }

    public routes(): Router{
        this.router.post('/add/transection',this.transectionController.addTransection);
        this.router.post('/get/transection',this.transectionController.getAllTransection);
        this.router.put('/edit/transection',this.transectionController.editTransection);
        this.router.delete('/delete/transection/:id',this.transectionController.deleteTransection);
        return this.router;
    }
}

export const transectionRoutes: TransectionRoutes = new TransectionRoutes();