export default class Player {
  constructor() {
    this.posX = 0;
    this.posY = 0;
    this.color = "#00FF00"
  }

  spawn(ctx) {
    ctx.fillStyle = "#00FF00"
    ctx.fillRect(0, 0, 30, 30);
  }
  
};