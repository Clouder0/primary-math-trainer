let nowAns = "?";
let ans = "";
let count = 0;
let correct = 0;
let wrong = 0;
let sumTime = 0;
let startTime = Date.now();
let lastSubmitTime = 0;

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

function submitAns() {
    ++count;
    let ret = ans == nowAns;
    ret ? ++correct : ++wrong;
    nowAns = "?";
    let now = Date.now();
    lastSubmitTime = now - startTime;
    sumTime += lastSubmitTime;
    startTime = now;
    return ret;
}

function genQuestion(gen) {
    let g = gen();
    ans = g[1];
    return katex.renderToString(g[0]);
}

function typeAns(key)
{
    if (key >= '0' && key <= '9') {
        if (nowAns === "?") nowAns = "";
        nowAns = nowAns + key.toString();
    }
    else if (key == "Backspace") {
        if (nowAns === "?") return;
        if (nowAns.length === 1)
            nowAns = "?";
        else
            nowAns = nowAns.slice(0, nowAns.length - 1);
    }
}

function clearAns()
{
    nowAns = "?";
}

export { nowAns, ans, count, correct, wrong, myGen, submitAns, genQuestion, typeAns, clearAns, sumTime, lastSubmitTime };