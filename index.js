//variables and constants 

let inputDir={
    x:0,
    y:0
}

let food={
    x:4,y:5
}

let snakeArr=[
    {x:13,y:15}
];
let foodSound= new Audio('music/food.mp3');
let gameOverSound= new Audio('music/gameover.mp3');
let moveSound=new Audio('music/move.mp3');
let musicSound=new Audio('music/music.mp3');
let lastPaintTime=0;
let score=0;
let speed=2;



//game  functions 

function main(currTime){
    window.requestAnimationFrame(main);
    if(((currTime-lastPaintTime)/1000)<(1/speed)){
        return;
    }

    lastPaintTime=currTime;
     gameEngine();



}
function isCollide(snakeArray){
return false;
}



function gameEngine(){
    //updating the snake, eat food and collide

    //collide
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        alert("gameover! press any key to reset the game");
        snakeArr= {x:13,y:15};
        inputDir={x:0,y:0};
    }

    //if snake has eaten the food
    if(snakeArr[0].x==food.x && snakeArr[0].y==food.y){
        foodSound.play();
        snakeArr.unshift({x:inputDir.x+snakeArr[0].x,
            y:inputDir.y+snakeArr[0].y,});

        // let newHead={
        //     x:inputDir.x+snakeArr[0].x,
        //     y:inputDir.y+snakeArr[0].y,
        // }

    }

    for(let i=snakeArr.length-2; i>=0; i--){
        snakeArr[i+1]={...snakeArr[i]};

     }
     snakeArr[0].x+=inputDir.x;
     snakeArr[0].y+=inputDir.y;





    //displaying the snake
     let board=  document.querySelector(".board");
     board.innerHTML=" ";    
    snakeArr.forEach((value,index)=>{
            let snakeElement= document.createElement("div");

            snakeElement.classList.add("snakeBody");
            if(index==0){
            snakeElement.classList.remove("snakeBody");

            snakeElement.classList.add("head");

            }
            snakeElement.style.gridRowStart=value.y;
            snakeElement.style.gridColumnStart=value.x;
            board.appendChild(snakeElement);
    });



    //displaying the food
    let foodElement= document.createElement("div");
    foodElement.classList.add("food");
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    board.appendChild(foodElement);


   
    
}






//game logic

document.addEventListener('keydown',function(event){
inputDir={x:0,y:1};   //snake starts moving down

moveSound.play();
switch (event.key){
    case "ArrowUp":
        console.log("arrowup");
        inputDir.x=0;
        inputDir.y=-1;

        break;

    case "ArrowDown":
    console.log("arrowDown");
    inputDir.x=0;
    inputDir.y=1;
    break;


    case "ArrowLeft":
    inputDir.x=-1;
    inputDir.y=0;
    console.log("arrowLeft");
    break;


    case "ArrowRight":
    inputDir.x=1;
    inputDir.y=0;    
    console.log("arrowRight");
    break;
    }




});


 window.requestAnimationFrame(main);