/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const startGameListener = document.getElementById('btn__reset');
const keys = document.getElementsByClassName('key');

let eventHandler = function(e) {
    let keyPress = e.key;
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].innerHTML === keyPress) {
            if (keys[i].disabled) {
                continue
            } else {
                game.handleInteraction(keys[i]);
            }
        }
    }
}

startGameListener.addEventListener('click', () => {
    game = new Game();
    game.startGame();
    document.addEventListener('keyup', eventHandler);
})
for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('click', (e) => {
        game.handleInteraction(e.target);
    })
}