import { Router } from 'express';
import { Routes } from '../common/routes.interface';
import UserController from './user.controller';

class UserRoute implements Routes {
    public path = '/user';
    public router = Router();
    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/info`, this.userController.getUserInfo);
    }
}

export default UserRoute;
