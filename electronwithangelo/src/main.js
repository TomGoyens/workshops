var blue = document.querySelector('.blue');
var red = document.querySelector('.red');
var yellow = document.querySelector('.yellow');
var green = document.querySelector('.green');

var count = 0;
var countBox = document.querySelector('.count');
countBox.innerHTML = count;
var serie = [];
var log = [];

var colors = [blue, red, yellow, green];

for (let i=0; i<colors.length; i++){
    colors[i].addEventListener("click", logClick);
}
function logClick(ev){
    if (ev.target.classList[1] == 'blue'){
        log.push(0);
    } else if (ev.target.classList[1] == 'red'){
        log.push(1);
    } else if (ev.target.classList[1] == 'yellow'){
        log.push(2);
    } else{
        log.push(3);
    }
    if (log[log.length-1] != serie[log.length-1]){
        count = "game over";
        for (let i=0; i<colors.length; i++){
            colors[i].removeEventListener("click", logClick);
            colors[i].classList.remove('hoverable');
        }
        countBox.innerHTML = count;
    }
    if (log.length == serie.length){
        setTimeout(displaySerie, 200);
    }
}

function brighten(target){
    target.classList.add("brighter");
    setTimeout(function(){
        target.classList.remove("brighter");
    }, 500);
}

function randomPick(){
    return Math.floor(Math.random()*4)
}

function displaySerie(){
    log = [];
    for (let i=0; i<colors.length; i++){
        colors[i].removeEventListener("click", logClick);
        colors[i].classList.remove('hoverable');
    }
    count++;
    countBox.innerHTML = count;
    serie.push(randomPick());
    let i=0;
    let display = setInterval(function(){
        brighten(colors[serie[i]]);
        i++;
        if (i == serie.length){
            clearInterval(display);
            for (let i=0; i<colors.length; i++){
                setTimeout(function(){
                    colors[i].addEventListener("click", logClick);
                    colors[i].classList.add('hoverable');
                }, 500);
            }
        }
    }, 750);
}
displaySerie();

let restart = document.getElementById('restart');

restart.addEventListener('click', restartGame);
function restartGame(){
    serie = [];
    count = 0;
    displaySerie();
}