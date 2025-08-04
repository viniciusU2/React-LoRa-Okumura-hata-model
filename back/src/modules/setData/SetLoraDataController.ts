// src/useCases/SetLoraData/SetLoraDataController.ts
import { Request, Response } from "express";
import { SetLoraDataUseCase } from "./SetLoraDataUseCase";

export class SetLoraDataController {
  async handle(request: Request, response: Response) {
    const { data, rssi, snr } = request.body;

    if (!data || rssi === undefined || snr === undefined) {
      return response.status(400).json({ error: "Dados incompletos" });
    }

    try {
      const setLoraDataUseCase = new SetLoraDataUseCase();
      const result = await setLoraDataUseCase.execute({ data, rssi, snr });
      return response.status(201).json(result);
    } catch (error) {
      console.error("Erro ao salvar dados LoRa:", error);
      return response.status(500).json({ error: "Erro ao salvar dados" });
    }
  }
}
