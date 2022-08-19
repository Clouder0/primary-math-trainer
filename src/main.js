document.addEventListener("keydown", onKeydown);
window.addEventListener("load", () => init());

import * as common from "./common.js"

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    window.location.replace("mobile.html");
}

function init() {
    genQuestion(common.myGen);
    updAns();
    updFooter();
}

function onKeydown(e) {
    if (e.key >= '0' && e.key <= '9' || e.key == "Backspace") {
        common.typeAns(e.key);
        updAns();
    }
    else if (e.key == "Escape") {
        switchState();
    }
    else if (e.key == "Enter") {
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
        ` 错误：${common.wrong} 平均用时：${(common.sumTime / common.correct).toFixed(0)}ms` + 
        ` 上次用时：${common.lastSubmitTime}ms`;
}

function genQuestion(gen) {
    let q = document.getElementsByClassName("question")[0];
    q.classList.remove("question-wrong");
    q.innerHTML = common.genQuestion(gen);
}

document.getElementsByTagName("header")[0].addEventListener("click", onHeaderClick);
function onHeaderClick(e) {
    switchState();
}

let state = 1;
function switchState() {
    if (state) {
        let wrapper = document.getElementsByClassName("wrapper")[0];
        wrapper.style.visibility = "hidden";
        document.getElementsByTagName("main")[0].classList.add("main-stopped");
        document.getElementById("top").innerHTML = "Press &nbsp; <kbd>Esc</kbd> &nbsp;or &nbsp;<strong>Click Here</strong>&nbsp; to continue."
    }
    else {
        let wrapper = document.getElementsByClassName("wrapper")[0];
        wrapper.style.visibility = "visible";
        document.getElementsByTagName("main")[0].classList.remove("main-stopped");
        document.getElementById("top").innerHTML = "Press &nbsp; <kbd>Esc</kbd> &nbsp;or &nbsp;<strong>Click Here</strong>&nbsp; to stop."
    }
    state ^= 1;
}
