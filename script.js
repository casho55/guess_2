let correctNumber;
let attemptsLeft;
let loggedInUser;

function showRegister() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
}

function showLogin() {
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (username && password) {
        let users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            alert('Username already exists. Please choose another.');
        } else {
            users[username] = password;
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful! Please log in.');
            showLogin();
        }
    } else {
        alert('Please enter both username and password.');
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username && password) {
        let users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username] && users[username] === password) {
            loggedInUser = username;
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('register-container').style.display = 'none';
            document.getElementById('game-container').style.display = 'block';
            startGame();
        } else {
            alert('Invalid username or password.');
        }
    } else {
        alert('Please enter both username and password.');
    }
}

function startGame() {
    correctNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 5;
    document.getElementById('message').textContent = 'Guess a number between 1 and 100';
    document.getElementById('result').textContent = `You have ${attemptsLeft} attempts left.`;
    document.getElementById('guess').value = '';
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guess').value);
    if (guess > 0 && guess <= 100) {
        attemptsLeft--;
        if (guess === correctNumber) {
            document.getElementById('result').textContent = `🎉 Congratulations ${loggedInUser}, you guessed correctly!`;
            addWinner(loggedInUser);
            startGame();
        } else if (guess > correctNumber) {
            document.getElementById('result').textContent = `📉 Too high! Try again. You have ${attemptsLeft} attempts left.`;
        } else {
            document.getElementById('result').textContent = `📈 Too low! Try again. You have ${attemptsLeft} attempts left.`;
        }
        
        if (attemptsLeft === 0) {
            document.getElementById('result').textContent = `😢 Sorry, ${loggedInUser}. You've used all your attempts. The correct number was ${correctNumber}.`;
            setTimeout(startGame, 200);
        }
    } else {
        alert('Please enter a number between 1 and 100.');
    }
}

function addWinner(username) {
    const winnersList = document.getElementById('winners-list');
    const listItem = document.createElement('li');
    listItem.textContent = username;
    winnersList.appendChild(listItem);
}
