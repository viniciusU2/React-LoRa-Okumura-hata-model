import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCases";


export class AuthenticateClientController {
    async handle(request:Request,response:Response){

        const {email, password} = request.body;

        const authenticateUserUseCase = new AuthenticateUserUseCase ();

        const result = await authenticateUserUseCase.execute({
            email,
            password
        })

        console.log("user athenticate")
        
        return response.json(result);
    }
}