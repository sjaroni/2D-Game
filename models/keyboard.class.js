class Keyboard {

  constructor(){
    this.ARROWLEFT = false;
    this.ARROWRIGHT = false;
    this.SPACE = false;
    this.ARROWUP = false;
    this.ARROWDOWN = false;
    this.KEYD = false;
  }

  // Setzt die angegebene Richtung auf true und alle anderen auf false
  setDirectionTrue(direction) {
    this.ARROWLEFT = direction === 'ARROWLEFT';
    this.ARROWRIGHT = direction === 'ARROWRIGHT';
    this.SPACE = direction === 'SPACE';
    this.ARROWUP = direction === 'ARROWUP';
    this.ARROWDOWN = direction === 'ARROWDOWN';
    this.KEYD = direction === 'KEYD';
  }
  
  // Setze alle auf false
  setDirectionFalse() {
    this.ARROWLEFT = false;
    this.ARROWRIGHT = false;
    this.SPACE = false;
    this.ARROWUP = false;
    this.ARROWDOWN = false;
    this.KEYD = false;
  }

}