class Keyboard {
  constructor() {
    this.ARROWLEFT = false;
    this.ARROWRIGHT = false;
    this.ARROWUP = false;
    this.KEYD = false;
    this.bindButtons();
  }

  bindButtons() {
    this.bindTouchBtns();
    this.bindClickBtns();
  }

  bindTouchBtns() {
    document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.ARROWLEFT = true;
    });

    document.getElementById('leftBtn').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.ARROWLEFT = false;
    });

    document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.ARROWRIGHT = true;
    });

    document.getElementById('rightBtn').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.ARROWRIGHT = false;
    });

    document.getElementById('throwBtn').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.KEYD = true;
    });

    document.getElementById('throwBtn').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.KEYD = false;
    });

    document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.ARROWUP = true;
    });

    document.getElementById('jumpBtn').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.ARROWUP = false;
    });
  }

  bindClickBtns() {
    document.getElementById('leftBtn').addEventListener('click', (e) => {
      e.preventDefault();
      this.ARROWLEFT = true;
    });

    document.getElementById('leftBtn').addEventListener('mouseleave', (e) => {
      e.preventDefault();
      this.ARROWLEFT = false;
    });

    document.getElementById('rightBtn').addEventListener('click', (e) => {
      e.preventDefault();
      this.ARROWRIGHT = true;
    });

    document.getElementById('rightBtn').addEventListener('mouseleave', (e) => {
      e.preventDefault();
      this.ARROWRIGHT = false;
    });

    document.getElementById('throwBtn').addEventListener('click', (e) => {
      e.preventDefault();
      this.KEYD = true;
    });

    document.getElementById('throwBtn').addEventListener('mouseleave', (e) => {
      e.preventDefault();
      this.KEYD = false;
    });
    document.getElementById('jumpBtn').addEventListener('click', (e) => {
      e.preventDefault();
      this.ARROWUP = true;
    });

    document.getElementById('jumpBtn').addEventListener('mouseleave', (e) => {
      e.preventDefault();
      this.ARROWUP = false;
    });
  }
}
