import {prisma} from "../../database/prismaClient"
import {hash} from "bcrypt"

interface ISetReserver {
    city: string;
    reg: string;
    lat: number;
    lng:number;
}

export class SetReserverUseCase{
    async execute({city,reg,lat,lng} : ISetReserver){
        // validar se o usuário existe
      
        //Salvar o client
       const reserver = await prisma.reserver.create({
            data: {
                city,
                reg,
                lat,
                lng
            
            },
        })

        return reserver;
    }
}