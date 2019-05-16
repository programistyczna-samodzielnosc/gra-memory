function Memory() {
    const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7];
    const PAIRS = [...NUMBERS, ...NUMBERS]
    const IMAGES = [
        {
            name: 'chmurka',
            src: 'chmurka.png'
        },
        {
            name: 'gwiazdka',
            src: 'gwiazdka.png'
        },
        {
            name: 'romb',
            src: 'romb.png'
        },
        {
            name: 'serduszko',
            src: 'serduszko.png'
        },
        {
            name: 'strzalka_dol',
            src: 'strzalka_dol.png'
        },
        {
            name: 'strzalka_gora',
            src: 'strzalka_gora.png'
        },
        {
            name: 'strzalka_lewo',
            src: 'strzalka_lewo.png'
        },
        {
            name: 'strzalka_prawo',
            src: 'strzalka_prawo.png'
        }
    ];

    const POSITION = shuffle(PAIRS);
    console.log('pozycja', POSITION);

    let board = document.querySelector('.board')

    displayBoard();

    let tileCounter = 0;
    const MAX_TILES = 2;
    //2; i jedno klikniecie ktore resetuje to na 0

    board.addEventListener('click', function (event) {

        if (event.target.classList.contains('tile--hidden')) {
            if (tileCounter < 2) {
                //odkrywanie kafelka
               
                console.log('target', event.target);
                event.target.classList.remove('tile--hidden');
                event.target.classList.add('tile--shown');

                let img = event.target.querySelector('img');
                img.style.visibility = "visible";
                
                tileCounter++;
                // if(tileCounter === 2) {
                //     resetCounter();
                // }
                
            } else {
                let shownTiles = Array.from(document.querySelectorAll('.tile--shown'));
                let images = shownTiles.map(tile => tile.querySelector('img').src);

                //porownywanie dwoch kafelkow
                if (images[0] === images[1]) {
                    //usuwamy z planszy
                    shownTiles.map(tile => {
                        tile.classList.remove('tile--shown');
                        tile.classList.add('tile--found');
                    });
                } else {
                    shownTiles.map(tile => {
                        tile.classList.remove('tile--shown');
                        tile.classList.add('tile--hidden');
                        tile.querySelector('img').style.visibility = "hidden";
                    })
                }
                resetCounter();
            }
        }
    })

    function resetCounter() {
        tileCounter = 0;
    }

    function displayBoard() {
        let html = POSITION.map((number) => {
            return htmlImage(IMAGES[number])
        }).join('');
        board.innerHTML = html;
    }

    function htmlImage(image) {
        return `
            <div class="tile tile--hidden tile--${image.name}">
                <img src="memory/${image.src}">
            </div>
        `;
    }

    function shuffle(numbers) {
        let copy = numbers.concat();
        let result = [];

        for (let i = 0; i < numbers.length; i++) {
            let randomNumber = getRandomInt(0, copy.length);
            result.push(copy[randomNumber]);
            copy = [
                ...copy.slice(0, randomNumber),
                ...copy.slice(randomNumber + 1, copy.length)
            ]
        }
        return result;
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

window.onload = Memory;