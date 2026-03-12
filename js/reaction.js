const container = document.getElementById('game-container');
const lightsImg = document.getElementById('game-lights');
const statusText = document.getElementById('game-status');
const resultText = document.getElementById('game-result');

const textJumpStart = document.getElementById('i18n-jump-start');
const textWait = document.getElementById('i18n-wait');
const textReady = document.getElementById('i18n-ready');
const textResult = document.getElementById('i18n-result');

let gameState = 'idle'; // idle | sequence | waiting | ready
let lightInterval;
let reactionTimeout;
let startTime;

const SEQUENCE_DELAY = 1000; // 1 second between lights

function handleClick() {
    if (gameState === 'idle') {
        startGame();
    } else if (gameState === 'sequence' || gameState === 'waiting') {
        jumpStart();
    } else if (gameState === 'ready') {
        endGame();
    }
}

function startGame() {
    gameState = 'sequence';
    statusText.textContent = "...";
    resultText.textContent = "";
    
    let lightCount = 1;
    lightsImg.src = `images/luzracao/${lightCount}ver.png`;
    
    lightInterval = setInterval(() => {
        lightCount++;
        if (lightCount <= 4) {
             lightsImg.src = `images/luzracao/${lightCount}ver.png`;
        } else if (lightCount === 5) {
             lightsImg.src = `images/luzracao/tudovermelho.png`;
        } else {
             clearInterval(lightInterval);
             startWaiting();
        }
    }, SEQUENCE_DELAY);
}

function startWaiting() {
    gameState = 'waiting';
    statusText.textContent = textWait.textContent || "Wait for it...";
    
    // random time between 0.2s and 3s after all red
    const randomTime = Math.random() * 2800 + 200;
    
    reactionTimeout = setTimeout(() => {
        gameState = 'ready';
        lightsImg.src = `images/luzracao/0ver.png`;
        statusText.textContent = textReady.textContent || "GO!";
        startTime = performance.now();
    }, randomTime);
}

function jumpStart() {
    clearInterval(lightInterval);
    clearTimeout(reactionTimeout);
    gameState = 'idle';
    lightsImg.src = `images/luzracao/tudovermelho.png`;
    
    statusText.textContent = textJumpStart.textContent || "Jump Start! Click to try again.";
    resultText.textContent = "";
}

function endGame() {
    gameState = 'idle';
    const endTime = performance.now();
    const reactionTime = (endTime - startTime).toFixed(0);
    
    const template = textResult.textContent || "Reaction time: {time} ms. Click to play again!";
    resultText.textContent = template.replace('{time}', reactionTime);
    statusText.textContent = textReady.textContent || "GO!"; 
    
    // Switch back to idle image maybe?
    // User description says "the 0ver.png will show and the user will need to click... then it will calculate"
    // So we can keep 0ver.png shown or switch back to tudovermelho.png
}

container.addEventListener('click', handleClick);
