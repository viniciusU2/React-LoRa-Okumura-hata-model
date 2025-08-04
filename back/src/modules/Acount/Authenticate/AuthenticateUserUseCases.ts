import {prisma} from "../../../database/prismaClient"
import {compare} from "bcrypt"
import {sign} from "jsonwebtoken"
import { JsonWebTokenError } from "jsonwebtoken";


interface IAuthenticateUser {
    email:string;
    password:string;
}

export class AuthenticateUserUseCase{
    async execute({email, password}: IAuthenticateUser){
        //Receber o username, password


        //Verificar se username cadastrado
        const user = await prisma.user.findFirst({
            where:{
                email
            },
            include: {
                permissions: true, // Inclui as permissões associadas ao usuário
              },
        })

        if(!user){
            throw new Error("Username or password invalid")
        }

        // verificar se a senha corresponde ao username
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Username or password invalid")
        }

        //gerar o token
        const token = sign({email}, "92424f46496f426dfsdf8752e76fabf28",{
            subject:String(user.id),
            expiresIn: "1d",
        })
        console.log( user.permissions);

        return {
            token,
            permissions: user.permissions, // Retorna as permissões associadas ao usuário
          };

    }


}