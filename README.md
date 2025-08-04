# React-LoRa-Okumura-Hata-Model

Este projeto integra um sistema completo para simulação, monitoramento e visualização da propagação de sinais LoRa em ambientes remotos, com base no modelo de perda de percurso Okumura-Hata. A aplicação é dividida em quatro módulos principais:

- `front`: Interface gráfica em React com visualização de dados e mapas.
- `back`: Backend em Node.js com Express que fornece os dados LoRa via API.
- `transmissor`: Código embarcado para o módulo transmissor LoRa.
- `receptor`: Código embarcado para o módulo receptor LoRa.

## 📦 Estrutura do Projeto

```bash
├── back/                     # Backend com Node.js e Express
├── front/                    # Frontend com React + TailwindCSS
├── transmissor/transmissor/  # Código Arduino para o transmissor (Heltec WiFi LoRa 32 v2)
├── receptor/receptor/        # Código Arduino para o receptor (Heltec WiFi LoRa 32 v2)
├── README.md
```

---

## 🧠 Tecnologias Utilizadas

### Frontend (`/front`)
- **React + Vite**: Interface SPA moderna.
- **TailwindCSS**: Estilização rápida e responsiva.
- **@react-google-maps/api**: Visualização de mapas e círculos de sinal.
- **axios**: Requisições HTTP para o backend.
- **react-hook-form**: Formulários dinâmicos.

### Backend (`/back`)
- **Node.js + Express**: Servidor RESTful simples.
- **CORS**: Permissão de comunicação entre front e back.
- **JSON DB / memória**: Dados simulados para visualização.

### Dispositivos (`/transmissor` e `/receptor`)
- **Arduino IDE**: Plataforma para upload do código.
- **Placa Heltec WiFi LoRa 32 v2**:
  - Envia e recebe pacotes LoRa com informações como RSSI e SNR.
  - Comunicação entre dispositivos usando rádio LoRa 915 MHz.

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/React-LoRa-Okumura-hata-model.git
cd React-LoRa-Okumura-hata-model
```

---

### 2. Backend (API)

```bash
cd back
npm install
npm run dev
```

O servidor será iniciado em `http://localhost:3000`.

---

### 3. Frontend (Interface)

```bash
cd ../front
npm install
npm run dev
```

A aplicação React abrirá automaticamente no navegador (geralmente `http://localhost:5173`).

> 📌 Garanta que você tenha configurado o arquivo `.env` com a variável `VITE_REACT_APP_GOOGLE_API_KEY`.

---

### 4. Transmissor e Receptor (Arduino)

1. **Abrir Arduino IDE**
2. Instalar a placa **Heltec WiFi LoRa 32 v2**:
   - Vá em: `Arquivo > Preferências` e adicione no campo "URLs adicionais de placas":
     ```
     https://resource.heltec.cn/download/package_heltec_esp32_index.json
     ```
   - Em seguida, instale a placa via: `Ferramentas > Placa > Gerenciador de Placas`.

3. **Abrir os códigos**
   - Acesse a pasta `transmissor/transmissor` e `receptor/receptor`.
   - Compile e faça o upload do código para os respectivos módulos via USB.

4. Certifique-se de que ambos os dispositivos estão ligados e com antena conectada para evitar danos.

---

## 🗺️ Funcionalidades da Interface

- Exibe as perdas de sinal com base no modelo Okumura-Hata.
- Visualização do mapa com círculos de intensidade de sinal.
- Mostra os dados LoRa reais recebidos do receptor:
  - RSSI (Received Signal Strength Indicator)
  - SNR (Signal-to-Noise Ratio)
- Permite editar os parâmetros do modelo via modal.

---

## 📷 Exemplo de Visualização

> Círculos coloridos representando diferentes distâncias e perdas de sinal, com etiquetas indicando o RSSI estimado com base no modelo.

---

## 🧪 Simulação

As distâncias são simuladas de 1 a 10 km com incrementos de 100 metros. O modelo de perda utilizado é o **Okumura-Hata rural**, considerando:
- Frequência: 900 MHz
- Altura do transmissor: 50 m
- Altura do receptor: 1.1 m

---

## 📋 Licença

Distribuído sob a licença MIT.

