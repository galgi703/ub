document.addEventListener("DOMContentLoaded", () => {
  let count = 0;
  let timeLeft = 7;
  const maxTime = 7;
  const timerBarWidth = 400;

  const countElement = document.getElementById("count");
  const image = document.getElementById("gameImage");
  const timerFill = document.getElementById("timerFill");
  const startIcon = document.getElementById("startIcon");
  const timerBar = document.getElementById("timerBar");
  const saveBtn = document.getElementById("saveBtn");
  const loadBtn = document.getElementById("loadBtn");
  const highScoreElement = document.getElementById("highScore");
  const gameOverSound = document.getElementById("gameOverSound");

  let highScore = localStorage.getItem("highScore") || 0;
  highScoreElement.textContent = highScore;

  function updateTimerUI() {
    let percentage = (timeLeft / maxTime) * 100;
    timerFill.style.width = `${percentage}%`;
    let iconX = (percentage / 100) * timerBarWidth;
    startIcon.style.transform = `translateX(${iconX}px)`;
  }

  function decreaseTime() {
    if (timeLeft > 0) {
      timeLeft -= 0.15;
      updateTimerUI();
    }
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }

  function gameOver() {
    // 🔊 게임 오버 사운드 재생
    if (gameOverSound) {
      gameOverSound.volume = 0.7;
      gameOverSound.play().catch(() => {
        // 사운드 재생 실패시 무시
      });
    }

    if (count > highScore) {
      highScore = count;
      localStorage.setItem("highScore", highScore);
    }

    localStorage.setItem("count", count);
    setTimeout(() => {
      window.location.href = "gameover.html";
    }, 1000); // 사운드 들을 시간
  }

  image.addEventListener('click', () => {
    count++;
    countElement.textContent = count;

    if (count === 10000) {
      const yoon = document.getElementById("flyingYoon");
      yoon.style.display = "block";
    }

    if (count === 1000) {
      image.src = "유별 강화.png";
    }

    if (count === 100) {
      const flowerField = document.getElementById("flowerField");
      for (let i = 0; i < 20; i++) {
        const flower = document.createElement("img");
        flower.src = "꽃.png";
        flower.alt = "꽃";
        flower.className = "flower";
        flowerField.appendChild(flower);
      }
    }

    if (count === 500) {
      const jumpscare = document.getElementById("jumpscare");
      jumpscare.style.display = "block";
      setTimeout(() => {
        jumpscare.style.display = "none";
      }, 1000);
    }

    image.style.transition = 'transform 0.1s ease-out';
    image.style.transform = 'translateY(-70px)';

    setTimeout(() => {
      image.style.transition = 'transform 0.15s ease-in';
      image.style.transform = 'translateY(0)';
    }, 100);

    timeLeft = Math.min(timeLeft + 1, maxTime);
    updateTimerUI();

    if (count > highScore) {
      highScore = count;
      highScoreElement.textContent = highScore;
      localStorage.setItem("highScore", highScore);
    }
  });

  saveBtn.addEventListener("click", () => {
    localStorage.setItem("savedCount", count);
  });

  loadBtn.addEventListener("click", () => {
    const savedCount = parseInt(localStorage.getItem("savedCount"));
    if (!isNaN(savedCount)) {
      count = savedCount;
      countElement.textContent = count;

      if (count >= 1000) {
        image.src = "유별 강화.png";
      }

      if (count >= 100) {
        const flowerField = document.getElementById("flowerField");
        if (flowerField.childElementCount === 0) {
          for (let i = 0; i < 20; i++) {
            const flower = document.createElement("img");
            flower.src = "꽃.png";
            flower.alt = "꽃";
            flower.className = "flower";
            flowerField.appendChild(flower);
          }
        }
      }

      if (count >= 10000) {
        const yoon = document.getElementById("flyingYoon");
        yoon.style.display = "block";
      }
    }
  });

  updateTimerUI();
  const timerInterval = setInterval(decreaseTime, 100);
});
