const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


const window_height = "300";
const window_width = "500";


canvas.height = window_height;
canvas.width = window_width;

canvas.style.backgroundColor = "#b7f7ed";

class Circle {
    constructor(x, y, radius, color, text, backcolor, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.backcolor = backcolor;
        this.speed = speed;

        this.dx = 1 * this.speed; //son la velocidad
        this.dy = 1 * this.speed;
    }
    draw(context) {
        //Rellena el objeto
        context.beginPath();
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.backcolor;
        context.fill();

        //Dibuja la línea del objeto
        context.lineWidth = 5;
        context.strokeStyle = this.color;
        context.stroke();

        //Dibuja el texto al centro del objeto
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "bold 20px cursive";
        context.fillStyle = "white";
        context.fillText(this.text, this.posX, this.posY);

        context.closePath();

    }

    update(context) {//update es un metodo que permite mover el objeto
        this.draw(context);

        // Actualiza las coordenadas en el HTML
        //document.getElementById('coordenadas').innerText = `X: ${Math.floor(this.posX)}, Y: ${Math.floor(this.posY)}`;

        //Si el circulo supera el margen derecho entonces se mueve a la izquierda
        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }

        //Si el circulo supera el margen superior entonces se mueve a abajo
        if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.posX += this.dx; //refresca las posiciones del objeto 
        this.posY += this.dy;
    }
}

/* let randomRadius = Math.floor(Math.random() * 60 + 20);
let randomX = Math.random() * window_width;
let randomY = Math.random() * window_height;
let randomBackcolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
let randomStrokecolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";

//valida que la posicion x o y siempre comienze dentro del canvas
randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, "1", randomBackcolor, 2);
miCirculo.draw(ctx);

let updateCircle = function () {
    requestAnimationFrame(updateCircle); //metodo que permite estar renderizando constantemente el escenario
    ctx.clearRect(0, 0, window_width, window_height);
    miCirculo.update(ctx);
};

updateCircle();  */

const nCircles = 10;

let circles = [];

for (let i = 0; i < nCircles; i++) {
  let randomRadius = Math.floor(Math.random() * 30 + 20);
  let randomX = Math.random() * window_width;
  let randomY = Math.random() * window_height;
  let randomBackcolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
  let randomStrokecolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
  let randomSpeed = Math.random() * 3 + 1;

  randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
  randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

  let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i+1, randomBackcolor, randomSpeed);
  circles.push(miCirculo);
}

let updateCircle = function () {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);
    circles.forEach((circle) => {
        circle.update(ctx);
    });
    updateCoordinates();
};

let updateCoordinates = function () {
    const tbody = document.querySelector('#coordenadas2 tbody');
    tbody.innerHTML = '';
    circles.forEach(circle => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${circle.text}</td>
            <td>${Math.floor(circle.posX)}</td>
            <td>${Math.floor(circle.posY)}</td>
        `;
        tbody.appendChild(row);
    });
};
updateCircle(); 