import { request, response, Router } from "express";
import {  Request, Response } from "express";


import {SetReserverController} from "./modules/Set_reserver/Set_reserverControllers"
import {FindAllPostsController} from "./modules/getAll/FindAllControllers"
import {FindAllCPRMController} from "./modules/getAllCPRM/FindAllControllers"
import { MqttController } from "./modules/MQTT/mqttControllers"
import { SetLoraDataController } from "./modules/setData/SetLoraDataController";

const routes = Router();
const setReserverController = new SetReserverController();
const findAllPostsController = new FindAllPostsController();
const findAllCPRMController = new FindAllCPRMController();
const mqttController = new MqttController(); // Instanciando o MqttController
const setLoraDataController = new SetLoraDataController();

routes.post("/set",(request, response)=>  setReserverController.handle(request, response) )
routes.get("/find",(request, response)=>  findAllPostsController.handle(request, response) )
routes.get("/cprm",(request, response)=>  findAllCPRMController.handle(request, response) )

interface LoraPayload {
    data: string;
    rssi: number;
    snr: number;
  }
let lastLoraData: LoraPayload | null = null;
  
routes.post('/lora', (req: Request<{}, {}, LoraPayload>, res: Response) => {
    const { data, rssi, snr } = req.body;

    lastLoraData = { data, rssi, snr }; // Atualiza o último dado
    console.log("Novo dado LoRa recebido:", lastLoraData);
  
    return setLoraDataController.handle(req, res);
  });
  

routes.get("/lora/latest", (req: Request, res: Response) => {
    if (!lastLoraData) {
      return res.status(404).json({ message: "Nenhum dado recebido ainda" });
    }
  
    return res.status(200).json(lastLoraData);
  })

// Rotas MQTT
routes.post("/mqtt/publish", (request, response) => mqttController.publish(request, response));
routes.post("/mqtt/subscribe", (request, response) => mqttController.subscribe(request, response));





export {routes};