
import { results as csvResult,csvToJson } from './ser'; // Importe a constante result do arquivo CSV

export class FindAllPostsUseCase {
    async execute (){
        // Aguarde a conclusão da leitura do CSV e use os dados convertidos
        await csvToJson('C:/Users/vinig/OneDrive/Área de Trabalho/relatorio/morro_do_chapeu_sim.csv'); // Certifique-se de ajustar o caminho do arquivo conforme necessário
        const posts = csvResult;

        return posts;
    }
}