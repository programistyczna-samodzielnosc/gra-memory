function Memory() {
    const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7];
    const PAIRS = [...NUMBERS,...NUMBERS]
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
    console.log('blblele', POSITION);

    let board = document.querySelector('.board')

    displayBoard();

    board.addEventListener('click', function(event){
        
        if(event.target.classList.contains('tile')) {
            console.log('target',event.target);
           
            let img = event.target.querySelector('img');
            img.style.visibility = "visible";
        }
    })

    function displayBoard() {
        let html = POSITION.map((number)=>{
            return htmlImage(IMAGES[number])
        }).join('');
        board.innerHTML = html;
    }

    function htmlImage(image) {
        return `
            <div class="tile tile--hidden tile--${image.name}">
                <img src="memory/${image.src}">
            </div>
        `
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