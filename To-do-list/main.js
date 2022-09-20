// 유저가 값을 입력한다
// +버튼을 누면 할일이 추가된다
// 딜리트버튼을 누르면 할일이 삭제된다
// 체크버튼을 누르면 할일이 끝나면서 밑줄이 간다
// ing end 탭을 누르면, 언더바가 이동한다
// end 탭은 끝난 아이템만 , ing 탭은 진행중인 아이템만
// 전체탭을 다시 누르면 다시 전체아이템으로 돌아온다





let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let Underline = document.getElementById("under-line");
let taskList = [];
let mode ="all";
let filterList = [];
  
console.log(tabs)

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      addTask(event);
    } 
  });
for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){
        filter(event);
    });

}
function addTask() {
    let taskValue = taskInput.value;
    if(taskValue==""){
        retrun;
    }
  let task = {
    id: uid(),
    taskContant: taskValue,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value =""
  render();
  console.log(taskList)
}

function render() {
    let list =[];
    if(mode === "all"){
        list = taskList;
    }else if(mode ==="ongoing"|| mode ==="done"){
        list = filterList;
    }
    let resultHTML = "";

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task task-done" id="${list[i].id}">
        <span>${list[i].taskContant}</span>
            <div class="button-box">
              <button class="button-rotate"onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
              <button class="button-trash"onclick="toggleDelete('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
     </div>`;
    } else {
      resultHTML += `<div class="task" id="${list[i].id}">
      <span>${list[i].taskContant}</span>
      <div class="button-box">
        <button class="button-check"onclick="toggleComplete('${list[i].id}')"><i class="fa fa-check"></i></button>
        <button class="button-trash"onclick="toggleDelete('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
</div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            
            break;
        }
    }
    filter();
    
}
function toggleDelete(id) {

  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      
      console.log("삭제후",taskList)

      break;
    }
  }
  filter();

}

function filter(event){
    if(event){
    mode = event.target.id;
    
    Underline.style.left = event.currentTarget.offsetLeft +"px"
    Underline.style.width = event.currentTarget.offsetWidth +"px"
    Underline.style.top = 
    event.currentTarget.offsetTop + event.currentTarget.offsetHeight - 10 + "px"
    console.log(Underline.style.left)
    console.log(Underline.style.width)
    console.log(Underline.style.top)
    }




    filterList=[];
    if(mode === "all"){
 
        render();
        console.log("오리지날배열",taskList);
        
    }else if(mode ==="ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
        
        render();
        console.log("진행예정배열",filterList);
    }
    else if(mode ==="done"){
        for(i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
        
        render();
      
    }
   
   console.log("완료배열",filterList);
}


function uid() {
  let a = new Uint32Array(3);
  window.crypto.getRandomValues(a);
  return (
    performance.now().toString(36) +
    Array.from(a)
      .map((A) => A.toString(36))
      .join("")
  ).replace(
    /./g,
    "" +
      Math.random() +
      Intl.DateTimeFormat().resolvedOptions().timeZone +
      Date.now()
  );
}

