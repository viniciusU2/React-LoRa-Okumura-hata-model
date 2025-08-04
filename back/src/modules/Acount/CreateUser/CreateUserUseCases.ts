import {prisma} from "../../../database/prismaClient"
import {hash} from "bcrypt"

interface ICreateUser {
    name: string;
    password: string;
    email: string;
    institution:string;
}

export class CreateUserUseCase{
    async execute({password, name, email,institution } : ICreateUser){
        // validar se o usuário existe
        const userExist = await prisma.user.findFirst({
            where:{
                email:{
                    equals: email
                
                },
            },
        });

        const existingConvidado = await prisma.permission.findUnique({
            where: {
              name: 'convidado',
            },
          });
        
          // Criar a permissão "admin" se ainda não existir
          let convidadoPermission;
          if (!existingConvidado) {
            convidadoPermission = await prisma.permission.create({
              data: {
                name: 'admin',
              },
            });
          }

        
        if(userExist){
            throw new Error("Classifier man already exists")
        }

        //Criptografar a senha

        const hashPassword = await hash(password,10);


        //Salvar o client
       const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                institution,
                permissions: {
                    connect: { id: existingConvidado?.id || convidadoPermission?.id },
                  },
            },
        })

        return user;
    }
}