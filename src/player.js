export default class Player {
  constructor() {
    this.posX = 0;
    this.posY = 0;
  }

  spawn(ctx) {
    ctx.fillStyle = "#00FF00"
    ctx.fillRect(this.posX, this.posY, 50, 50);
  }

};