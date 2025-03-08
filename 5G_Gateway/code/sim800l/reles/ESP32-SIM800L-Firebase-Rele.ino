#define TINY_GSM_MODEM_SIM800 //Tipo de modem que estamos usando
#include <TinyGsmClient.h> //https://github.com/vshymanskyy/TinyGSM
#include <ArduinoJson.h> //https://github.com/bblanchon/ArduinoJson
#include <ArduinoHttpClient.h> //https://github.com/arduino-libraries/ArduinoHttpClient

#define FIREBASE_HOST "xxxxxxxxxx.firebaseio.com" // URL da base de dados fornecido pelo Firebase para a conexão http
#define FIREBASE_AUTH "" // Autenticação (no caso não estamos usando)

//Pinos SIM800L
#define MODEM_RST 5
#define MODEM_PWRKEY 4
#define MODEM_POWER_ON 23
#define MODEM_TX 27
#define MODEM_RX 26

//Pino Relê
#define RELAY_PIN 33

//Serial para se comunicar com o SIM800L
HardwareSerial SerialGSM(1);

//Objeto que controla o SIM800L
TinyGsm modemGSM(SerialGSM);

//Socket utilizado no cliente http
TinyGsmClientSecure gsmClient(modemGSM);

//Objeto que fará a comunicação com o Firebase
HttpClient httpClient(gsmClient, FIREBASE_HOST, 443);

//Variáveis para guardar qual o evento e os dados que chegarem do Firebase
String event;
String data;

void setup()
{
    //Inicializa a serial que usaremos no monitor serial
    Serial.begin(115200);

    //Coloca o pino do relê como saída
    pinMode(RELAY_PIN, OUTPUT);

    //Desliga o relê. Pela configuração do nosso relê: HIGH desliga e LOW liga
    digitalWrite(RELAY_PIN, HIGH);

    //Configura o SIM800L
    setupSIM800L();

    //Espera 2 segundos
    delay(2000);

    //Configura a conexão com o Firebase
    setupFirebaseEventStream();
}

void setupSIM800L()
{
    Serial.println("Setup SIM800L...");

    //Reseta o SIM800L
    pinMode(MODEM_RST, OUTPUT);
    pinMode(MODEM_PWRKEY, OUTPUT);
    pinMode(MODEM_POWER_ON, OUTPUT);
    digitalWrite(MODEM_RST, HIGH);
    digitalWrite(MODEM_POWER_ON, HIGH);
    digitalWrite(MODEM_PWRKEY, HIGH);
    delay(100);
    digitalWrite(MODEM_PWRKEY, LOW);
    delay(1000);
    digitalWrite(MODEM_PWRKEY, HIGH);

    //Inicializa a comunicação serial com o SIM800L
    SerialGSM.begin(115200, SERIAL_8N1, MODEM_RX, MODEM_TX);
    delay(3000);

    //Mostra informações sobre o SIM800L
    Serial.println(modemGSM.getModemInfo());

    //Conecta à rede telefônica
    Serial.print("Waiting for network...");
    if (!modemGSM.waitForNetwork())
    {
        Serial.println(" fail");
        delay(10000);
        return;
    }

    Serial.println(" success");

    //Conecta a rede de dados
    Serial.print("Connecting gprs ");
    if (!modemGSM.gprsConnect("", "", ""))
    {
        Serial.println(" fail");
        delay(10000);
        return;
    }

    Serial.println(" success");
    Serial.println("Setup SIM800L Success");
}

void setupFirebaseEventStream()
{
    //Tempo máximo de espera para a requisição
    httpClient.setTimeout(1000);

    //Inicializa a requisição
	httpClient.beginRequest();

    //Path cujos dados iremos receber em tempo real
    String path = "/relayStatus.json";

    //Se está utilizando autenticação
    if(strcmp(FIREBASE_AUTH, "") != 0)
    {
        path += "?auth=" + String(FIREBASE_AUTH);
    }

    //Faz uma requisição HTTP do tipo GET no path
	httpClient.get(path);

    //Informamos ao servidor que queremos os dados via "event-stream", ou seja, em tempo real
  	httpClient.sendHeader("Accept", "text/event-stream");

    //Finaliza a requisição
	httpClient.endRequest();
	
    //Verifica o código de resposta da requisição
	int httpCode = httpClient.responseStatusCode();
	
    //Se não for 200 significa que houve algum erro
	if (httpCode != 200)
    {
		Serial.println("Firebase event stream error. HTTP status code: " + String(httpCode));
	}
    else 
    {
        Serial.println("Connected to Firebase stream!!!");
    }

    Serial.println("Setup Firebase complete");
}

void loop()
{
    //Se o servidor quer nos enviar algo
    if (httpClient.available())
    {
        //Fazemos a leitura
        readFirebaseEventStreamLine();
	}
}

//Faz a leitura dos dados enviados pelo Firebase pela conexão que fizemos
//Sempre que algo for alterado no "path" que fizemos a conexão, o Firebase vai nos enviar o seguinte:
//event: 'tipo de evento'\r\ndata: 'dados que foram alterados'\r\n\r\n
//Então vamos ler linha a linha (ou seja até cada \n) e no final 
//teremos uma linha vazia ('\r\n' depois do '\r\n'do campo "data")
//Após a linha vazia já temos o tipo de evento e os dados salvos
void readFirebaseEventStreamLine()
{
    //Lemos uma linha
    String line = httpClient.readStringUntil('\n');

    //Se começar com "event:"
    if(line.startsWith("event:"))
    {
        //Guardamos a informação de qual tipo de evento
        line.replace("event:", "");
        line.trim();
        event = line;
    }
    //Se começar com "data:"
    else if(line.startsWith("data:"))
    {
        //Guardamos os dados
        line.replace("data:", "");
        line.trim();
        data = line;
    }
    //Se a linha tiver tamanho 0 significa que já lemos toda a resposta 
    else if(line.length() == 0 && data.length() != 0)
    {
        //Criamos um objeto json com os dados
        StaticJsonBuffer<1024> jsonBuffer;
        JsonObject &root = jsonBuffer.parseObject(data);

        //Se o json é válido
        if (root.success())
        {
            //Chamamos a função que irá manipular os dados
            onEventStreamData(event, root["path"].as<String>(), root["data"].as<String>());
        }
    }
}

//Função chamada toda vez que recebemos algo do firebase
//event: tipo de evento
//path: path relativo ao que estamos conectados, ou seja, 
//se nos conectamos ao /relayStatus.json um "/" aqui significa que a raiz /relayStatus foi alterada
//value: valor que foi enviado no "path"
void onEventStreamData(String event, String path, String value)
{
    //Verifica se um evento do tipo "put" ocorreu em /relayStatus
    if(event == "put" && path == "/")
    {
        //Coloca tudo em maiúsculo já que independe a maneira que foi enviada
        value.toUpperCase();

        //Se o valor for "ON"
        if(value == "ON")
        {
            //Ligamos o relê
            digitalWrite(RELAY_PIN, LOW);
        }
        //Se o valor for "OFF"
        else if(value == "OFF")
        {
            //Desligamos o relê
            digitalWrite(RELAY_PIN, HIGH);
        }
    }
}