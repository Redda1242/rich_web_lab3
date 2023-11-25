const { fromEvent, interval } = rxjs;
const { takeWhile, map, scan, startWith } = rxjs.operators;

const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const startButton = document.getElementById('startTimer');

const hoursDisplay = document.getElementById('hoursDisplay');
const minutesDisplay = document.getElementById('minutesDisplay');
const secondsDisplay = document.getElementById('secondsDisplay');

let countdownSubscription;

const updateDisplay = ({ hours, minutes, seconds }) => {
    hoursDisplay.textContent = String(hours).padStart(2, '0');
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
};

fromEvent(startButton, 'click').subscribe(() => {
    // If there's an existing countdown, clear it before starting a new one
    if (countdownSubscription) {
        countdownSubscription.unsubscribe();
    }

    let totalSeconds =
        parseInt(hoursInput.value || 0) * 3600 +
        parseInt(minutesInput.value || 0) * 60 +
        parseInt(secondsInput.value || 0);

    countdownSubscription = interval(1000).pipe(
        startWith(totalSeconds),
        scan(time => time - 1, totalSeconds), // Decrease time by one each interval
        takeWhile(time => time >= 0),
        map(time => {
            let hours = Math.floor(time / 3600);
            let minutes = Math.floor((time % 3600) / 60);
            let seconds = time % 60;
            return { hours, minutes, seconds };
        }),
    ).subscribe(updateDisplay);
});

// Initialize display
updateDisplay({ hours: 0, minutes: 0, seconds: 0 });
