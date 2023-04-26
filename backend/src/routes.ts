import { Application, Request, Response } from "express";
import { userRoutes } from "./features/user/userRoutes";
import { transectionRoutes } from "./features/transection/transectionRoutes";

const BASE_PATH = '/api/v1';

export default (app: Application) => {
    const routes = () => {
       app.use(BASE_PATH,userRoutes.routes());
       app.use(BASE_PATH,transectionRoutes.routes());
    };
    routes();
}