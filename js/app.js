
let tetris = document.querySelector('.tetris__main');

//Заполним поле ячейками
for (let i = 1; i < 199; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    tetris.appendChild(cell);
}




