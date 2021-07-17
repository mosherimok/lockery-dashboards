#define WIFI_PUSH_BTN 13
#define RESET_PUSH_BTN 12
#define KEY_PAIRING_PUSH_BTN 11
#define WIFI_LED 10
#define RESET_LED 9
#define KEY_PAIRING_LED 8
#define BEEPER 3
#define SERVO 2
#define KEY_AUTHENTICATOR 4
#define IS_KEY_INSIDE 5

#include <Servo.h>

bool isAuthenticated = false;
bool isOpened = false;
bool previousKeyAuthenticationState = false;
int servoPos = 0;

bool isInPairingMode = false;
bool isWifiEnabled = false;

Servo servo;

// C++ code
//
void setup()
{
  Serial.begin(9600);
  
  pinMode(WIFI_LED, OUTPUT);
  pinMode(RESET_LED, OUTPUT);
  pinMode(KEY_PAIRING_LED, OUTPUT);
  pinMode(BEEPER, OUTPUT);
  
  pinMode(WIFI_PUSH_BTN, INPUT);
  pinMode(RESET_PUSH_BTN, INPUT);
  pinMode(KEY_PAIRING_PUSH_BTN, INPUT);
  pinMode(KEY_AUTHENTICATOR, INPUT);
  pinMode(IS_KEY_INSIDE, INPUT);
  
  servo.attach(SERVO, 500, 2500);
  
  lock();
}

void loop()
{
  int wifiButtonState = digitalRead(WIFI_PUSH_BTN);
  int resetButtonState = digitalRead(RESET_PUSH_BTN);
  int keyPairButtonState = digitalRead(KEY_PAIRING_PUSH_BTN);
  int isKeyAuthenticated = digitalRead(KEY_AUTHENTICATOR) > 0;
  int isKeyInside = digitalRead(IS_KEY_INSIDE) > 0;
  
  if (wifiButtonState == 1) {
    Serial.println(wifiButtonState);
  	delay(3000);
    wifiButtonState = digitalRead(WIFI_PUSH_BTN);
    if (wifiButtonState == 1) {
      toggleLed(WIFI_LED, true);
      isWifiEnabled = !isWifiEnabled;
    }
  }
  
  if (resetButtonState == 1) {
    Serial.println(resetButtonState);
    toggleLed(RESET_LED, false);
  	delay(3000);
    toggleLed(RESET_LED, false);
    resetButtonState = digitalRead(RESET_PUSH_BTN);
    if (resetButtonState == 1) {
      	isAuthenticated = true;
      	isInPairingMode = false;
      	digitalWrite(KEY_PAIRING_LED, LOW);
		unlock();
    }
  }
  
  if (keyPairButtonState == 1 && !isInPairingMode) {
  	delay(3000);
    isInPairingMode = true;
    toggleLed(KEY_PAIRING_LED, true);
  }
  
  if (isInPairingMode && isKeyInside) {
    delay(1000);
    toggleLed(KEY_PAIRING_LED, true);
    isInPairingMode = false;
  }
  
  if (isAuthenticated) {
  	if (!isOpened) {
      tone(BEEPER, 784, 100);
      unlock();
      return;
    }
  } else {
  	if (isOpened) {
    	tone(BEEPER, 698, 100);
      	lock();
      	return;
    }
  }
    
  if (isKeyAuthenticated != previousKeyAuthenticationState) {
    if (isKeyAuthenticated) {
      isAuthenticated = true;
    } else {
      isAuthenticated = false;
    }
    previousKeyAuthenticationState = isKeyAuthenticated;
  }
}

void toggleLed(int ledId, bool shouldBeep) {
  int ledPowerState = digitalRead(ledId);
  if (ledPowerState == HIGH) {
    digitalWrite(ledId, LOW);
    if (shouldBeep) {
      tone(BEEPER, 293, 100);
    }
  } else {
    digitalWrite(ledId, HIGH);
    if (shouldBeep) {
      tone(BEEPER, 320, 100);
    }
  }
}


void unlock() {
  // sweep the servo from 0 to 180 degrees in steps
  	// of 1 degrees
  	for (;servoPos <= 90; servoPos += 1) {
    	// tell servo to go to position in variable 'pos'
    	servo.write(servoPos);
    	// wait 15 ms for servo to reach the position
      	delay(15); // Wait for 15 millisecond(s)
  	}
  	isOpened = true;
}

void lock() {
	for (;servoPos >= 0; servoPos -= 1) {
    	// tell servo to go to position in variable 'pos'
    	servo.write(servoPos);
    	// wait 15 ms for servo to reach the position
    	delay(15); // Wait for 15 millisecond(s)
  	}
  	isOpened = false;
}