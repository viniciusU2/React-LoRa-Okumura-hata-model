import * as fs from 'fs';

interface Data {
    latitude: number;
    longitude: number;
    municipio: string;
}

export const results: Data[] = [];

export function csvToJson(filePath: string, separator: string = ';'): Promise<Data[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo CSV:', err);
                reject(err);
                return;
            }
            
            const rows = data.split('\n'); // Dividir cada linha do arquivo
            const headers = rows[0].split(separator); // Separar cabeçalhos de coluna
            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split(separator); // Separar valores
                const formattedData: Data = {
                    latitude: parseFloat(values[0]), // Assumindo que a latitude está na primeira coluna
                    longitude: parseFloat(values[1]), // Assumindo que a longitude está na segunda coluna
                    municipio: values[2] // Assumindo que o município está na terceira coluna
                };
                results.push(formattedData);
            }

       
            resolve(results);
        });
    });
}
