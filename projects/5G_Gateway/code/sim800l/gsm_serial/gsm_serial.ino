#include <SoftwareSerial.h>
 
//Porta do Arduino onde o pino TX do Módulo GSM esta conectado
#define TX_PIN 10
 
//Porta do Arduino onde o pino RX do Módulo GSM esta conectado
#define RX_PIN 11
 
//Cria comunicacao serial via software nas portas digitais definidas acima
SoftwareSerial serialGSM(TX_PIN, RX_PIN);
 
void setup() {
  //Begin serial comunication with Arduino and Arduino IDE (Serial Monitor)
  Serial.begin(9600);
  while(!Serial);
   
  //Inicia comunicacao serial com o GSM
  serialGSM.listen();
  serialGSM.begin(9600);
  delay(1000);
   
  Serial.println("Setup Completo!");
}
 
void loop() {
  //Le as mensagens vindas do GSM para escrevê-las no monitor serial
  if(serialGSM.available()){
    Serial.write(serialGSM.read());
  }
  
  //Le as mensagens vindas do monitor serial para copiá-las para o GSM
  if(Serial.available()){    
    serialGSM.write(Serial.read());
  }
}
