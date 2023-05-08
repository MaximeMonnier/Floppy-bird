const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = './media/flappy-bird-set.png';

// general settings
let gamePlaying = false;
const gravity = 1;
const speed = 10;
const size = [51, 36];
const jump = -15;
const cTenth = (canvas.width / 10);

//pipe settings
const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () => (Math.random() * ((canvas.height - (pipeGap + pipeWidth)) - pipeWidth)) + pipeWidth;


let index = 0,
    bestScore = 0,
    currentScore = 0,
    pipes = [],
    flight,
    flyHeight;

// function set-up
const setup = () => {
    currentScore = 0;
    flight = jump;
    flyHeight = (canvas.height / 2) - (size[1] / 2);

    //génère les trois premiers tuyaux 
    pipes = Array(3).fill().map((a, i) => [canvas.width + (i * (pipeGap + pipeWidth)), pipeLoc()]);
} 

// fucntion animation
const render = () => {
    index++;

    // animation du background
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, - ((index* (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height);
    // Création d'un deuxieme background pour fluidifier l'annimation de l'arrière plan
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, - ((index* (speed / 2)) % canvas.width), 0, canvas.width, canvas.height);

    if (gamePlaying) {
        // On positione l'oiseau a 1/10 du bord
        ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, cTenth, flyHeight, ...size);
        // On donne la graviter a flight
        flight += gravity;
        // on donne une valeur a flyHeight (quel ets la valeur la plus basse) entre la valeur de l'oiseu et celle du canvas ce qui fait descendre l'oiseau et evite surout que l'oiseau disparaisse au moment de toucher le sol
        flyHeight = Math.min(flyHeight + flight, canvas.height - size[1])
    }else {
        //animation de l'oiseau
        //découpe et replacement de l'image de loiseau qui crée lanimation utilisation des paramètre plus haut
        ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, ((canvas.width /2) - size [0] / 2), flyHeight, ...size);
        flyHeight = (canvas.height / 2) - (size[1] / 2);
        
        // methode pour écrie dans la canvas
        ctx.fillText(`meilleur score : ${bestScore}`
        , 55, 245);
        ctx.fillText('Cliquer pour jouer', 48, 535);
        ctx.font = "bold 30px courier";
    }

    // pipe dispay
    if (gamePlaying) {
        pipes.map(pipe => {
            pipe[0] -= speed;

            //top pipe
            ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe[0], 0,pipeWidth,pipe[1]);
            // bottom pipe
            ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGap, pipe[0], pipe[1] + pipeGap , pipeWidth, canvas.height - pipe[1] + pipeGap);

            if (pipe[0] <= -pipeWidth) {
                currentScore++;
                bestScore = Math.max(bestScore, currentScore);

                //remove pipe + create new one
                pipes = [...pipes.slice(1), [pipes[pipes.length-1][0] + pipeGap + pipeWidth, pipeLoc()]];
                console.log(pipes);

            }
            //if hit the pipe, end
            if ([
                pipe[0] <= cTenth + size[0],
                pipe[0] + pipeWidth >= cTenth,
                pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1]
            ].every(elem => elem)) {
                gamePlaying = false;
                setup();
            }
        })
    }

    document.getElementById('bestScore').innerHTML = `Meilleur : ${bestScore}`;
    // document.getElementById('currentScore').innerHTML = `Actuel : ${currentScore}`;
    // fait jouer en boucle la focntion render
    window.requestAnimationFrame(render);
}
// Quand on relande la page
setup();
// au chargement de l'image
img.onload = render;
// Lance la partie
document.addEventListener('click', () => gamePlaying = true); 
// fait sauter l'oiseau
window.onclick = () => flight = jump;   