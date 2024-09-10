let boxes= document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO

const winPatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8]
];

boxes.forEach(box => {
  box.addEventListener("click", () => {
  // console.log("box was clicked");
  if (turnO) {
    box.innerText = "O";
    box.style.color = "blue";
    turnO = false;
  }
  else {
    box.innerText = "X";
    box.style.color = "#b0413e"; // Necessary so that there is no blue color in X after a consecutive match in which is got disabled with a blue color where o was placed
    turnO = true;
  }
  box.disabled = true; // to fix the O/X

  checkWinner();
  })
}); 


const disableBoxes = () => {  //disable all boxes so that no one can win again
  for (let box of boxes) {
    box.disabled = true;
  }
}


const enableBoxes = () => {  //disable all boxes so that no one can win again
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

const showWinner = (winner) => {
  msg.innerText = `Congratulation, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const showDraw = () => {
  msg.innerText = `This is a DRAW!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
}

const checkWinner = () => {
  let winnerFound = false; // 

  for (let pattern of winPatterns) {
    // console.log(pattern[0],pattern[1],pattern[2]);
    // console.log(boxes[pattern[0]].innerext,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);
    
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // console.log("winner", pos1Val);
        showWinner(pos1Val);
        winnerFound = true;
      }
     
    }
    }
    if (!winnerFound) {
      checkDraw(); // Check for draw only if no winner is found
    }
  };
  
const checkDraw = () => {
  const allFilled = Array.from(boxes).every(box => box.innerText !== "");
  if (allFilled) {
    showDraw();
  }
}




const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
}

newGameBtn.addEventListener("click", resetGame); 
resetBtn.addEventListener("click",resetGame);