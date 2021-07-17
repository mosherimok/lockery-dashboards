#define IS_FINGERPRINT_DETECTED 7
#define IS_KEY_AUTHORIZED 10
#define IS_FINGERPRINT_REQUIRED 8
#define IS_KEY_INSIDE_CYLINDER 9

#define PUSHBTN 2

#define LEDG 11
#define LEDB 12
#define LEDR 13

const int LONG_PRESS_TIME = 1000;

bool isLastCylinderLocked = true;
bool isWaitingForFingerprint = false;
int isAuthenticated = 0;

int pushBtnLastState = LOW;
unsigned long pressedTime  = 0;
unsigned long releasedTime = 0;
bool isPressing = false;
bool isLongDetected = false;

void setup() {
  Serial.begin(9600);
  
  pinMode(LEDR, OUTPUT);
  pinMode(LEDG, OUTPUT);
  pinMode(LEDB, OUTPUT);
  
  pinMode(PUSHBTN, INPUT);
  
  pinMode(IS_FINGERPRINT_DETECTED, INPUT);
  pinMode(IS_KEY_AUTHORIZED, INPUT);
  pinMode(IS_FINGERPRINT_REQUIRED, INPUT);
  pinMode(IS_KEY_INSIDE_CYLINDER, INPUT);
}

void loop() {
  int pushBtnState = digitalRead(PUSHBTN);
  
  bool isFingerprintDetected = digitalRead(IS_FINGERPRINT_DETECTED) > 0;
  bool isKeyAuthorized = digitalRead(IS_KEY_AUTHORIZED) > 0;
  bool isFingerprintRequired = digitalRead(IS_FINGERPRINT_REQUIRED) > 0;
  bool isKeyInsideCylinder = digitalRead(IS_KEY_INSIDE_CYLINDER) > 0;
  
  detectLongPress(pushBtnState);
  if (isLongDetected) {
  	setLedLight(0,0,255,0);
    isWaitingForFingerprint = true;
  } else if (pushBtnState == HIGH) {
  	handleSingleShortPress();
  }
  
  if (isWaitingForFingerprint && isFingerprintDetected) {
    isWaitingForFingerprint = false;
    isLongDetected = false;
  	setLedLight(0,255,0,100);
  }
  
  if (isKeyInsideCylinder) {
    handleKeyInCylinder(isKeyAuthorized, isFingerprintRequired, isFingerprintDetected);
  } else {
  	setLedLight(0,0,0,0);
  }
}

void setLedLight(int r, int g, int b, int turnOffDelay) {
  analogWrite(LEDR, r);
  analogWrite(LEDG, g);
  analogWrite(LEDB, b);
  if (turnOffDelay > 0) {
    delay(turnOffDelay);
    analogWrite(LEDR, 0);
  	analogWrite(LEDG, 0);
  	analogWrite(LEDB, 0);
  }
}

void handleSingleShortPress() {
  if (isLastCylinderLocked) {
  	setLedLight(255,0,0, 2000);
  } else {
  	setLedLight(0,255,0, 2000);
  }
}

void handleKeyInCylinder(
  bool isKeyAuthorized,
  bool isFingerprintRequired,
  bool isFingerprintDetected
) {
  if (isFingerprintRequired) {
    if (!isFingerprintDetected) {
    	setLedLight(0,0,255, 0);
      	return;
    }
  }
  
  if (isKeyAuthorized) {
    setLedLight(0,255,0, 2000);
    isLastCylinderLocked = false;
  } else {
  	setLedLight(255,0,0, 2000);
    isLastCylinderLocked = true;
  }
}

void detectLongPress(int currentPushBtnState) {
  if(pushBtnLastState == LOW && currentPushBtnState == HIGH) { // button is pressed
    pressedTime = millis();
  	isPressing = true;
    isLongDetected = false;
  }
  else if(pushBtnLastState == HIGH && currentPushBtnState == LOW) {// button is released
    releasedTime = millis();
	isPressing = false;
  }
  
  if(isPressing == true && isLongDetected == false) {
    long pressDuration = millis() - pressedTime;

    if( pressDuration > LONG_PRESS_TIME) {
      Serial.println("A long press is detected");
      isLongDetected = true;
    }
  }

  // save the the last state
  pushBtnLastState = currentPushBtnState;
}