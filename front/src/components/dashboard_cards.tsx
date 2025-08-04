import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { SignalStrengthMap } from './SignalStrengthMap';
import { useMemo } from "react";



import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface HataParams {
  frequencyMHz: number;
  baseHeight: number;
  mobileHeight: number;
  distanceKm: number;
}

interface HataResults {
  urban: number;
  urbanLargeCity: number;
  suburban: number;
  rural: number;
}

function correctionFactorUrbanSmall(f: number, hm: number): number {
  return (1.1 * Math.log10(f) - 0.7) * hm - (1.56 * Math.log10(f) - 0.8);
}

function correctionFactorUrbanLarge(hm: number): number {
  return 3.2 * Math.pow(Math.log10(11.75 * hm), 2) - 4.97;
}

function hataUrban(params: HataParams, largeCity: boolean = false): number {
  const { frequencyMHz, baseHeight, mobileHeight, distanceKm } = params;
  const a_hm = largeCity
    ? correctionFactorUrbanLarge(mobileHeight)
    : correctionFactorUrbanSmall(frequencyMHz, mobileHeight);

  return (
    69.55 +
    26.16 * Math.log10(frequencyMHz) -
    13.82 * Math.log10(baseHeight) -
    a_hm +
    (44.9 - 6.55 * Math.log10(baseHeight)) * Math.log10(distanceKm)
  );
}

function hataSuburban(params: HataParams): number {
  const Lu = hataUrban(params);
  return Lu - 2 * Math.pow(Math.log10(params.frequencyMHz / 28), 2) - 5.4;
}

function hataRural(params: HataParams): number {
  const Lu = hataUrban(params);
  return (
    Lu -
    4.78 * Math.pow(Math.log10(params.frequencyMHz), 2) +
    18.33 * Math.log10(params.frequencyMHz) -
    40.94
  );
}

function simulateHata(params: HataParams): HataResults {
  return {
    urban: hataUrban(params, false),
    urbanLargeCity: hataUrban(params, true),
    suburban: hataSuburban(params),
    rural: hataRural(params),
  };
}
type LoraData = {
  data: string;
  rssi: number;
  snr: number;
}

export function DashboardCards() {
  const [results, setResults] = useState<HataResults | null>(null);
  const [loraInfo, setLoraInfo] = useState<LoraData | null>(null);
  const [frequencyMHz, setFrequencyMHz] = useState(900.0);
  const [baseHeight, setBaseHeight] = useState(50.0);
  const [mobileHeight, setMobileHeight] = useState(1.1);
  const [distanceKm, setDistanceKm] = useState(5.0);

;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<LoraData>("http://192.168.0.114:3000/lora/latest");
        setLoraInfo(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do LoRa:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000); // Atualiza a cada 3 segundos

    return () => clearInterval(interval);
  }, []);
  

  const handleSave = (params: HataParams) => {
    const result = simulateHata(params);
    setResults(result);
  };

  const losses = useMemo(() => {
    const values: number[] = [];
    for (let d = 1; d <= 10; d++) {
      const simulated = simulateHata({
        frequencyMHz,
        baseHeight,
        mobileHeight,
        distanceKm: d,
      });
      values.push(simulated.urban); // ou simulated.rural, etc.
    }
    return values;
  }, [frequencyMHz, baseHeight, mobileHeight]);

  return (
   
      
   <div className="flex flex-col gap-8 px-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3 ml-4 mr-4">
        <Card className="aspect-video rounded-xl bg-muted/50" >
          <CardHeader>
            <CardTitle>Okumura-Hata</CardTitle>
          </CardHeader>
          <CardContent>
            {results ? (
              <>
                <p><strong>Urbano (cidade pequena):</strong> {results.urban.toFixed(2)} dB</p>
                <p><strong>Urbano (cidade grande):</strong> {results.urbanLargeCity.toFixed(2)} dB</p>
                <p><strong>Suburbano:</strong> {results.suburban.toFixed(2)} dB</p>
                <p><strong>Rural:</strong> {results.rural.toFixed(2)} dB</p>
              </>
            ) : (
              <p>Os resultados aparecerão aqui após o cálculo.</p>
            )}
            <Dialog>
              <DialogTrigger>
                Configurar Modelo
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>

                  <DialogTitle>Edite parâmetros do modelo</DialogTitle>
                  <DialogDescription>
                    Insira os parâmetros para simular a perda de percurso.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="frequency" className="text-right">Frequência (MHz)</Label>
                    <Input
                      id="frequency"
                      type="number"
                      step="0.1"
                      value={frequencyMHz}
                      onChange={(e) => setFrequencyMHz(Number(e.target.value))}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="baseHeight" className="text-right">Altura da Base (m)</Label>
                    <Input
                      id="baseHeight"
                      type="number"
                      step="0.1"
                      value={baseHeight}
                      onChange={(e) => setBaseHeight(Number(e.target.value))}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="mobileHeight" className="text-right">Altura do Receptor (m)</Label>
                    <Input
                      id="mobileHeight"
                      type="number"
                      step="0.1"variant={"secondary"}
                      value={mobileHeight}
                      onChange={(e) => setMobileHeight(Number(e.target.value))}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="distance" className="text-right">Distância (km)</Label>
                    <Input
                      id="distance"
                      type="number"
                      step="0.1"
                      value={distanceKm}
                      onChange={(e) => setDistanceKm(Number(e.target.value))}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave({ frequencyMHz, baseHeight, mobileHeight, distanceKm })} >
                  Salvar e Calcular
                </Button>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card className="aspect-video rounded-xl bg-muted/50" >
          <CardHeader>
            <CardTitle>Dados do Sinal</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>RSSI:</strong> {loraInfo ? `${loraInfo.rssi} dBm` : "Aguardando..."}</p>
            <p><strong>SNR:</strong> {loraInfo ? `${loraInfo.snr} dBm` : "Aguardando..."}</p>
          </CardContent>
        </Card>

        <Card className="aspect-video rounded-xl bg-muted/50" >
          <CardHeader>
            <CardTitle>Último Dado</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Data: 2025-05-05</p>
            <p>Valor: {loraInfo ? `${loraInfo.data} V` : "Aguardando..."}</p>
          </CardContent>
        </Card>

      </div>

        <div className="w-full h-[600px] rounded-xl overflow-hidden border border-muted">
    <SignalStrengthMap losses={losses}/>
  </div>

        </div>
      
 
  );
}
