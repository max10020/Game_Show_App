/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [new Phrase('Treehouse'),
            new Phrase("Big bang"),
            new Phrase("No war in ukraine"),
            new Phrase("Be real"),
            new Phrase("Real programmer")
        ];
        this.activePhrase = null;
    }


    startGame() {
        const gameOverlay = document.getElementById('overlay');
        gameOverlay.style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }


    getRandomPhrase() {
        const randomPhraseIndex = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomPhraseIndex];
    }


    removeLife() {
        this.missed += 1;
        const scoreboard = document.querySelector('#scoreboard ol').children;
        scoreboard[this.missed - 1].querySelector('img').src = 'images/lostHeart.png';
        if (this.missed === 5) {
            this.gameOver('lose');
        }
    }


    handleInteraction(button) {
        const letter = button.textContent;
        //const winner = this.checkForWin();
        button.disabled = true;
        if (this.activePhrase.checkLetter(letter)) {
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(letter);
            const winner = this.checkForWin();
            if (winner) {
                this.gameOver('win');
            }
        } else {
            button.classList.add('wrong');
            this.removeLife();
        }
    }


    checkForWin() {
        const keyList = document.querySelector('#phrase ul').children;
        let showCharacterCount = 0;
        let spaceCharacterCount = 0;
        for (let i = 0; i < keyList.length; i++) {
            if (keyList[i].classList.contains('show')) {
                showCharacterCount += 1;
            } else if (keyList[i].classList.contains('space')) {
                spaceCharacterCount += 1;
            }
        }
        return (showCharacterCount + spaceCharacterCount) === keyList.length
    }


    resetGame() {
        const keyList = document.querySelector('#phrase ul');
        const keys = document.getElementsByClassName('key');
        const buttonReset = document.getElementById('btn__reset');
        const scoreboard = document.querySelector('#scoreboard ol').children;
        //const heartPng = scoreboard[i].querySelector('img');
        keyList.innerHTML = '';
        for (let i = 0; i < keys.length; i++) {
            keys[i].className = 'key';
            keys[i].disabled = false
        }
        buttonReset.textContent = 'Play Again';
        for (let i = 0; i < scoreboard.length; i++) {
            scoreboard[i].querySelector('img').src = 'images/liveHeart.png';
        }
    }


    gameOver(gameStatus) {
        const gameOverlay = document.getElementById('overlay');
        const gameOverMessage = document.getElementById('game-over-message');
        const overlay = document.getElementById('overlay');
        const currentOverlayClass = overlay.className;
        document.removeEventListener('keyup', eventHandler);
        gameOverlay.style.display = 'block';
        if (gameStatus == 'lose') {
            gameOverMessage.textContent = 'Game Over';
        } else if (gameStatus === 'win') {
            gameOverMessage.textContent = 'You Win!';
        }
        overlay.classList.replace(currentOverlayClass, gameStatus);
        this.resetGame();
    }
}