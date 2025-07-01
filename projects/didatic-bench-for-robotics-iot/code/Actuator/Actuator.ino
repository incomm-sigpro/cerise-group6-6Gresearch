#include <esp_now.h>
#include <WiFi.h>
#include <cstring>

#define CHANNEL 1
#define MAGNET 22
#define BUZZER 23
#define DOOR_LOCK 25
#define DOOR_BUTTON 26

// Init ESP Now with fallback
void InitESPNow() {
  WiFi.disconnect();
  if (esp_now_init() == ESP_OK) {
    Serial.println("ESPNow Init Success");
  }
  else {
    Serial.println("ESPNow Init Failed");
    // Retry InitESPNow, add a counte and then restart?
    // InitESPNow();
    // or Simply Restart
    ESP.restart();
  }
}

// config AP SSID
void configDeviceAP() {
  const char *SSID = "Slave_1";
  bool result = WiFi.softAP(SSID, "Slave_1_Password", CHANNEL, 0);
  if (!result) {
    Serial.println("AP Config failed.");
  } else {
    Serial.println("AP Config Success. Broadcasting with AP: " + String(SSID));
  }
}

void setup() {
  Serial.begin(115200);
  Serial.println("\n\n\n\nStarting Actuators Subsystem.");
  //Set device in AP mode to begin with
  WiFi.mode(WIFI_AP);
  // configure device AP mode
  configDeviceAP();
  // This is the mac address of the Slave in AP Mode
  Serial.print("AP MAC: "); Serial.println(WiFi.softAPmacAddress());
  // Init ESPNow with a fallback logic
  InitESPNow();
  // Once ESPNow is successfully Init, we will register for recv CB to
  // get recv packer info.
  esp_now_register_recv_cb(OnDataRecv);
  // Initialize microcontroller ports
  pinMode(MAGNET, INPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(DOOR_LOCK, OUTPUT);
  digitalWrite(DOOR_LOCK, LOW);
  pinMode(DOOR_BUTTON, INPUT);
  digitalWrite(BUZZER, HIGH);
  delay(2000);  
  digitalWrite(BUZZER, LOW);
}

// callback when data is recv from Master
void OnDataRecv(const uint8_t *mac_addr, const uint8_t *data, int data_len) {
  char macStr[18];
  char msg[data_len + 1];
  memcpy(msg, data, data_len);
  msg[data_len] = '\0';
  snprintf(macStr, sizeof(macStr), "%02x:%02x:%02x:%02x:%02x:%02x",
           mac_addr[0], mac_addr[1], mac_addr[2], mac_addr[3], mac_addr[4], mac_addr[5]);
  Serial.print("Last Packet Recv from: "); Serial.println(macStr);
  Serial.print("Last Packet Recv Data: "); Serial.println(msg);
  Serial.println("");

  if (strcmp(msg, "OPEN_DOOR") == 0) {
    digitalWrite(DOOR_LOCK, HIGH);
    delay(2000);
    digitalWrite(DOOR_LOCK, LOW);
  }
}

void loop() {
  if (digitalRead(DOOR_BUTTON) == HIGH) {
    digitalWrite(DOOR_LOCK, HIGH);
    delay(2000);
    digitalWrite(DOOR_LOCK, LOW);
  }

  if (digitalRead(MAGNET) == LOW) {
    digitalWrite(BUZZER, HIGH);
  } else {
    digitalWrite(BUZZER, LOW);
  }
}
