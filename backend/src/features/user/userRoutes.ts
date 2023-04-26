import express, { Router } from 'express';
import { UserController } from './userController';

class UserRoutes {
  private router: Router;
  private userController = new UserController();

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
     this.router.post('/login',this.userController.login);    
     this.router.post('/register',this.userController.register);    
    return this.router;
  }
}

export const userRoutes: UserRoutes = new UserRoutes();