import express  from "express";
import userRouter from "./user.routes.js"
import authRouter from "./auth.routes.js"
import listingRouter from "./listing.routes.js"
function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/user', userRouter);
    router.use('/auth', authRouter);
    router.use('/listing', listingRouter);
    
}

export default routerApi;
