import { CreateUserUseCase} from "./CreateUserUseCases";
import { Request, Response } from "express";

/*Essa função tem o papel de receber as informações vindas do front end*/



export class CreateUserController{
    async handle(request: Request, response:Response){
        const {name, password,email, institution} = request.body;
        console.log(request.body)
        const createUserUseCase = new  CreateUserUseCase();
        const result = await createUserUseCase.execute({name,password, email,institution});
        return response.json(result);
    }
}