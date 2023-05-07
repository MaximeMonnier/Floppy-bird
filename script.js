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

    //découpe et replacement de l'image e qui crée lanimation utilisation des paramètre plus haut
    ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, ((canvas.width /2) - size [0] / 2), flyHeight, ...size);
    flyHeight = (canvas.height / 2) - (size[1] / 2);

    // fait jouer en boucle la focntion render
    window.requestAnimationFrame(render);
}
// au chargement de l'image
img.onload = render;    