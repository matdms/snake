// SNAKE - The Game
// by matdms
// April '20

// TODO
/*
    - Créer une fonction drawApple
    - Utilier getRandomInt pour la positionner
    - le serpent se mord
    - le serpent mord la pomme
*/

//creation des cases dans le conteneur de classe "snake"
//nombre de cases
let nbre = 30;

let grille = document.querySelector('.snake');
let newDiv = document.createElement('div');
let cases = [];

// INIT

for (i=0; i<nbre*nbre; i++) {   // grid creation
    grille = document.querySelector('.snake');
    newDiv = document.createElement('div');
    newDiv.classList.add('case');
    newDiv.setAttribute('id', (i+1))
    grille.append(newDiv);
    cases.push(i+1);
}

//console.log(cases);

let snake = [460]; // [460, 459, 458, 457, 456, 455] // initial snake
let apple = 260;    // 1st apple position
let sens = 2;       // initial direction
let sensValid = 2;  // trick to make sure direction is actually set in time interval
drawSnake();
drawApple();
//document.getElementById(apple).style.backgroundColor='OrangeRed';   //
let game = 0; //jeu stoppé
let speed = [500, 400, 300, 200, 100, 50, 30]; //fonction du level
let level = 5;  // on utilise speed[level-1]
let score = 0;
let longueur = snake.length;
updateScore();



//FUNCTIONS

function updateScore() {
    longueur = snake.length;
    document.getElementById("score").textContent = "Level: " + level + " // Score: " + score + " // Size: " + longueur;
}

function moveSnake(sens, grow) {
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
                snake.unshift(a%nbre);
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

    //draw new snake
    drawSnake();
    sensValid = sens;

    // check for snake bite


    // check if eats apple
    if(snake[0] == apple) {
        score += 10 * level;
        newApple();
        snakeGrow();
    }


    // check if hits wall

    // maj du score et du level;
    updateScore();
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
    setInterval(function(){
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

