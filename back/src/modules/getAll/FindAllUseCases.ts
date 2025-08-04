import { prisma} from "../../database/prismaClient"




export class FindAllPostsUseCase {
    async execute (){
        const Posts = await prisma.reserver.findMany();

        return(Posts);
    }
}