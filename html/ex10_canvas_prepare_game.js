
let img1;
let img2;
let img3;
let game = {
    canvas: document.getElementById("field"),
    start () {
        console.log(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.clear();
        this.interval = setInterval(redraw, 20);
        this.intervalNewEnemy = setInterval(newEnemy, 600);
        this.intervalNewBonus = setInterval(newBonus, 10000);
        this.intervalTime = setInterval(timer, 1000);
        this.player = new sprite(30, 30, "red", 10, 120);
        this.enemies = [];
        this.highscore = 0;
        this.timer = 0;
        this.bonus = [];
        this.keyCode = -1; //when there is no key pressed
        window.addEventListener('keydown', (e) =>
        {
            this.keyCode = e.keyCode;
        });

        window.addEventListener('keyup', (e) =>
        {
            this.keyPressed = -1;
        });
    },
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
    stop() {
        clearInterval(this.intervalNewEnemy)
        clearInterval(this.interval)
        clearInterval(this.intervalNewBonus)
        clearInterval(this.intervalTime)
        this.clear();
    }
}

function start() {
    console.log("Game started");
    game.start();
    img1 = new Image();
    img1.src = "/img/face-cool.png"
    img2 = new Image();
    img2.src = "/img/face-devilish.png"
    img3 = new Image();
    img3.src = "/img/face-monkey.png"
    document.getElementById("highs-core").innerHTML = game.highscore;

}


function sprite(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  ctx = game.context;
  //ctx.fillStyle = color;
  ctx.fillRect(this.x, this.y, this.width, this.height);

  this.redraw = function()
  {
    ctx = game.context;
    //ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    if(color === "red") ctx.drawImage(img1, this.x, this.y, this.width, this.height);else if(color === "blue")ctx.drawImage(img2, this.x, this.y, this.width, this.height);else if(color === "green")ctx.drawImage(img3, this.x, this.y, this.width, this.height);
  }
}

function redraw() {
  game.clear();
  game.player.x += 1;
  switch (game.keyCode) {
   case 37: //left
       game.player.x -= 2;
      break;
   case 38: //up
       game.player.y -= 1;
      break;
   case 39: //right
        game.player.x += 1;
      break;
   case 40: //down
       game.player.y += 1;
      break;
}
  if(game.player.x < 0)game.player.x = 0;
  if(game.player.x > 1000)game.player.x = 1000;
  if(game.player.y < 0)game.player.y = 0;
  if(game.player.y > 1000)game.player.y = 1000;

  game.player.redraw();

   game.enemies.forEach((e) => {

       console.log(e)
       let yDelta = Math.floor(Math.random() * 11) - 5;
       e.x -= 1;
       e.y += yDelta;
       if(e.x < 0){
           game.enemies.splice(game.enemies.indexOf(e),game.enemies.indexOf(e) < 1 ? 1 : game.enemies.indexOf(e))
       } else {

           e.redraw();
           if(Math.abs(game.player.x-e.x) <= 10 && Math.abs(game.player.y-e.y) <= 10) {
               game.stop();
               return
           }
       }
   })
    game.bonus.forEach((e) => {

        let yDelta = Math.floor(Math.random() * 11) - 5;
        e.x -= 1;
        e.y += yDelta;
        if(e.x < 0){
            game.bonus.splice(game.bonus.indexOf(e),game.bonus.indexOf(e) < 1 ? 1 : game.bonus.indexOf(e))
        } else {

            e.redraw();
            if(Math.abs(game.player.x-e.x) <= 10 && Math.abs(game.player.y-e.y) <= 10) {
                game.bonus.splice(game.bonus.indexOf(e),game.bonus.indexOf(e) < 1 ? 1 : game.bonus.indexOf(e))
                game.highscore++;
                document.getElementById("highs-core").innerHTML = "Highscore: " + game.highscore;
            }
        }
    })
}

function newEnemy()
{
    let y = Math.floor(Math.random()*1024);
    e = new sprite(30, 30, "blue", 1000, y);
    game.enemies.push(e);

}
function newBonus()
{
    let y = Math.floor(Math.random()*1024);
    e = new sprite(30, 30, "green", 1000, y);
    game.bonus.push(e);

}
function timer() {
    game.timer++;
    document.getElementById("score").innerHTML = game.highscore;
    document.getElementById("timer").innerHTML = game.timer;
}