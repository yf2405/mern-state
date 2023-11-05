import express  from "express";
import userRouter from "./user.routes.js"
import authRouter from "./auth.routes.js"
function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/user', userRouter);
    router.use('/auth', authRouter);

}

export default routerApi;
