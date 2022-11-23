
var myGamePiece;
var myObstacles = [];
var myScore;
var myBackground;
var map = document.querySelector('.border');
var LEVEL = document.getElementById('level');
var pilihan;
var mySound;
var myMusic;
var kesulitan = 1;
function startGame() {
    myGamePiece = new component(45, 70, "balonudara1.png", 100, 220, "image");
    mySound = new sound("bs.mp3");
    mySound.play();
    myMusic = new sound("sfx.mp3");
    if(kesulitan==3){
        myBackground = new component(1342, 630, "backgroundlvl1dan3.png", 0, 0, "image");
    }else if(kesulitan==2){
        myBackground = new component(1342, 630, "backgroundlvl2.png", 0, 0, "image");
    }else{
        myBackground = new component(1342, 630, "backgroundsky.png", 0, 0, "image");
    }

    myObstacle = new component(10, 200, "rintangan.png", 300, 120,"image");
    myScore = new component("30px", "Consolas", "black", 600, 40, "text");
    myGameArea.start();

    map.style.display= "none";
    document.getElementById('restart').style.display = "none";
    document.getElementById('win').style.display = "none";
    document.getElementById('next').style.display = "none";
    myObstacles.splice(0,myObstacles.length)
}
function rst(){
    document.querySelector('#restart').style.display = "none";
    document.querySelector('#win').style.display = "none"
}
function nextlvl(){
    kesulitan += 1;
    document.getElementById('next').style.display="none"
    startGame();
 }
function pilihLevel(){
    LEVEL.style.display ="";
    document.querySelector('div .button').style.display ='none';
    document.querySelector('div .buttonlvl').style.display ='none';
   
}

function level(tingkat){
    LEVEL.style.display ="";
    kesulitan=tingkat
    startGame();
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1342;
        this.canvas.height = 630;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
      myGameArea.key = e.keyCode;
    })
    window.addEventListener('keyup', function (e) {
      myGameArea.key = false;
    })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
        document.getElementById('restart').style.display = "";
    },
    menang : function() {
        clearInterval(this.interval);
        document.getElementById('win').style.display = "";
        document.getElementById('next').style.display = "";
    }
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
    this.image = new Image();
    this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type=="text"){
            ctx.font = this.width+" "+this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text,this.x,this.y);
        }
        ctx = myGameArea.context;
        if (type == "image") {
        ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            mySound.stop();
            myMusic.play();
           
        }if(myGameArea.frameNo==1000){
            myGameArea.menang();
            mySound.stop();
    
        }
        } 
    myGameArea.clear();
    if(kesulitan==3 || kesulitan==2){
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;
        if (myGameArea.key && myGameArea.key == 65) {myGamePiece.speedX = -2; }
        if (myGameArea.key && myGameArea.key == 68) {myGamePiece.speedX = 2; }
        if (myGameArea.key && myGameArea.key == 87) {myGamePiece.speedY = -2; myGamePiece.image.src = "balonudara2.png";}
        if (myGameArea.key && myGameArea.key == 83) {myGamePiece.speedY = 2; myGamePiece.image.src = "balonudara1.png";}
    }else{
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;
        if (myGameArea.key && myGameArea.key == 65) {myGamePiece.speedX = -1; }
        if (myGameArea.key && myGameArea.key == 68) {myGamePiece.speedX = 1; }
        if (myGameArea.key && myGameArea.key == 87) {myGamePiece.speedY = -1; myGamePiece.image.src = "balonudara2.png";}
        if (myGameArea.key && myGameArea.key == 83) {myGamePiece.speedY = 1; myGamePiece.image.src = "balonudara1.png";}
    }
    myObstacle.update();
    myBackground.newPos();
    myBackground.update();
    myGameArea.frameNo += 1;
    if(kesulitan==3){
        if (myGameArea.frameNo == 1 || everyinterval(30)) {
        x = myGameArea.canvas.width;
        size = Math.random()*(50-30)+30;
        i = Math.round(Math.random()*2+1);//index obs
        random=Math.floor(Math.random()*300);
        random1=Math.floor(Math.random()*300+300);
        myObstacles.push(new component(size+40,size,"burung.png",x,random,"image"));//posisi tertinggi 0
        myObstacles.push(new component(size+40,size,"burung.png",x+80,random1,"image"));//posisi terendah 240
    }
    }else if(kesulitan==2){
        if (myGameArea.frameNo == 1 || everyinterval(60)) {
        x = myGameArea.canvas.width;
        size = Math.random()*(50-30)+30;
        i = Math.round(Math.random()*2+1);//index obs
        random=Math.floor(Math.random()*300);
        random1=Math.floor(Math.random()*300+300);
        myObstacles.push(new component(size+40,size,"burung.png",x,random,"image"));//posisi tertinggi 0
        myObstacles.push(new component(size+40,size,"burung.png",x+80,random1,"image"));//posisi terendah 240
    }
    }else{
        if (myGameArea.frameNo == 1 || everyinterval(200)) {
        x = myGameArea.canvas.width;
        size = Math.random()*(50-30)+30;
        i = Math.round(Math.random()*2+1);//index obs
        random=Math.floor(Math.random()*300);
        random1=Math.floor(Math.random()*300+300);
        myObstacles.push(new component(size+40,size,"burung.png",x,random,"image"));//posisi tertinggi 0
        myObstacles.push(new component(size+40,size,"burung.png",x+80,random1,"image"));//posisi terendah 240
    }
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        if(kesulitan==3){
            myObstacles[i].x+= -10;//kecepatan obstacle LEVEL 3
        } else if(kesulitan==2){///
            myObstacles[i].x+= -5;//kecepatan obstacle LEVEL 2
        } else{
            myObstacles[i].x+= -2;//kecepatan obstacle LEVEL 1
        }
        myObstacles[i].newPos();
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();    
    myGamePiece.update();
    }
  




function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
