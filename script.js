const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "./media/flappy-bird-set.png";
const actuel = document.getElementById("currentScore");

// general settings
let gamePlaying = false;
const gravity = 0.8;
let speed = 8;
const size = [51, 36];
const jump = -12;
const cTenth = canvas.width / 10;

//pipe settings
const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () =>
  Math.random() * (canvas.height - (pipeGap + pipeWidth) - pipeWidth) +
  pipeWidth;

let index = 0,
  bestScore = 0,
  currentScore = 0,
  pipes = [],
  flight,
  flyHeight;

// function set-up
const setup = () => {
  currentScore = 0;
  speed = 8;
  flight = jump;
  flyHeight = canvas.height / 2 - size[1] / 2;

  //generates the first three pipes
  pipes = Array(3)
    .fill()
    .map((a, i) => [canvas.width + i * (pipeGap + pipeWidth), pipeLoc()]);
};

// fucntion animation
const render = () => {
  index++;

  // animation du background
  ctx.drawImage(
    img,
    0,
    0,
    canvas.width,
    canvas.height,
    -((index * (speed / 2)) % canvas.width) + canvas.width,
    0,
    canvas.width,
    canvas.height
  );
  // Creation of a second background to smooth background annimation
  ctx.drawImage(
    img,
    0,
    0,
    canvas.width,
    canvas.height,
    -((index * (speed / 2)) % canvas.width),
    0,
    canvas.width,
    canvas.height
  );

  if (gamePlaying) {
    // On positione l'oiseau a 1/10 du bord
    ctx.drawImage(
      img,
      432,
      Math.floor((index % 9) / 3) * size[1],
      ...size,
      cTenth,
      flyHeight,
      ...size
    );
    // give the gravity to flight
    flight += gravity;
    // a flyHeight (which is the lowest value) is given between the value of the bird and that of the canvas, which causes the bird to descend and prevents the bird from disappearing when it touches the ground
    flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);
  } else {
    //animation of bird
    //cut and replace the bird form the picture
    ctx.drawImage(
      img,
      432,
      Math.floor((index % 9) / 3) * size[1],
      ...size,
      canvas.width / 2 - size[0] / 2,
      flyHeight,
      ...size
    );
    flyHeight = canvas.height / 2 - size[1] / 2;

    // methode pour écrie dans la canvas
    ctx.fillText(`meilleur score : ${bestScore}`, 55, 245);
    ctx.fillText("Cliquer pour jouer", 48, 535);
    ctx.font = "bold 30px courier";
  }

  // pipe dispay
  if (gamePlaying) {
    pipes.map((pipe) => {
      pipe[0] -= speed;

      //top pipe
      ctx.drawImage(
        img,
        432,
        588 - pipe[1],
        pipeWidth,
        pipe[1],
        pipe[0],
        0,
        pipeWidth,
        pipe[1]
      );
      // bottom pipe
      ctx.drawImage(
        img,
        432 + pipeWidth,
        108,
        pipeWidth,
        canvas.height - pipe[1] + pipeGap,
        pipe[0],
        pipe[1] + pipeGap,
        pipeWidth,
        canvas.height - pipe[1] + pipeGap
      );

      if (pipe[0] <= -pipeWidth) {
        currentScore++;
        bestScore = Math.max(bestScore, currentScore);

        //remove pipe + create new one
        pipes = [
          ...pipes.slice(1),
          [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()],
        ];
      }
      //if hit the pipe, end
      if (
        [
          pipe[0] <= cTenth + size[0],
          pipe[0] + pipeWidth >= cTenth,
          pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1],
        ].every((elem) => elem)
      ) {
        gamePlaying = false;
        setup();
      }
    });
  }

  document.getElementById("bestScore").innerHTML = `Meilleur : ${bestScore}`;
  actuel.innerHTML = `Actuel : ${currentScore}`;

  // add dificulty
  if (currentScore >= 5) {
    speed = 10;
  }
  if (currentScore >= 10) {
    speed = 12;
  }
  if (currentScore >= 15) {
    speed = 14;
  }
  if (currentScore >= 20) {
    speed = 16;
  }
  if (currentScore >= 25) {
    speed = 18;
  }
  if (currentScore >= 30) {
    speed = 20;
  }

  // loop fucntion render
  window.requestAnimationFrame(render);
};
// reload page
setup();
// at change of picture
img.onload = render;
// play game
document.addEventListener("click", () => (gamePlaying = true));
// jump bird
window.onclick = () => (flight = jump);
