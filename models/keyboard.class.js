class Keyboard {
  constructor() {
    this.ARROWLEFT = false;
    this.ARROWRIGHT = false;
    this.ARROWUP = false;
    this.KEYD = false;
    this.bindButtons();
  }

  /**
   * Mainfunction
   */
  bindButtons() {
    this.bindTouchBtns();
    this.bindClickBtns();
  }

  /**
   * Add actions to buttons on touch-event
   */
  bindTouchBtns() {
    document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
      if (e.cancelable) e.preventDefault();
      this.ARROWLEFT = true;
    });

    document.getElementById('leftBtn').addEventListener('touchend', (e) => {
      if (e.cancelable) e.preventDefault();
      this.ARROWLEFT = false;
    });

    document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
      if (e.cancelable) e.preventDefault();
      this.ARROWRIGHT = true;
    });

    document.getElementById('rightBtn').addEventListener('touchend', (e) => {
      if (e.cancelable) e.preventDefault();
      this.ARROWRIGHT = false;
    });

    document.getElementById('throwBtn').addEventListener('touchstart', (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEYC = true;
    });

    document.getElementById('throwBtn').addEventListener('touchend', (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEYC = false;
    });

    document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
      if (e.cancelable) e.preventDefault();
      this.ARROWUP = true;
    });

    document.getElementById('jumpBtn').addEventListener('touchend', (e) => {
      if (e.cancelable) e.preventDefault();
      this.ARROWUP = false;
    });
  }

  /**
   * Add actions to buttons on click-event
   */
  bindClickBtns() {
    document.getElementById('leftBtn').addEventListener('click', (e) => {
      if (e.cancelable) e.preventDefault();
      this.ARROWLEFT = true;
    });

    document.getElementById('leftBtn').addEventListener('mouseleave', (e) => {
      if (e.cancelable) e.preventDefault();
      this.ARROWLEFT = false;
    });

    document.getElementById('rightBtn').addEventListener('click', (e) => {
      if (e.cancelable) e.preventDefault();
      this.ARROWRIGHT = true;
    });

    document.getElementById('rightBtn').addEventListener('mouseleave', (e) => {
      if (e.cancelable) e.preventDefault();
      this.ARROWRIGHT = false;
    });

    document.getElementById('throwBtn').addEventListener('click', (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEYC = true;
    });

    document.getElementById('throwBtn').addEventListener('mouseleave', (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEYC = false;
    });
    document.getElementById('jumpBtn').addEventListener('click', (e) => {
      if (e.cancelable) e.preventDefault();
      this.ARROWUP = true;
    });

    document.getElementById('jumpBtn').addEventListener('mouseleave', (e) => {
      if (e.cancelable) e.preventDefault();
      this.ARROWUP = false;
    });
  }
}
