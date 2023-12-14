import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routerApi from "./routes/index.js" 
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO)
.then(() =>{
    console.log('Connect to MongoDB!');
}) 
.catch((err)=>{
    console.log('Error connecting' + err);
});

const __dirname = path.resolve();

const app = express()
app.use(express.json());
 
app.use(cookieParser());
routerApi(app);

app.listen(3000, () =>{
    console.log('listening on port 3000')
}
);

app.use(express.static(path.join(__dirname,  '/client/dist',)));

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, '/client', 'dist', 'index.html'));
})
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