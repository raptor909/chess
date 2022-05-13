const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

const updateBoardSize = () => {
    if (window.innerWidth < window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth;
    } else {
        canvas.width = window.innerHeight;
        canvas.height = window.innerHeight;
    }
}

const drawRect = (x=0, y=0, width=10, height=10, color='#fff') => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

const drawText = (text='NO TEXT GIVEN', x=0, y=0, color='#fff') => {
    ctx.fillStyle = color;
    ctx.font = '30px Arial';
    ctx.fillText(text, x, y);
}


const boardSquares = 8; // 8x8 board
const whiteSquareColor = '#fff';
const blackSquareColor = '#000';

const board = [];

const init = () => {
    for (let x = 0; x < boardSquares; x++) {
        board[x] = [];
        for (let y = 0; y < boardSquares; y++) {

            board[x][y] = {
                x: x,
                y: y,
                color: (x + y) % 2 === 0 ? whiteSquareColor : blackSquareColor,
                piece: null
            }

            drawRect(x * canvas.width / boardSquares, y * canvas.height / boardSquares, canvas.width / boardSquares, canvas.height / boardSquares, board[x][y].color);

            // draw peices
            if (board[x][y].piece) {
                drawText(board[x][y].piece.type, x * canvas.width / boardSquares, y * canvas.height / boardSquares, board[x][y].piece.color);
            }
        }
    }
}

function Piece(type, color) {
    this.type = type;
    this.color = color;
    this.image = new Image();
    this.image.src = `./img/${this.color}/${this.type}.svg`;
    ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
}

const game = () => {
    updateBoardSize();
    init();
    board[0][0].piece = new Piece('rook', 'white');
}

setInterval(game, 1000/60);