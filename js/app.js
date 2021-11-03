let start = document.querySelector('.start')
let start__bg = document.querySelector('.start__bg')
let time = 0;

// Выбор уровня сложности
start.addEventListener('click', function (elem) {

    if (elem.target.classList.contains('01')) {

        time = 1000;

    } else if (elem.target.classList.contains('02')) {
        time = 500;


    } else if (elem.target.classList.contains('03')) {
        time = 300;

    }
    //Скорость падения
    let interval = setInterval(() => {
        move();
    }, time);

    start.style.display = 'none';
    start__bg.style.display = 'none';
    create();



})


let tetris = document.querySelector('.tetris__main');

//Заполним поле ячейками
for (let i = 1; i < 199; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    tetris.appendChild(cell);
}

let cell = document.querySelectorAll('.cell')
let i = 0;
for (let y = 18; y > 0; y--) {
    for (let x = 1; x < 12; x++) {
        cell[i].setAttribute('x', x);
        cell[i].setAttribute('y', y);
        i++;
    }
}

//Начальные координаты падения
let x = 5, y = 15;


let array = [

    //Прямая фигура 
    [
        [0, 1],
        [0, 2],
        [0, 3],
        //Поворот на 90 
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2],
        ],
        //Поворот на 180
        [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2],
        ],
        //Поворот на 270 
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2],
        ],
        //Поворот на 360
        [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2],

        ]

    ],

    //Квадрат
    [
        [1, 0],
        [0, 1],
        [1, 1],
        //Поворот на 90 
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        //Поворот на 180
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        //Поворот на 270 
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        //Поворот на 360
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ]
    ],


    //L - revert
    [
        [1, 0],
        [1, 1],
        [1, 2],
        //Поворот на 90 
        [
            [0, 0],
            [0, 0],
            [1, -1],
            [-1, -1],
        ],
        //Поворот на 180
        [
            [0, -1],
            [-1, 0],
            [-2, 1],
            [1, 0],
        ],
        //Поворот на 270 
        [
            [2, 0],
            [0, 0],
            [1, -1],
            [1, -1],
        ],
        //Поворот на 360
        [
            [-2, 0],
            [1, -1],
            [0, 0],
            [-1, 1],
        ],
    ],



    //L
    [
        [1, 0],
        [0, 1],
        [0, 2],
        //Поворот на 90 
        [
            [0, 0],
            [-1, 1],
            [1, 0],
            [2, -1],
        ],
        //Поворот на 180
        [
            [1, -1],
            [1, -1],
            [-1, 0],
            [-1, 0],
        ],
        //Поворот на 270 
        [
            [-1, 0],
            [0, -1],
            [2, -2],
            [1, -1],
        ],
        //Поворот на 360
        [
            [0, -1],
            [0, -1],
            [-2, 0],
            [-2, 0],
        ],
    ],

    // молния правая

    [
        [1, 0],
        [-1, 1],
        [0, 1],
        //Поворот на 90 
        [
            [0, -1],
            [-1, 0],
            [2, -1],
            [1, 0],
        ],
        //Поворот на 180
        [
            [0, 0],
            [1, -1],
            [-2, 0],
            [-1, -1],
        ],
        //Поворот на 270 
        [
            [0, -1],
            [-1, 0],
            [2, -1],
            [1, 0],
        ],
        //Поворот на 360
        [
            [0, 0],
            [1, -1],
            [-2, 0],
            [-1, -1],
        ],
    ],

    // молния левая

    [
        [1, 0],
        [1, 1],
        [2, 1],
        //Поворот на 90 
        [
            [2, -1],
            [0, 0],
            [1, -1],
            [-1, 0],
        ],
        //Поворот на 180
        [
            [-2, 0],
            [0, -1],
            [-1, 0],
            [1, -1],
        ],
        //Поворот на 270 
        [
            [2, -1],
            [0, 0],
            [1, -1],
            [-1, 0],
        ],
        //Поворот на 360
        [
            [-2, 0],
            [0, -1],
            [-1, 0],
            [1, -1],
        ],
    ],
    //фигура призовые места
    [
        [1, 0],
        [2, 0],
        [1, 1],
        //Поворот на 90 
        [
            [1, -1],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        //Поворот на 180
        [
            [0, 0],
            [-1, 0],
            [-1, 0],
            [1, -1],
        ],
        //Поворот на 270 
        [
            [1, -1],
            [1, -1],
            [1, -1],
            [0, 0],
        ],
        //Поворот на 360
        [
            [-2, 0],
            [0, -1],
            [0, -1],
            [-1, -1],

        ]

    ],
]

let currentFigure = 0;
let figureBody = 0;
let rotate = 1;

function create() {
    // Выбор случайной фигуры
    function getRandom() {
        return Math.round(Math.random() * (array.length - 1))
    }


    rotate = 1;
    currentFigure = getRandom();

    figureBody = [
        document.querySelector(`[x = "${x}"][y = "${y}"]`),
        document.querySelector(`[x = "${x + array[currentFigure][0][0]}"][y = "${y + array[currentFigure][0][1]}"]`),
        document.querySelector(`[x = "${x + array[currentFigure][1][0]}"][y = "${y + array[currentFigure][1][1]}"]`),
        document.querySelector(`[x = "${x + array[currentFigure][2][0]}"][y = "${y + array[currentFigure][2][1]}"]`),

    ]

    for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.add('cell_bg');
    }
}
//Очки за игру
let score = 0;
//Рекорд
let record = 0;
(localStorage.record) ? document.querySelector('.info__record').innerHTML = localStorage.record :
    document.querySelector('.info__record').innerHTML = 0;


//Падение фигуры
function move() {
    let flagMove = true;

    let coordinates = [
        [figureBody[0].getAttribute('x'), figureBody[0].getAttribute('y')],
        [figureBody[1].getAttribute('x'), figureBody[1].getAttribute('y')],
        [figureBody[2].getAttribute('x'), figureBody[2].getAttribute('y')],
        [figureBody[3].getAttribute('x'), figureBody[3].getAttribute('y')],
    ];
    for (let i = 0; i < coordinates.length; i++) {
        if (coordinates[i][1] == 1 || document.querySelector(`[x = "${coordinates[i][0]}"][y = "${coordinates[i][1] - 1}"]`).classList.contains('complete')) {
            flagMove = false;
            break;
        }
    }
    if (flagMove) {
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove('cell_bg');
        }
        figureBody = [
            document.querySelector(`[x = "${coordinates[0][0]}"][y = "${coordinates[0][1] - 1}"]`),
            document.querySelector(`[x = "${coordinates[1][0]}"][y = "${coordinates[1][1] - 1}"]`),
            document.querySelector(`[x = "${coordinates[2][0]}"][y = "${coordinates[2][1] - 1}"]`),
            document.querySelector(`[x = "${coordinates[3][0]}"][y = "${coordinates[3][1] - 1}"]`),

        ];
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('cell_bg');

        }
    } else {
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove('cell_bg');
            figureBody[i].classList.add('complete');
        }
        // Удаление ряда
        for (let i = 1; i < 15; i++) {
            let count = 0;
            for (let k = 1; k < 12; k++) {
                if (document.querySelector(`[x= "${k}"][y="${i}"]`).classList.contains('complete')) {
                    count++;
                    if (count == 11) {
                        score += 11;
                        record = score;

                        //localStorage.record = record;
                        if (localStorage.record < score || localStorage.record === undefined) {
                            localStorage.record = score;
                        }

                        document.querySelector('.info__record').innerHTML = localStorage.record;

                        document.querySelector('.info__total').innerHTML = score;
                        for (let m = 1; m < 12; m++) {
                            document.querySelector(`[x = "${m}"][y = "${i}"]`).classList.remove('complete');
                        }
                        let complete = document.querySelectorAll('.complete')
                        let newSet = [];
                        for (let s = 0; s < complete.length; s++) {
                            let completeCoordinate = [complete[s].getAttribute('x'), complete[s].getAttribute('y')]
                            if (completeCoordinate[1] > i) {
                                complete[s].classList.remove('complete');
                                newSet.push(document.querySelector(`[x = "${completeCoordinate[0]}"][y = "${completeCoordinate[1] - 1}"]`));

                            }
                        }
                        for (let a = 0; a < newSet.length; a++) {
                            newSet[a].classList.add('complete');

                        }
                        i--;
                    }
                }
            }

        }

        create();
    }

}


let flag = true;
window.addEventListener('keydown', function (e) {
    let coordinates1 = [figureBody[0].getAttribute('x'), figureBody[0].getAttribute('y')];
    let coordinates2 = [figureBody[1].getAttribute('x'), figureBody[1].getAttribute('y')];
    let coordinates3 = [figureBody[2].getAttribute('x'), figureBody[2].getAttribute('y')];
    let coordinates4 = [figureBody[3].getAttribute('x'), figureBody[3].getAttribute('y')];

    function newState(a) {

        flag = true;

        let figureNew = [
            document.querySelector(`[x = "${+coordinates1[0] + a}"][y = "${coordinates1[1]}"]`),
            document.querySelector(`[x = "${+coordinates2[0] + a}"][y = "${coordinates2[1]}"]`),
            document.querySelector(`[x = "${+coordinates3[0] + a}"][y = "${coordinates3[1]}"]`),
            document.querySelector(`[x = "${+coordinates4[0] + a}"][y = "${coordinates4[1]}"]`),

        ];
        for (let i = 0; i < figureNew.length; i++) {
            if (!figureNew[i] || figureNew[i].classList.contains('complete')) {
                flag = false;
            }
        }


        if (flag) {
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('cell_bg')
            }
        }
        figureBody = figureNew;
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('cell_bg');

        }



    }

    if (e.keyCode == 37) {
        newState(-1);
    } else if (e.keyCode == 39) {
        newState(1);
    } else if (e.keyCode == 40) {
        move();
    } else if (e.keyCode == 38) {

        flag = true;

        let figureNew = [
            document.querySelector(`[x = "${+coordinates1[0] + array[currentFigure][rotate + 2][0][0]}"][y = "${+coordinates1[1] + array[currentFigure][rotate + 2][0][1]}"]`),
            document.querySelector(`[x = "${+coordinates2[0] + array[currentFigure][rotate + 2][1][0]}"][y = "${+coordinates2[1] + array[currentFigure][rotate + 2][1][1]}"]`),
            document.querySelector(`[x = "${+coordinates3[0] + array[currentFigure][rotate + 2][2][0]}"][y = "${+coordinates3[1] + array[currentFigure][rotate + 2][2][1]}"]`),
            document.querySelector(`[x = "${+coordinates4[0] + array[currentFigure][rotate + 2][3][0]}"][y = "${+coordinates4[1] + array[currentFigure][rotate + 2][3][1]}"]`),

        ];
        for (let i = 0; i < figureNew.length; i++) {
            if (!figureNew[i] || figureNew[i].classList.contains('complete')) {
                flag = false;
            }
        }

        if (flag) {
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('cell_bg')
            }
        }
        figureBody = figureNew;
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('cell_bg');

        }
        if (rotate < 4) {
            rotate++
        } else {
            rotate = 1;
        }
    }
})










