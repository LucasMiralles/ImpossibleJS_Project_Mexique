document.addEventListener('DOMContentLoaded', function() {
    const microImage = document.getElementById('microImage');
    const backgroundAudio = document.getElementById('backgroundAudio');
    const startButton = document.getElementById('startButton');
    let intervalId;
    let movesCount = 0;

    microImage.addEventListener('click', toggleAudio);

    function toggleAudio() {
        if (microImage.src.includes('img/microb.png')) {
            microImage.src = 'img/micro_off.png';
            backgroundAudio.pause();
        } else {
            microImage.src = 'img/microb.png';
            backgroundAudio.play();
        }
    }

    startButton.addEventListener('click', startGame);

    function startGame() {
        let playerName = '';
        while (!playerName || playerName.trim() === '') {
            playerName = prompt('¡Por favor, introduzca su GamerName para iniciar el juego !');
        }
        document.querySelector('.player-name').textContent = 'Player Name: ' + playerName.trim();
        shuffleTiles();
        clearInterval(intervalId);
        startTimer();
        movesCount = 0;
        document.getElementById('moves').textContent = movesCount;
        moove();
    }

    function shuffleTiles() {
        var gameBoard = document.querySelector('.game-board');
        for (var i = gameBoard.children.length; i >= 0; i--) {
            gameBoard.appendChild(gameBoard.children[Math.random() * i | 0]);
        }
    }

    function startTimer() {
        let totalSeconds = 0;
        const timerElement = document.getElementById('time');
        intervalId = setInterval(function() {
            totalSeconds++;
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
            timerElement.textContent = formattedTime;
        }, 1000);
    }

    function pad(number) {
        return (number < 10 ? '0' : '') + number;
    }

    function moove() {
        window.addEventListener('click', function (e) {
            if (e.target.className === 'tile') {
                var emptyItem = document.querySelector('.empty');
                if (getDistance(e.target.offsetLeft, e.target.offsetTop, emptyItem.offsetLeft, emptyItem.offsetTop) <= 110) {
                    emptyItem.className = 'tile';
                    emptyItem.innerText = e.target.innerText;
                    e.target.className = 'empty';
                    e.target.innerText = '';
                    movesCount++;
                    document.getElementById('moves').textContent = movesCount;
                    if (isGameSolved()) {
                        congratulate();
                    }
                }
            }
        });
    }

    function isGameSolved() {
        var tiles = document.querySelectorAll('.game-board > div');
        var expectedText = 1;
        for (var i = 0; i < tiles.length - 1; i++) {
            if (tiles[i].innerText !== String(expectedText)) {
                return false;
            }
            expectedText++;
        }
        if (tiles[tiles.length - 1].classList.contains('empty') && tiles[tiles.length - 2].innerText === '15') {
            return true;
        } else {
            return false;
        }
    }


    function congratulate() {
        clearInterval(intervalId);
        var time = document.getElementById('time').textContent;
        alert('Felicidades, has ganado !\nTiempo final : ' + time + '\nNúmero de movimientos : ' + movesCount);
    }

    function getDistance(x1, y1, x2, y2) {
        var a = x1 - x2;
        var b = y1 - y2;
        return Math.sqrt(a * a + b * b);
    }

});
