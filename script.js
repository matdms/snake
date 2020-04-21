//mon script


//creation des cases dans le conteneur de classe "sketch"
//nombre de cases
let nbre = 30;

let grille = document.querySelector('.snake');
let newDiv = document.createElement('div');

//initialisation
for (i=0; i<nbre*nbre; i++) {
    grille = document.querySelector('.snake');
    newDiv = document.createElement('div');
    newDiv.classList.add('case');
    newDiv.setAttribute('id', (i+1))
    //newDiv.textContent = i+1;
    grille.append(newDiv);

    //eventlistener pour chaque case créée
    //on peut remplacer click par mouseover
    /*newDiv.addEventListener('mouseover', function(e) {
        //console.log(e.target.id);
        e.target.style.backgroundColor='orange';
    });*/
}
let snake = [460, 459, 458, 457, 456, 455];
let apple = 260;
let sens = 2;
let sensValid = 2; // to make sure direction is actually set in time interval
drawSnake();
document.getElementById(apple).style.backgroundColor='OrangeRed';
let game = 0; //jeu stoppé
let speed = [500, 400, 300, 200, 100, 50]; //fonction du level
let level = 2;


//Reset grid
/*let reset = document.querySelector('.btn');
reset. addEventListener('click', function(e) {
    //alert('Reset grid');
    for (i=0; i<nbre*nbre; i++) {
        let monId = (i+1);
        monDiv = document.getElementById(monId);
        monDiv.style.backgroundColor='aliceblue';
    }
    snake = [460];
    apple = 260;
    sens = 2;
    game = 0;
    document.getElementById(snake[0]).style.backgroundColor='green';
    document.getElementById(apple).style.backgroundColor='red';
});*/


// the SNAKE

//FUNCTIONS

function moveSnake(sens) {
    //erase former snake
    /*for (i=0; i<snake.length; i++) {
        document.getElementById(snake[i]).style.backgroundColor='aliceblue';
    }*/
    eraseSnake();
    
    //generate new snake
    let a = snake[0];   //copie de la tete du snake
    snake.pop();        //suppression de la queue
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
    /*for (i=0; i<snake.length; i++) {
        document.getElementById(snake[i]).style.backgroundColor='DarkSeaGreen';
    }*/

    sensValid = sens;
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

function startGame() {
    setInterval(function(){
        /*let dice = getRandomInt(3);
        switch(dice) {
            case 1:
                if(sens == 1) {
                    sens = 4;
                } else {
                    sens -= 1;
                }
                break;
            case 2:
                break;
            case 3:
                if(sens == 4) {
                    sens = 1;
                } else {
                    sens += 1;
                }
                break;
        }*/
        //console.log(sens);
        moveSnake(sens);
    }, speed[level]);
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
    console.log(touche);
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



// MAIN


