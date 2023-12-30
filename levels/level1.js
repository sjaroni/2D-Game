let level1;

function initLevel() {
  level1 = new Level(
    [
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Endboss(),
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
      new BackgroundObject('img/5_background/layers/air.png', -LEVEL_WIDTH * 1),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/2.png',
        -LEVEL_WIDTH * 1,
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        -LEVEL_WIDTH * 1,
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/2.png',
        -LEVEL_WIDTH * 1,
      ),

      new BackgroundObject('img/5_background/layers/air.png', 0),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

      new BackgroundObject('img/5_background/layers/air.png', LEVEL_WIDTH * 1),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/2.png',
        LEVEL_WIDTH * 1,
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        LEVEL_WIDTH * 1,
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/2.png',
        LEVEL_WIDTH * 1,
      ),

      new BackgroundObject('img/5_background/layers/air.png', LEVEL_WIDTH * 2),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/1.png',
        LEVEL_WIDTH * 2,
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/1.png',
        LEVEL_WIDTH * 2,
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/1.png',
        LEVEL_WIDTH * 2,
      ),

      new BackgroundObject('img/5_background/layers/air.png', LEVEL_WIDTH * 3),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/2.png',
        LEVEL_WIDTH * 3,
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        LEVEL_WIDTH * 3,
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/2.png',
        LEVEL_WIDTH * 3,
      ),

      new BackgroundObject('img/5_background/layers/air.png', LEVEL_WIDTH * 4),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/1.png',
        LEVEL_WIDTH * 4,
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/1.png',
        LEVEL_WIDTH * 4,
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/1.png',
        LEVEL_WIDTH * 4,
      ),

      new BackgroundObject('img/5_background/layers/air.png', LEVEL_WIDTH * 5),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/2.png',
        LEVEL_WIDTH * 5,
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        LEVEL_WIDTH * 5,
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/2.png',
        LEVEL_WIDTH * 5,
      ),

      new BackgroundObject('img/5_background/layers/air.png', LEVEL_WIDTH * 6),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/1.png',
        LEVEL_WIDTH * 6,
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/1.png',
        LEVEL_WIDTH * 6,
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/1.png',
        LEVEL_WIDTH * 6,
      ),
    ],
  );
}
