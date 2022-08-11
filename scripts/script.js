const canvas = document.getElementById('canvas');
const canvasTop = canvas.offsetTop;
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');
const toolboxEl = document.getElementById('toolbox');

const ctx = canvas.getContext('2d');

let size = 10;
let isPressed = false;
let color = 'black';
let x;
let y;

window.addEventListener('load', () => {
	setCanvasSize();
});

window.addEventListener('resize', () => {
	setCanvasSize();
});

document.ontouchmove = function (e) {
	e.preventDefault();
};

canvas.addEventListener('mousedown', (e) => {
	isPressed = true;

	x = e.offsetX;
	y = e.offsetY;
});

canvas.addEventListener('touchstart', (e) => {
	e.preventDefault();
	isPressed = true;

	x = e.touches[0].clientX;
	y = e.touches[0].clientY + size;

	console.log(x, y);
});

canvas.addEventListener('mouseup', (e) => {
	isPressed = false;

	x = undefined;
	y = undefined;
});

canvas.addEventListener('touchend', (e) => {
	e.preventDefault();
	isPressed = false;

	x = undefined;
	y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
	if (isPressed) {
		const x2 = e.offsetX;
		const y2 = e.offsetY;

		drawCircle(x2, y2);
		drawLine(x, y, x2, y2);

		x = x2;
		y = y2;
	}
});

canvas.addEventListener('touchmove', (e) => {
	if (isPressed) {
		const x2 = e.touches[0].clientX;
		const y2 = e.touches[0].clientY + size;

		drawCircle(x2, y2);
		drawLine(x, y, x2, y2);

		x = x2;
		y = y2;
	}
});

// Set Canvas Size
function setCanvasSize() {
	const width = window.innerWidth;
	const height = window.innerHeight - 90;

	canvas.width = width;
	canvas.height = height;

	toolboxEl.style.width = width + 4 + 'px';
}

// Create Drawing
function drawCircle(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, size, 0, Math.PI * 2, true);
	ctx.fillStyle = color;
	ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = color;
	ctx.lineWidth = size * 2;
	ctx.stroke();
}

// Drawing Controls
function updateSizeOnScreen() {
	sizeEl.textContent = size;
}

// Brush Size
increaseBtn.addEventListener('click', () => {
	if (size < 50) {
		size += 5;
		updateSizeOnScreen();
	}
});

decreaseBtn.addEventListener('click', () => {
	if (size > 5) {
		size -= 5;
		updateSizeOnScreen();
	}
});

// Set Color
colorEl.addEventListener('change', (e) => {
	color = e.target.value;
});

// Clear Canvas
clearEl.addEventListener('click', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.addEventListener('dblclick', (event) => {
	event.preventDefault();
	event.stopPropagation();
});
