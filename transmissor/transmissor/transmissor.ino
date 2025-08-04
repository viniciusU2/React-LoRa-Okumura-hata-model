// Medição de corrente AC com ACS712 e tensão AC com ZMPT101B usando ESP32
// Sensor de corrente ACS712 - versão de 5A (mVporAmp = 185)
// Sensor de tensão ZMPT101B - calibração via sensibilidade em mV/V

const int sensorCorrente = 2;     // Pino do ACS712 (GPIO2)
const int sensorTensao = 36;      // Pino do ZMPT101B (ex: GPIO34)

const int mVporAmp = 66;          // Sensibilidade do ACS712 (mV/A)
const float fatorCalibracaoTensao = 225.0; // Ajuste conforme seu ZMPT101B

float correnteRMS = 0;
float tensaoRMS = 0;

void setup() {
  Serial.begin(115200);
  analogReadResolution(12); // 12 bits ADC: 0 a 4095
  Serial.println("Iniciando medição de corrente e tensão AC...");
}

void loop() {
  correnteRMS = calcularCorrenteRMS();
  tensaoRMS = calcularTensaoRMS();

  Serial.print("Corrente RMS: ");
  Serial.print(correnteRMS, 2);
  Serial.print(" A\t");

  Serial.print("Tensão RMS: ");
  Serial.print(tensaoRMS, 2);
  Serial.println(" V");

  delay(1000); // Aguarda entre as medições
}

// ---------------- FUNÇÕES ----------------

float calcularCorrenteRMS() {
  int leitura;
  int valorMax = 0;
  int valorMin = 4095;
  uint32_t tempoInicio = millis();

  while ((millis() - tempoInicio) < 1000) {
    leitura = analogRead(sensorCorrente);
    if (leitura > valorMax) valorMax = leitura;
    if (leitura < valorMin) valorMin = leitura;
  }

  float vpp = (valorMax - valorMin) * (3.3 / 4095.0);  // Pico-a-pico em volts
  float vrms = (vpp / 2.0) * 0.707;                    // Tensão RMS
  float corrente = ((vrms * 1000) / mVporAmp) - 0.3;   // Corrente com offset
  return corrente;
}

float calcularTensaoRMS() {
  int leitura;
  int valorMax = 0;
  int valorMin = 4095;
  uint32_t tempoInicio = millis();

  while ((millis() - tempoInicio) < 1000) {
    leitura = analogRead(sensorTensao);
    if (leitura > valorMax) valorMax = leitura;
    if (leitura < valorMin) valorMin = leitura;
  }

  float vpp = (valorMax - valorMin) * (3.3 / 4095.0);
  float vrmsSensor = (vpp / 2.0) * 0.707;
  float tensao = vrmsSensor * fatorCalibracaoTensao; // Calibração para tensão real
  return tensao;
}
