<script>
import Main from "./view/Main.vue"
import Selector from "./view/Selector.vue"
import {rnd} from "./assets/util.js"

export default {
    data() {
        return {
            state: 0,
            selGen: null,
        }
    },
    components: {
        Main,
        Selector,
    },
    methods: {
        select(selected) {
            function myGen(){
                let t = rnd(1,selected.length) - 1;
                return selected[t]();
            }
            this.selGen = myGen;
            this.state = 1;
        }
    }
}
</script>

<template>
<body>
    <Selector v-show="state === 0" @select="select"></Selector>
    <Main v-if="state === 1" :currentGen="selGen"></Main>
</body>
</template>
