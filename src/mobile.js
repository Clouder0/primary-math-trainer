document.addEventListener("keydown", onClick);
window.addEventListener("load", () => init());

import * as common from "./common.js"

function init() {
    genQuestion(common.myGen);
    updAns();
    updFooter();
}

let buttons = document.getElementsByTagName("button");
for(let btn of buttons)
{
    btn.addEventListener("click", onClick);
}

function onClick() {
    let key = this.textContent;
    if (key >= '0' && key <= '9' || key == "<") {
        if (key == "<") key = "Backspace";
        common.typeAns(key);
        updAns();
    }
    else if (key == "C") {
        common.clearAns();
        updAns();
    }
    else if (key == "Submit") {
        submitAns();
    }
}

function updAns() {
    katex.render(common.nowAns,
        document.getElementsByClassName("answer")[0],
        { throwOnError: false });
}

function submitAns() {
    if(common.submitAns()){
        genQuestion(common.myGen);
    }
    else 
    {
        document.getElementsByClassName("question")[0].classList.add("question-wrong");
        setTimeout(() => {
            document.getElementsByClassName("question")[0].classList.remove("question-wrong");
        }, 500);
    }
    updAns();
    updFooter();
}

function updFooter() {
    let footer = document.getElementsByTagName("footer")[0];
    footer.innerHTML = `已完成：${common.count} 正确：${common.correct}` + 
        ` 错误：${common.wrong} <br /> 平均用时：${(common.sumTime / common.correct).toFixed(0)}ms` + 
        ` 上次用时：${common.lastSubmitTime}ms`;
}

function genQuestion(gen) {
    let q = document.getElementsByClassName("question")[0];
    q.classList.remove("question-wrong");
    q.innerHTML = common.genQuestion(gen);
}

document.getElementsByTagName("header")[0].addEventListener("click", onHeaderClick);
function onHeaderClick() {
    switchState();
}

let state = 1;
function switchState() {
    if (state) {
        document.getElementsByClassName("wrapper")[0].style.visibility = "hidden";
        document.getElementsByClassName("numpad")[0].style.visibility = "hidden";
        document.getElementsByClassName("numpad-wrapper")[0].classList.add("main-stopped");
        document.getElementsByTagName("main")[0].classList.add("main-stopped");
        document.getElementById("top").innerHTML = "Press &nbsp; <strong>Click Here</strong>&nbsp; to continue.";
    }
    else {
        document.getElementsByClassName("wrapper")[0].style.visibility = "visible";
        document.getElementsByClassName("numpad")[0].style.visibility = "visible";
        document.getElementsByClassName("numpad-wrapper")[0].classList.remove("main-stopped");
        document.getElementsByTagName("main")[0].classList.remove("main-stopped");
        document.getElementById("top").innerHTML = "Press &nbsp; <strong>Click Here</strong>&nbsp; to stop.";
    }
    state ^= 1;
}