// MqttController.ts
import { Request, Response } from "express";
import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://test.mosquitto.org:'); // Substitua pela URL do seu broker

export class MqttController {
    constructor() {
        client.on('connect', () => {
            console.log('Connected to MQTT broker');
        });
    }

    public publish = (request: Request, response: Response) => {
        const { topic, message } = request.body;

        // Dados hardcoded
        const hardcodedData = { "threshold": 25 };
        client.publish('refrigerator/config', JSON.stringify(hardcodedData), (err) => {
            if (err) {
                console.error('Failed to publish hardcoded data', err);
                return response.status(500).json({ message: 'Error publishing hardcoded data' });
            } else {
                console.log('Hardcoded data published successfully');
            }
        });

        // Publicar a mensagem recebida (opcional)
        client.publish(topic, message, (err) => {
            if (err) {
                return response.status(500).json({ message: 'Error publishing message' });
            }
            return response.status(200).json({ message: 'Message published successfully' });
        });
    };

    public subscribe = (request: Request, response: Response) => {
        const { topic } = request.body;

        client.subscribe(topic, (err) => {
            if (err) {
                return response.status(500).json({ message: 'Error subscribing to topic' });
            }
            return response.status(200).json({ message: `Subscribed to ${topic}` });
        });
    };
}
