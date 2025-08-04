// src/useCases/SetLoraData/SetLoraDataUseCase.ts
import { prisma } from "../../database/prismaClient";

interface ILoraPayload {
  data: string;
  rssi: number;
  snr: number;
}

export class SetLoraDataUseCase {
  async execute({ data, rssi, snr }: ILoraPayload) {
    
    const loraData = await prisma.loraData.create({
      data: {
        data,
        rssi,
        snr,
      },
    });

    return loraData;
  }
}
