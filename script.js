class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25 minutes in seconds
        this.breakTime = 5 * 60; // 5 minutes in seconds
        this.timeLeft = this.workTime;
        this.isRunning = false;
        this.timerId = null;
        this.isWorkMode = true;

        // DOM elements
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.workButton = document.getElementById('work');
        this.breakButton = document.getElementById('break');
        
        // Theme toggle initialization
        this.themeToggle = document.getElementById('themeToggle');
        this.initializeTheme();

        this.initializeButtons();
        this.updateDisplay();
    }

    initializeButtons() {
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        this.workButton.addEventListener('click', () => this.setWorkMode());
        this.breakButton.addEventListener('click', () => this.setBreakMode());
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();

                if (this.timeLeft === 0) {
                    this.playAlarm();
                    this.reset();
                }
            }, 1000);
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.timerId);
    }

    reset() {
        this.pause();
        this.timeLeft = this.isWorkMode ? this.workTime : this.breakTime;
        this.updateDisplay();
    }

    setWorkMode() {
        this.isWorkMode = true;
        this.workButton.classList.add('active');
        this.breakButton.classList.remove('active');
        this.reset();
    }

    setBreakMode() {
        this.isWorkMode = false;
        this.workButton.classList.remove('active');
        this.breakButton.classList.add('active');
        this.reset();
    }

    playAlarm() {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play();
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        this.themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            console.log('Theme switched to:', newTheme);
        });
    }
}

// Create timer instance when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const timer = new PomodoroTimer();
}); 