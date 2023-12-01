// let level1;

// function initLevel(){
let levelWidth = 719; // in const.js?

const level1 = new Level(
  [
    new Chicken()
    // new Chicken(),
    // new Chicken(),
    // new Chicken(),
    // new Chicken(),
    // new Chicken(),
    // new Chicken(),
    // new Endboss(),
  ],
  [
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
  ],
  [
    new BackgroundObject('img/5_background/layers/air.png', -levelWidth * 1),
    new BackgroundObject(
      'img/5_background/layers/3_third_layer/2.png',
      -levelWidth * 1,
    ),
    new BackgroundObject(
      'img/5_background/layers/2_second_layer/2.png',
      -levelWidth * 1,
    ),
    new BackgroundObject(
      'img/5_background/layers/1_first_layer/2.png',
      -levelWidth * 1,
    ),

    new BackgroundObject('img/5_background/layers/air.png', 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

    new BackgroundObject('img/5_background/layers/air.png', levelWidth * 1),
    new BackgroundObject(
      'img/5_background/layers/3_third_layer/2.png',
      levelWidth * 1,
    ),
    new BackgroundObject(
      'img/5_background/layers/2_second_layer/2.png',
      levelWidth * 1,
    ),
    new BackgroundObject(
      'img/5_background/layers/1_first_layer/2.png',
      levelWidth * 1,
    ),

    new BackgroundObject('img/5_background/layers/air.png', levelWidth * 2),
    new BackgroundObject(
      'img/5_background/layers/3_third_layer/1.png',
      levelWidth * 2,
    ),
    new BackgroundObject(
      'img/5_background/layers/2_second_layer/1.png',
      levelWidth * 2,
    ),
    new BackgroundObject(
      'img/5_background/layers/1_first_layer/1.png',
      levelWidth * 2,
    ),

    new BackgroundObject('img/5_background/layers/air.png', levelWidth * 3),
    new BackgroundObject(
      'img/5_background/layers/3_third_layer/2.png',
      levelWidth * 3,
    ),
    new BackgroundObject(
      'img/5_background/layers/2_second_layer/2.png',
      levelWidth * 3,
    ),
    new BackgroundObject(
      'img/5_background/layers/1_first_layer/2.png',
      levelWidth * 3,
    ),
  ],
);

// }
