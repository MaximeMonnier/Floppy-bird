const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = './media/flappy-bird-set.png';

// general settings

let gamePlaying = false;
const gravity =.5;
const speed = 6.2;
const size = [51, 36];
const jump = -11.5;
const cTenth = (canvas.width / 10);

let index = 0,
    bestScore = 0,
    currentScore = 0,
    pipes = [],
    flight,
    flyHeight;

// fucntion animation
const render = () => {
    index++;
    // animation du background
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, - ((index* (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height);
    // Création d'un decuxieme background pour fluidifier l'annimation
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, - ((index* (speed / 2)) % canvas.width), 0, canvas.width, canvas.height);

    //découpe et replacement de l'image de loiseau qui crée lanimation utilisation des paramètre plus haut
    ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, ((canvas.width /2) - size [0] / 2), flyHeight, ...size);
    flyHeight = (canvas.height / 2) - (size[1] / 2);
    // methode pour écrie dans la canvas
    ctx.fillText(`meilleur score : ${bestScore}`
    , 55, 245);
    ctx.fillText('Cliquer pour jouer', 48, 535);
    ctx.font = "bold 30px courier";
    // fait jouer en boucle la focntion render
    window.requestAnimationFrame(render);
}
// au chargement de l'image
img.onload = render;    