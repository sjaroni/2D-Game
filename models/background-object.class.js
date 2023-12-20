class BackgroundObject extends MovableObject{

  width = 720;  
  height = 480;
  folderName = '3_third_layer';
  
  constructor(imagePath, x){
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
    //this.animate();
    //this.imagePath = imagePath;
  }

  //TODO - Animation des Hintergrundes
  animate(){
    setInterval(() => {
      if (this.imagePath.includes(this.folderName)) {
        //console.log('Der Bildpfad enthält den Ordner 3_third_layer.');
        this.x -= 0.01;
      }
    }, 1000 / 65);
  }

}