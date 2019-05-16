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
    const MAX_TILES = 2;

    let board = document.querySelector('.board')
    let tileCounter = 0;
    
    displayBoard();
    board.addEventListener('click', clickTheBoard);

    function clickTheBoard(event) {
        if (isTileHidden(event)) {
            let shownTiles = getShownTiles();
            if (tileCounter === MAX_TILES && areImagesSame(shownTiles)) {
                pairIsFound(shownTiles);
            }
            if (tileCounter < MAX_TILES) {
                showTile(event.target);
            } else {
                pairIsNotFound(shownTiles);
            }
        }
    }

    function showTile(target) {
        target.classList.remove('tile--hidden');
        target.classList.add('tile--shown');

        let img = target.querySelector('img');
        img.style.visibility = "visible";
        tileCounter++;
    }

    function pairIsFound(shownTiles) {
        shownTiles.map(tile => {
            tile.classList.remove('tile--shown');
            tile.classList.add('tile--found');
        });
        resetCounter();
    }

    function pairIsNotFound(shownTiles) {
        shownTiles.map(tile => {
            tile.classList.remove('tile--shown');
            tile.classList.add('tile--hidden');
            tile.querySelector('img').style.visibility = "hidden";
        })
        resetCounter();
    }

    function isTileHidden(event) {
        return event.target.classList.contains('tile--hidden');
    }

    function areImagesSame(shownTiles) {
        let images = shownTiles.map(tile => tile.querySelector('img').src);
        if (images[0] === images[1]) {
            return true;
        }
        return false;
    }

    function getShownTiles() {
        return Array.from(document.querySelectorAll('.tile--shown'));
    }

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