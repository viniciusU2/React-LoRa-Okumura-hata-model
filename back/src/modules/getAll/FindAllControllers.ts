import { Response, Request} from "express";
import {FindAllPostsUseCase } from "./FindAllUseCases";





export class FindAllPostsController{

    async handle(request:Request, response: Response){

        const findAllPostsUseCase  = new FindAllPostsUseCase ();
        const posts = await findAllPostsUseCase.execute()


      

        return response.json(posts)
    }
} 