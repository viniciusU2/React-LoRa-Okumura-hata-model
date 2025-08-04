#include <WiFi.h>
#include <HTTPClient.h>
#include <LoRa.h>

// Configurações da sua rede
char ssid[] = "Tplink";
char password[] = "camilla15";


// URL do backend
const char* serverUrl = "http://192.168.0.114:3000/lora";  // altere para o IP do seu backend

void setup() {
  Serial.begin(9600);

  // Conectar no Wi-Fi
  WiFi.begin("Tplink", "camilla15");
  Serial.print("Conectando ao Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi conectado!");
  LoRa.setPins(18, 14, 26);  // NSS, RST, DIO0

  // Inicializar LoRa
  if (!LoRa.begin(915E6)) {
    Serial.println("Falha ao iniciar LoRa!");
    while (1);
  }
  Serial.println("LoRa inicializado.");
}

void loop() {
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    String msg = "";
    while (LoRa.available()) {
      msg += (char)LoRa.read();
    }

    int rssi = LoRa.packetRssi();
    float snr = LoRa.packetSnr();

    // Montar payload JSON
    String payload = "{\"data\":\"" + msg + "\",\"rssi\":" + String(rssi) + ",\"snr\":" + String(snr, 1) + "}";

    Serial.println("Enviando: " + payload);

    // Enviar para o backend
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    int code = http.POST(payload);
    Serial.print("Código de resposta: ");
    Serial.println(code);
    http.end();

    if (code == 201) {
      String resposta = http.getString();
      Serial.println("Resposta do servidor:");
      Serial.println(resposta);

      // Reenviar via LoRa (de volta)
      LoRa.beginPacket();
      LoRa.print(payload);  // Você pode limpar e formatar, se necessário
      LoRa.endPacket();
    }
  }
}
