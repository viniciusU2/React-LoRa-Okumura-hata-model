import "express-async-errors";
import "express-form-data";
import express, { NextFunction, Request, Response }  from "express";
import { routes } from "./routes";
import mqtt from 'mqtt';
const formData = require('express-form-data');




var cors = require('cors');

// use it before all route definitions kk





const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: '*'})); //dominio da requisição


app.use(routes);



app.get("/", (request,response)=>{
    return response.json({
        message: "Hello world"
    });
});


app.use(
    (err: Error, request: Request, response: Response, next: NextFunction)=>{
    if(err instanceof Error){
        return response.status(400).json({message: err.message});
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});
app.listen(3000, () => console.log("Server is running"));