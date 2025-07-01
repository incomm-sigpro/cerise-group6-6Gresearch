# Manual de Comandos AT - SIM800L

## Introdução

O módulo SIM800L é um módulo GSM/GPRS que permite a comunicação em redes móveis, sendo amplamente utilizado em projetos IoT e sistemas embarcados. A comunicação com o SIM800L é feita via comandos AT, que permitem realizar chamadas, enviar SMS, acessar a internet, entre outras funções. O SIM800L é um módulo GSM/GPRS compacto e eficiente que permite a comunicação via redes celulares. Ele suporta comandos AT, que são instruções enviadas ao módulo para controlar suas funcionalidades.

Este manual apresenta os principais comandos AT utilizados para operar o módulo SIM800L.

## Configuração Inicial

### Conectando ao Módulo

1. Utilize um microcontrolador (Arduino, ESP32, etc.) ou um conversor USB-Serial para se comunicar com o SIM800L.
2. A comunicação é feita via interface serial, geralmente com uma taxa de transmissão (baud rate) de **9600 bps**.
3. Alimente o módulo com **4.2V - 4.4V** e certifique-se de que a corrente fornecida é suficiente (mínimo de 2A recomendado).

## Comandos AT Básicos

### Teste de Comunicação

```bash
AT
```

**Resposta esperada:** `OK`

### Verificação da Versão do Firmware

```bash
AT+GMR
```

**Resposta esperada:** Informação da versão do firmware do módulo.

### Reinicialização do Módulo

```bash
AT+CFUN=1,1
```

**Resposta esperada:** `OK` (módulo será reinicializado)

### Verificação da Intensidade do Sinal

```bash
AT+CSQ
```

**Resposta esperada:** `+CSQ: xx,yy`

- O primeiro número (xx) representa a força do sinal (0 a 31, onde valores acima de 10 são aceitáveis).

### Verificação do Registro na Rede

```bash
AT+CREG?
```

**Resposta esperada:**

- `+CREG: 0,1` (registrado na rede doméstica)
- `+CREG: 0,5` (registrado em roaming)

## Comandos AT para Chamadas

### Realizar uma Chamada

```bash
ATD+5591999999999;
```

**Resposta esperada:** O módulo inicia a chamada.

### Encerrar uma Chamada

```bash
ATH
```

**Resposta esperada:** `OK`

### Atender uma Chamada

```bash
ATA
```

**Resposta esperada:** `OK` (atende uma chamada recebida)

## Comandos AT para SMS

### Configurar Modo de SMS para Texto

```bash
AT+CMGF=1
```

**Resposta esperada:** `OK`

### Enviar um SMS

```bash
AT+CMGS="+5591999999999"
```

Após este comando, o módulo aguardará o conteúdo da mensagem. Digite o texto desejado e pressione **CTRL+Z** para enviar.

**Resposta esperada:** `+CMGS: <ID da mensagem>`

### Ler Mensagens SMS

```bash
AT+CMGR=1
```

**Resposta esperada:** Exibe o conteúdo da mensagem armazenada no índice 1.

### Listar Mensagens Recebidas

```bash
AT+CMGL="ALL"
```

**Resposta esperada:** Lista todas as mensagens armazenadas.

## Comandos AT para Conexão GPRS

### Configurar APN

```bash
AT+CSTT="apn_do_provedor","usuario","senha"
```

**Resposta esperada:** `OK`

### Ativar Conexão GPRS

```bash
AT+CIICR
```

**Resposta esperada:** `OK`

### Obter Endereço IP

```bash
AT+CIFSR
```

**Resposta esperada:** Endereço IP atribuído pelo provedor de rede.

### Enviar Dados via HTTP

```bash
AT+HTTPINIT  
AT+HTTPPARA="URL","http://example.com/api"  
AT+HTTPACTION=1
```

**Resposta esperada:** Código de resposta HTTP (200 para sucesso, por exemplo).

Este manual descreve os principais comandos AT para o módulo GSM/GPRS SIM800L, amplamente utilizado em projetos de comunicação móvel e IoT.

## Comandos Básicos

### 1. Verificar Comunicação com o Módulo

Envie o comando abaixo para verificar se o módulo está respondendo:

```plaintext
AT
```

**Resposta esperada:**

```plaintext
OK
```

### 2. Verificar Informações do Módulo

Para obter informações sobre o módulo, use:

```plaintext
ATI
```

**Resposta esperada:**

```plaintext
SIM800L
OK
```

### 3. Verificar Sinal de Rede

Para verificar a qualidade do sinal da rede:

```plaintext
AT+CSQ
```

**Resposta esperada:**

```plaintext
+CSQ: <rssi>,<ber>
OK
```

- `<rssi>`: Intensidade do sinal (0-31, onde 31 é o melhor).
- `<ber>`: Taxa de erro de bits (0-7, onde 0 é o melhor).

### 4. Verificar Status da Rede

Para verificar se o módulo está registrado na rede:

```plaintext
AT+CREG?
```

**Resposta esperada:**

```plaintext
+CREG: <mode>,<stat>
OK
```

- `<mode>`: Modo de registro (0-2).
- `<stat>`: Status de registro (1 = registrado, 2 = buscando rede).

## Comandos para SMS

### 1. Enviar SMS

Para enviar um SMS, siga os passos abaixo:

1. Definir o modo de texto:

```plaintext
AT+CMGF=1
```

2. Enviar o SMS:

```plaintext
AT+CMGS="<número>"
```

3. Digite a mensagem e finalize com `Ctrl+Z` (ASCII 26).

**Exemplo:**

```plaintext
AT+CMGS="+5511999999999"
> Olá, este é um teste!
+CMGS: <mr>
OK
```

### 2. Ler SMS

Para ler uma mensagem SMS armazenada:

```plaintext
AT+CMGR=<index>
```

- `<index>`: Índice da mensagem na memória.

**Resposta esperada:**

```plaintext
+CMGR: "stat", "número", "", "data", "hora"
<texto da mensagem>
OK
```

## Comandos para Chamadas

### 1. Fazer uma Chamada

Para fazer uma chamada:

```plaintext
ATD<número>;
```

**Exemplo:**

```plaintext
ATD+5511999999999;
```

### 2. Atender uma Chamada

Para atender uma chamada:

```plaintext
ATA
```

### 3. Encerrar uma Chamada

Para encerrar uma chamada:

```plaintext
ATH
```

## Comandos GPRS

### 1. Ativar GPRS

Para ativar o GPRS:

```plaintext
AT+CGATT=1
```

### 2. Configurar APN

Para configurar o APN (Access Point Name):

```plaintext
AT+CSTT="<APN>","<usuário>","<senha>"
```

**Exemplo:**

```plaintext
AT+CSTT="tim.com.br","tim","tim"
```

### 3. Iniciar Conexão GPRS

Para iniciar a conexão GPRS:

```plaintext
AT+CIICR
```

### 4. Verificar Endereço IP

Para verificar o endereço IP:

```plaintext
AT+CIFSR
```

## Conclusão

Este manual cobre os principais comandos AT para o módulo SIM800L. Consulte a documentação oficial para obter uma lista completa de comandos e funcionalidades.
