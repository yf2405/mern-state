import express  from "express";
import userRouter from "./user.routes.js"

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/user', userRouter);

}

export default routerApi;
