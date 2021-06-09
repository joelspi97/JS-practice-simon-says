const SKYBLUE = document.getElementById('skyblue');
const ORANGE = document.getElementById('orange');
const PURPLE = document.getElementById('purple');
const GREEN = document.getElementById('green');
const START_BTN = document.getElementById('start-btn');
const MAX_LEVEL = 2;

class Game {
    constructor() {
        this.start();
        setTimeout(() => this.nextLevel(), 1000);
    }

    start() {
        this.start = this.start.bind(this);
        this.chooseColor = this.chooseColor.bind(this);
        this.startBtnToggle();
        this.level = 1;
        this.colors = {
            SKYBLUE,
            ORANGE,
            PURPLE,
            GREEN,
        }
        this.sequence = new Array(MAX_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    startBtnToggle() {
        if (START_BTN.classList.contains('hide')) {
            START_BTN.classList.remove('hide');
        } else {
            START_BTN.classList.add('hide');
        }
    }

    numberToColor(number) {
        switch (number) {
            case 0:
                return 'SKYBLUE';
            case 1:
                return 'ORANGE';
            case 2:
                return 'PURPLE';
            case 3:
                return 'GREEN';
        }
    }

    colorToNumber(chosenColor) {
        switch (chosenColor) {
            case 'SKYBLUE':
                return 0;
            case 'ORANGE':
                return 1;
            case 'PURPLE':
                return 2;
            case 'GREEN':
                return 3;
        }
    }

    lightSequence() {
        for (let i = 0; i < this.level; i++) {
            let color = this.numberToColor(this.sequence[i]);
            setTimeout(() => this.lightOn(color), 1000 * i);
        }
    }

    lightOn(color) {
        this.colors[color].classList.add('light');
        setTimeout(() => this.lightOff(color), 500);
    }

    lightOff(color) {
        this.colors[color].classList.remove('light');
    }

    chooseColor(ev) {
        const chosenColor = ev.target.dataset.color;
        const chosenNumber = this.colorToNumber(chosenColor);
        this.lightOn(chosenColor);
        console.log(this.level);
        if (chosenNumber === this.sequence[this.subLevel]) {
            this.subLevel++;
            if(this.subLevel === this.level) {
                this.level++;
                this.removeClickEvents()
                if(this.level === (MAX_LEVEL + 1)) {
                    swal('You win', 'Congratulations, you won the game!', 'success')
                        .then (()=> {
                            this.removeClickEvents()
                            this.start()
                        });
                } else {
                    setTimeout(() => this.nextLevel(), 1000);
                }  
            }
        } else {
            swal('You lose', 'We are sorry, you have lost the game :(', 'error')
                .then (() => {
                    this.removeClickEvents()
                    this.start()
                });
        }
    }

    nextLevel() {
        this.subLevel = 0;
        this.lightSequence();
        this.addClickEvents();
    }

    addClickEvents() {
        this.colors.SKYBLUE.addEventListener('click', this.chooseColor);
        this.colors.ORANGE.addEventListener('click', this.chooseColor);
        this.colors.PURPLE.addEventListener('click', this.chooseColor);
        this.colors.GREEN.addEventListener('click', this.chooseColor);
    }

    removeClickEvents() {
        this.colors.SKYBLUE.removeEventListener('click', this.chooseColor);
        this.colors.ORANGE.removeEventListener('click', this.chooseColor);
        this.colors.PURPLE.removeEventListener('click', this.chooseColor);
        this.colors.GREEN.removeEventListener('click', this.chooseColor);
    }
}

let prueba;

START_BTN.addEventListener('click', () => prueba = new Game);

