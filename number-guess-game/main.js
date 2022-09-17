// 유저는 숫자를 입력할 수 있다
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자보다 작으면 Up! 이라고 알려준다
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자보다 크면 Down! 이라고 알려준다
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자와 일치하다면 That’s right이라고 뜨고 게임이 종료된다.
// 유저는 총 5번의 기회가 있다
// 게임이 종료되면 버튼은 비활성화된다
// 리셋버튼을 누르면 게임이 초기화된다
// 유저가 1~100범위 밖에 숫자를 입력할시에 경고메세지가 뜬다
// 유저가 이미 입력한 값을 또 입력할 시에 경고메세지가 뜬다
// 반응형 UI

let RandomNumber = 0;
let UserInput = document.getElementById("user-input");
let UserButton = document.getElementById("user-button");
let UserUi = document.getElementById("user-ui");
let UserUi2 = document.getElementById("user-ui2");
let ButtonReset = document.getElementById("button-reset");
let UserImage = document.getElementById("main-img");
let GameOver = false;
let Chances = 6;
let history = [];

UserButton.addEventListener("click", play);
ButtonReset.addEventListener("click", reset);
UserInput.addEventListener("focus", function () {
  UserInput.value = "";
});
function PickNumber() {
  RandomNumber = Math.floor(Math.random() * 100) + 1;
  // console.log(RandomNumber);
}

PickNumber();

function play() {
  let UserValue = UserInput.value;
  if (UserValue < 1 || UserValue > 100) {
    UserUi.textContent = "1부터 100까지의 숫자만 입력가능합니다!";
    return;
  }

  if (history.includes(UserValue)) {
    UserUi.textContent =
      "이미 입력한 숫자를 입력하였습니다!.다른 숫자를 입력해주세요!!";
    return;
  }

  if (UserValue < RandomNumber) {
    UserUi.textContent = "UP!!!";
    UserImage.src="up.webp"

  } else if (UserValue > RandomNumber) {
    UserUi.textContent = "DOWN!!!"
    UserImage.src="down.webp"

    
  } else {
    UserUi.textContent = "정답!!!";
    UserImage.src="wow.webp"
    GameOver = true;
  }

  history.push(UserValue);
  // console.log("히스토리", history);

  Chances--;
  UserUi2.textContent = `남은기회:${Chances}`;

  if (Chances < 1) {
    GameOver = true;
  }
  if (GameOver == true) {
    UserButton.disabled = true;
  }

  // console.log(Chances); 찬스횟수
}

function reset() {
  UserInput.value = "";
  PickNumber();
  GameOver = false;
  UserButton.disabled = false;
  Chances = 6;
  UserUi2.textContent = `남은기회:${Chances}`;
  history = [];
  UserImage.src="main.webp"
}
