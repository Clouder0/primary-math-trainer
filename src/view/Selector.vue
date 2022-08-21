<script>
import {rnd} from "../assets/util.js"

function genPlus() {
    let a = rnd(1, 100);
    let b = rnd(1, 100);
    return [`${a} + ${b}`, (a + b).toString()];
}

function genMinus() {
    let a = rnd(1, 100);
    let b = rnd(1, 100);
    if (a < b) {
        let t = a;
        a = b;
        b = t;
    }
    return [`${a} - ${b}`, (a - b).toString()];
}

function genMul() {
    let a = rnd(1, 20);
    let b = rnd(1, 20);
    return ["" + a + "\\times" + b, (a * b).toString()];

}

function genDiv() {
    let a = rnd(1, 20);
    let b = rnd(1, 20);
    let res = a * b;
    return ["" + res + "\\div" + a, b.toString()];
}

function myGen() {
    let r = rnd(1, 4);
    switch (r) {
        case 1:
            return genPlus();
        case 2:
            return genMinus();
        case 3:
            return genMul();
        case 4:
            return genDiv();
    }
}
export default {
    data() {
        return {
            plusChecked: false,
            minusChecked: false,
            mulChecked: false,
            divChecked: false,
        }
    },
    computed: {
        selected() {
            let res = [];
            if (this.plusChecked) res.push(genPlus);
            if (this.minusChecked) res.push(genMinus);
            if (this.mulChecked) res.push(genMul);
            if (this.divChecked) res.push(genDiv);
            return res;
        }
    }
}
</script>

<template>
<div class="wrapper">

    <p>Select Your Mode</p>

    <div class="check">
        <input v-model="plusChecked" type="checkbox" id="plus" name="plus" value="plus" />
        <label for="plus">一百以内加法</label>
    </div>

    <div class="check">
        <input v-model="minusChecked" type="checkbox" id="minus" name="minus" value="minus" />
        <label for="minus">一百以内减法</label>
    </div>

    <div class="check">
        <input v-model="mulChecked" type="checkbox" id="multiply" name="multiply" value="multiply" />
        <label for="multiply">二十以内乘法</label>
    </div>

    <div class="check">
        <input v-model="divChecked" type="checkbox" id="divide" name="divide" value="divide" />
        <label for="divide">二十以内除法</label>
    </div>

    <button class="check" @click="this.$emit('select',selected)">Submit</button>

</div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

p {
    font-size: 6vmin;
}

input {
    margin: 8px;
}

.wrapper {
    width: 100vw;
    height: 100vh;
    margin: auto;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    background-color: #F4F7BE;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    align-items: center;
}

label {
    font-size: 4vmin;
}

div.check>input {
    width: 36px;
    height: 36px;
}

.check {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 8px;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}

button {
    margin-top: 10vh;
    height: 12vh;
    font-size: 4vmin;
    border: 0;
}
</style>