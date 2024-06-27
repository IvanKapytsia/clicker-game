const clickCount = document.getElementById("clickCount");
const coin = document.getElementById("coin");
const boost = document.getElementById("boost");
const realHp = document.getElementById("realHp");
const lvl = document.getElementById("lvl");
const counter = createCounter();
coin.addEventListener("click", counter);
coin.addEventListener("click", buttonClick);
boost.addEventListener("click", startBoost);

let count = 0;
let isBoostActive = false;
let hp = 50;
let idBoost;
boost.style.visibility = "hidden";

// лічильник
function createCounter() {
  return function () {
    if (isBoostActive) {
      const increments = [2, 3, 4, 5];
      const randomIncrement =
        increments[Math.floor(Math.random() * increments.length)];
      count += randomIncrement;
      clickCount.textContent = count;
    } else if (count < 100) {
      count++;
      clickCount.textContent = count;
      hp--;
      realHp.textContent = hp;
      lvl.textContent = 1;
    } else if (count >= 100 && count < 200) {
      count += 2;
      clickCount.textContent = count;
      hp -= 2;
      realHp.textContent = hp;
      lvl.textContent = 2;
    } else {
      count += 3;
      clickCount.textContent = count;
      hp -= 3;
      realHp.textContent = hp;
      lvl.textContent = 3;
    }
    if (hp <= 0) {
      coin.removeEventListener("click", counter);
      coin.removeEventListener("click", buttonClick);
      realHp.textContent = 0;
      setTimeout(() => {
        coin.addEventListener("click", counter);
        coin.addEventListener("click", buttonClick);
      }, 3000);
    }
  };
}

// очищаєм лічильник видомості кнопки boost
function startUpdatingFunction() {
  clearInterval(idBoost); // Очищуємо попередній інтервал
  idBoost = setInterval(function () {
    boost.style.visibility = "visible";
  }, 10000);
}
startUpdatingFunction();

// анімація бусту
function startBoost() {
  isBoostActive = true;
  const body = document.body;
  body.style.backgroundImage = 'url("rocket.gif")';
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
  setTimeout(function () {
    isBoostActive = false;
    body.style.backgroundImage = "none";
    body.style.backgroundColor = "rgb(53, 53, 53)";
    boost.style.visibility = "hidden";
  }, 3000);
}

// відновлення HP
function hpRecovery() {
  setInterval(function () {
    if (hp < 50) {
      hp += 1;
      if (hp > 50) {
        hp = 50;
      }
      realHp.textContent = hp;
    } else {
    }
  }, 1000);
}
hpRecovery();

// анамація кліку
function buttonClick() {
  coin.style.transform = "scale(1.1)";
  setTimeout(function () {
    coin.style.transform = "scale(1)";
  }, 20);
}
