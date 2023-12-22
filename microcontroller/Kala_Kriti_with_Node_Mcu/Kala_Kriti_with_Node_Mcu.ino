#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#define SCREEN_WIDTH 128     // OLED display width, in pixels
#define SCREEN_HEIGHT 64     // OLED display height, in pixels
#define OLED_RESET -1        // This for reset. It is not Important to write
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);      // OLED rest in node mcu mean write -1 and in Uno its 4

WiFiClient client;
HTTPClient httpClient;

int sensor = A0;
int relay = 13;                                // 13 is GPIO pin  in NodeMcu & D7 is digital pin in Node Mcu or 0 is GPIO pin  in NodeMcu & D3 is digital pin in Node Mcu
int buzzer = 16;                               // 16 is GPIO pin  in NodeMcu & D0 is digital pin in Node Mcu
int red = 2;                                   // 2 is GPIO pin  in NodeMcu & D4 is digital pin in Node Mcu
int green = 14;                                // 14 is GPIO pin  in NodeMcu & D5 is digital pin in Node Mcu
int blue = 12;                                 // 12 is GPIO pin  in NodeMcu & D6 is digital pin in Node Mcu
int gasLevel = 0;                              // int variable for gas level
String quality = "";

char ssid[] = "<wifi-name>";
char pass[] = "<wifi-pass>";

void setup() {
  Serial.begin(115200);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);      // This is the address of our display so dont change it.
  display.clearDisplay();                         // This is for clear Oled. If you will not this is print Adafruit Logo
  display.setTextColor(WHITE);                    // This is color of text without this you can't see text
  display.setCursor(5, 10);                       // This is for exact place where you want to print like XY Coordinate where X is vary from 0-127 and Y is vary from 0-63
  display.setTextSize(2);                         // This is Text size you can change it from 1-5 or more
  display.println("KALA-KRITI");
  display.display();                              // THIS IS ALWAYS USED AT LAST OF CODING AFTER PRINT ANYTHING IN OLED
   
  pinMode(buzzer, OUTPUT);                        // Set beeper for output
  pinMode(sensor, INPUT);                         // Set sensor for input
  pinMode(relay, OUTPUT);
  pinMode(red, OUTPUT);
  pinMode(green, OUTPUT);
  pinMode(blue, OUTPUT);

  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("Connected");
  Serial.println(WiFi.localIP());
  
  delay(1000);
}

void loop() {
  gasLevel = analogRead(sensor);
  Serial.print("Gas Level:");
  Serial.println(gasLevel);
  digitalWrite (green, LOW);
  digitalWrite (red, LOW);
  digitalWrite (blue, LOW);
  digitalWrite (buzzer, LOW);
  digitalWrite (relay, HIGH);

  if (gasLevel < 200) {
    quality = "GOOD";
    digitalWrite(relay, HIGH);
    digitalWrite (green, HIGH);
    delay(500);
  }

  else if (gasLevel >= 200 and gasLevel < 300) {
    quality = "Unhealthy";
    digitalWrite(relay, LOW);
    digitalWrite (blue, HIGH);
    tone(buzzer, 1000, 80);
    delay(500);
  }

  else if (gasLevel >= 300) {
    quality = "Hazardous";
    digitalWrite(relay, LOW);
    digitalWrite (red, HIGH);
    digitalWrite( buzzer, HIGH);
    delay(500);
  }

  postData(String(gasLevel), quality);

  display.clearDisplay();
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  display.setTextSize(1);
  display.print("Air Quality is: ");
  display.setCursor(100, 0);
  display.setTextSize(1);
  display.print(gasLevel);
  display.setTextSize(2);
  display.setCursor(0, 15);
  display.println(quality);
  display.display();
}

void postData(String mq2_val, String quality) {
  String URL = "http://<ip-address>:<port>/api/data/" + mq2_val + "/" + quality;
  httpClient.begin(client, URL);
  httpClient.POST(URL);
  Serial.println(URL);
  delay(2500);
}