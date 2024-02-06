let boxes = document.querySelectorAll(".box");
let ResetBtn = document.querySelector("#reset-btn");
let NewGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg");
let turnO = true;
let count=0;
const WinPattern = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];
boxes.forEach((box) =>{
    box.addEventListener("click",()=>{
        count++;
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();

    });
});
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const draw = ()=>{
    msg.innerText = `It's a draw!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = ()=>{
    for (let box of boxes){
        box.disabled = true;
    }
}
const enableBoxes = ()=>{
    for (let box of boxes){
        box.disabled = false;
        box.innerText="";
        box.classList.remove("highlight");
    }
}
const checkWinner = () => {
    let winnerFound = false;
    for (let pattern of WinPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                highlightWinningBoxes(pattern);
                showWinner(pos1Val);
                winnerFound = true;
                break;

            }
        }
    }
    if (!winnerFound && count === 9) {
        draw();
    }
};
const highlightWinningBoxes = (winningPattern) => {
    winningPattern.forEach(index => {
        boxes[index].classList.add("highlight"); // Assuming you have a .highlight class in your CSS
    });
};

const resetGame = () =>{
    count=0;
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}
NewGameBtn.addEventListener("click",resetGame);
ResetBtn.addEventListener("click",resetGame);