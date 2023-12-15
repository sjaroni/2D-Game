class Keyboard {

  constructor(){
    this.ARROWLEFT = false;
    this.ARROWRIGHT = false;
    this.SPACE = false;
    this.KEYD = false;
  }


  bindTouchBtns() {
    document.getElementById('leftBtn').addEventListener('touchstart', (e) =>{
      e.preventDefault();
      this.ARROWLEFT = true;
    });
    
    document.getElementById('leftBtn').addEventListener('touchend', (e) =>{
      e.preventDefault();
      this.ARROWLEFT = false;
    });

    document.getElementById('rightBtn').addEventListener('touchstart', (e) =>{
      e.preventDefault();      
      this.ARROWRIGHT = true;
    });
    
    document.getElementById('rightBtn').addEventListener('touchend', (e) =>{
      e.preventDefault();
      this.ARROWRIGHT = false;
    });
    
    
    document.getElementById('throwBtn').addEventListener('touchstart', (e) =>{
      e.preventDefault();      
      this.KEYD = true;
    });
    
    document.getElementById('throwBtn').addEventListener('touchend', (e) =>{
      e.preventDefault();
      this.KEYD = false;
    });

    document.getElementById('jumpBtn').addEventListener('touchstart', (e) =>{
      e.preventDefault();      
      this.SPACE = true;
    });
    
    document.getElementById('jumpBtn').addEventListener('touchend', (e) =>{
      e.preventDefault();
      this.SPACE = false;
    });
  }

}