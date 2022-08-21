<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        onClick(num) {
            this.$emit("click", num);
        }
    },
}
</script>

<template>
    <div class="numpad-wrapper">
        <div class="numpad">
            <button v-for="i in 9" @click="onClick(i.toString())">{{i}}</button>
            <button id="btn_clear" @click="this.$emit('clear')">C</button>
            <button id="btn0" @click="onClick('0')">0</button>
            <button id="btn_backspace" @click="onClick('Backspace')"> &lt; </button>
            <button id="submit" @click="onClick('Enter')">Submit</button>
        </div>
    </div>
</template>

<style scoped>
.numpad {
    height: max(auto,30vh);
    margin: auto;
    margin-bottom: 6px;
    align-self: center;
    width: 95%;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto auto 8vh;
}

button {
    box-shadow: 4px;
    margin: 2px;
    border: 0;
    border-radius: 8px;
    font-size: 2em;
    font-weight: bold;
    padding: 6px;
}

button#submit {
    grid-column-start: 1;
    grid-column-end: 4;
    width: auto;
}
</style>