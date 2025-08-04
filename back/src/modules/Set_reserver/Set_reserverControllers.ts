import { SetReserverUseCase} from "./Set_reserverUseCases";
import { Request, Response } from "express";

/*Essa função tem o papel de receber as informações vindas do front end*/



export class SetReserverController{
    async handle(request: Request, response:Response){
        var {city,reg,lat,lng} = request.body;
        console.log(request.body)
        const setReserverUseCase = new SetReserverUseCase();
        lat = parseFloat(lat);
        lng = parseFloat(lng);
        
        const result = await setReserverUseCase.execute({city,reg,lat,lng});
        return response.json(result);
    }
}