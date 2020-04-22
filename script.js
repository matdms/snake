/* 
        SNAKE - The Game
        by matdms
        April '20
*/

// TODO
/*
    - le setInterval ne s'interrompt pas à la fin de partie,
    du coup au reset, la vitesse augmente !!!


*/

// creation des cases dans le conteneur de classe "snake"
// nombre de cases
let nbre = 30;
let grille = document.querySelector('.snake');
let newDiv = document.createElement('div');
let cases = [];

for (i=0; i<nbre*nbre; i++) {   // grid creation
    grille = document.querySelector('.snake');
    newDiv = document.createElement('div');
    newDiv.classList.add('case');
    newDiv.setAttribute('id', (i+1))
    grille.append(newDiv);
    cases.push(i+1);
}

// INIT VAR
let snake = [460]; 
let apple = 260;   
let sens = 0;    
let sensValid = 0; 
let game = 0; 
let speed = []; 
let level = 0; 
let score = 0;
let longueur = 0;
let finDePartie = "";
let snakeBody = [];
var t; //le timer pour la vitesse

// RESET GAME
function resetSnake() {
    eraseSnake();
    eraseApple();
    snake = [460]; // [460, 459, 458, 457, 456, 455] // initial snake
    apple = 260;    // 1st apple position
    sens = 2;       // initial direction
    sensValid = 2;  // trick to make sure direction is actually set in time interval
    game = 0; //jeu stoppé
    speed = [500, 400, 300, 200, 100, 50, 30]; //fonction du level
    level = 5;  // on utilise speed[level-1]
    score = 0;
    longueur = snake.length;
    finDePartie = ""; //"-GAME OVER-   "
    snakeBody = [];
    drawSnake();
    drawApple();
    updateScore();
}

resetSnake();

//FUNCTIONS

function updateScore() {
    longueur = snake.length;
    document.getElementById("score").textContent = finDePartie + "Level: " + level + " // Score: " + score + " // Size: " + longueur;
}

function moveSnake(sens, grow) {
    
    if(game == 1) {

    //erase former snake
    eraseSnake();
    
    //generate new snake
    let a = snake[0];   //copie de la tete du snake
    if(grow == 0) {
        snake.pop();
    }        //suppression de la queue
    switch(sens) {      //insertion de la nouvelle tete + décalage de tout le corps
        case 1:
            if( a <= nbre ) {
                snake.unshift(nbre*(nbre-1) + a);
            } else {
                snake.unshift(a - nbre);
            }
            break;
        case 2:
            if( a%nbre == 0 ) {
                snake.unshift(a - (nbre - 1));
            } else {
                snake.unshift(a + 1);
            }
            break;
        case 3:
            if( a > nbre*(nbre-1) ) {
                if(a == nbre*nbre) {
                    snake.unshift(nbre);
                } else {
                    snake.unshift(a%nbre);
                }
            } else {
                snake.unshift(a + nbre);
            }
            break;
        case 4:
            if( a%nbre == 1 ) {
                snake.unshift(a + nbre - 1);
            } else {
                snake.unshift(a - 1);
            }
            break;
    }

    // check for snake bite
    for(i=0;i<snake.length-1;i++){
        snakeBody[i] = snake[i+1];
    }
    if( snakeBody.includes(snake[0]) ) {
        //GAME OVER
        finDePartie = "-GAME OVER-   "
        game = 2;
        clearTimeout(t);
    }

    // check if eats apple
    if(snake[0] == apple) {
        score += 10 * level;
        newApple();
        snakeGrow();
    }

    // check if hits wall
    
    
    //draw new snake
    drawSnake();
    sensValid = sens;
    
    // maj du score et du level;
    updateScore();

    }

}

function drawSnake() {
    document.getElementById(snake[0]).style.backgroundColor='OliveDrab';
    for (i=1; i<snake.length; i++) {
        document.getElementById(snake[i]).style.backgroundColor='DarkSeaGreen';
    }
}

function eraseSnake() {
    for (i=0; i<snake.length; i++) {
        document.getElementById(snake[i]).style.backgroundColor='aliceblue';
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))+1;
}

function newApple() {
    apple = findRandomSpot();
    drawApple();
}

function drawApple() {
    document.getElementById(apple).style.backgroundColor='OrangeRed';
}

function eraseApple() {
    document.getElementById(apple).style.backgroundColor='aliceblue';
}

function findRandomSpot() {
    let spot = 0;
    let availableSpots = cases.filter(x => !snake.includes(x));
    let a = getRandomInt(availableSpots.length);
    spot = availableSpots[a-1];
    return spot;
}

function snakeGrow() {
    // ajoute un élément au snake
    moveSnake(sensValid, 1);
    //console.table(snake);
}

function startGame() {
    t = setInterval(function(){
        moveSnake(sens,0);
    }, speed[level-1]);
}

// EVENT LISTENERS
/*
arrow left	37
arrow up	38
arrow right	39
arrow down	40
space       32
*/

/*
Sens:
            1
        4   x   2
            3
*/

document.addEventListener('keydown', (event) => {
    let touche = event.keyCode;
    //console.log(touche);
    switch(touche) {
        case 32:
            if(game == 0) {
                game = 1;
                startGame();
            }
            if(game == 2) {
                game = 0;
                resetSnake();
            }
            break;
        case 37:
            if(sensValid != 2) {sens = 4};
            break;
        case 38:
            if(sensValid != 3) {sens = 1};
            break;
        case 39:
            if(sensValid != 4) {sens = 2};
            break;
        case 40:
            if(sensValid != 1) {sens = 3};
            break;
    }
});

