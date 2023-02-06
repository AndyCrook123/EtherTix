require('dotenv').config();
import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan"
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import {categoriesRouter} from './routes/categories-routes';
import { connectCategoriesDatabase } from "./database/categories-db";

connectCategoriesDatabase();

const app: any = express();

app.use(express.json() as any);

if(process.env.NODE_ENV === 'production') {
    app.use(mongoSanitize())
}

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev') as any)
}    

app.use(cors({
    origin: "*",
    methods: ["POST", "PUT", "GET"]
}) as any)

app.get('/', (request: any, response: any, next) => {
   return response.status(200).json({success: true, message: "Categories Root Route"}) 
})

app.use('/api/v1/categories', categoriesRouter);

export {app}