import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routerApi from "./routes/index.js" 

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() =>{
    console.log('Connect to MongoDB!');
}) 
.catch((err)=>{
    console.log('Error connecting' + err);
})
const app = express()
app.use(express.json());
routerApi(app);

app.listen(3000, () =>{
    console.log('listening on port 3000')
}
);


app.get('/', (req, res) =>{
    res.send('Welcome');
})


app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Intenl Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})