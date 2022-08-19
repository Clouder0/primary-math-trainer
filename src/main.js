document.addEventListener("keydown", onKeydown);
window.addEventListener("load", () => init());

let nowAns = "?";
let ans = "";
let count = 0;
let correct = 0;
let wrong = 0;

function rnd(l, r) {
    return Math.floor(l + Math.random() * (r - l + 1));
}

function genBasic() {
    let a = rnd(1, 100);
    let b = rnd(1, 100);
    return ["" + a + "+" + b, (a + b).toString()];
}

function genMul() {
    let a = rnd(1, 20);
    let b = rnd(1, 20);
    return ["" + a + "\\times" + b, (a * b).toString()];

}

function genDiv()
{
    let a = rnd(1,20);
    let b = rnd(1,20);
    let res = a * b;
    return ["" + res + "\\div" + a, b.toString()];
}

function myGen() {
    let r = rnd(1,3);
    switch (r)
    {
        case 1:
            return genBasic();
        case 2:
            return genMul();
        case 3:
            return genDiv();
    }
}

function init() {
    genQuestion(myGen);
    updAns();
    updFooter();
}

function onKeydown(e) {
    if (e.key >= '0' && e.key <= '9') {
        document.getElementsByClassName("answer")[0];
        if (nowAns === "?") nowAns = "";
        nowAns = nowAns + e.key.toString();
        updAns();
    }
    else if (e.key == "Escape") {
        switchState();
    }
    else if (e.key == "Enter") {
        submitAns();
    }
    else if (e.key == "Backspace") {
        if (nowAns === "?") return;
        if (nowAns.length === 1)
            nowAns = "?";
        else
            nowAns = nowAns.slice(0, nowAns.length - 1);
        updAns();
    }
}

function updAns() {
    katex.render(nowAns,
        document.getElementsByClassName("answer")[0],
        { throwOnError: false });
}

function submitAns() {
    ++count;
    if (nowAns === ans) {
        ++correct;
        genQuestion(myGen);
    }
    else ++wrong;
    nowAns = "?";
    updAns();
    updFooter();
}

function updFooter() {
    let footer = document.getElementsByTagName("footer")[0];
    footer.innerHTML = "已完成：" + count + " 正确：" + correct + " 错误：" + wrong;
}

function genQuestion(gen) {
    let g = gen();
    ans = g[1];
    katex.render(g[0], document.getElementsByClassName("question")[0], { throwOnErorr: false });
}

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