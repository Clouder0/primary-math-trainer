<script>
import Bar from "../components/Bar.vue";
import Modal from "../components/Modal.vue"
import Numpad from "../components/Numpad.vue"
import katex from "katex";

export default {
    components: {
        Bar, Modal, Numpad,
    },
    props: ["currentGen"],
    data() {
        return {
            question: "Question Here.",
            ans: "",
            nowAns: "?",
            count: 0,
            correct: 0,
            wrong: 0,
            sumTime: 0,
            startTime: Date.now(),
            lastSubmitTime: 0,
            questionWrong: false,
            state: 1,
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        }
    },
    methods: {
        switchState() {
            if (this.state ^= 1) {
                this.startTime = Date.now();
                this.genQuestion();
                this.nowAns = "?";
            }
            window.focus();
        },

        onKeydown(e) {
            if (e.key == "Escape") {
                this.switchState();
            }
            if (!this.state) return;
            if (e.key >= '0' && e.key <= '9') {
                if (this.nowAns === "?") this.nowAns = "";
                this.nowAns = this.nowAns + e.key.toString();
            }
            else if (e.key == "Backspace") {
                if (this.nowAns === "?") return;
                if (this.nowAns.length === 1)
                    this.nowAns = "?";
                else
                    this.nowAns = this.nowAns.slice(0, this.nowAns.length - 1);
            }
            else if (e.key == "Enter") {
                this.submitAns();
            }
        },

        submitAns() {
            ++this.count;
            if (this.ans == this.nowAns) {
                let now = Date.now();
                ++this.correct;
                this.genQuestion();
                this.lastSubmitTime = now - this.startTime;
                this.sumTime += this.lastSubmitTime;
                this.startTime = now;
            }
            else {
                ++this.wrong;
                this.questionWrong = true;
                setTimeout(() => this.questionWrong = false, 500);
            }
            this.nowAns = "?";
        },

        genQuestion() {
            let g = this.currentGen();
            this.ans = g[1];
            this.question = g[0];
        }
    },
    watch: {
        question: {
            handler(newQuestion) {
                katex.render(newQuestion, this.$refs.katex);
            }
        },
        nowAns(nowAns) {
            katex.render(nowAns, this.$refs.ans);
        }
    },
    mounted() {
        document.addEventListener("keydown", this.onKeydown);
        this.genQuestion();
    },
    computed: {
        statisticsStyle() {
            return this.isMobile ? "order:9" : "order:1000";
        }
    }
}
</script>

<template>

    <Bar fontSize="6vmin" @click="switchState" style="order:0;">

        <div id="top">
            <span v-html="isMobile ? '' : 'Press &nbsp; <kbd>Esc</kbd> &nbsp;or &nbsp;'"></span>
            <span><strong>Click Here</strong>&nbsp; to stop.</span>
        </div>

        <a href="https://github.com/Clouder0/primary-math-trainer" class="github-icon">
            <i class="fa fa-github" style="font-size:auto"></i>
        </a>

    </Bar>

    <main v-show="state" style="order:10;">

        <div class="wrapper">
            <div class="question" ref="katex" :class="{ 'question-wrong': questionWrong }">
                Question Here.
            </div>
            <div class="answer" ref="ans">
                ?
            </div>
        </div>

    </main>

    <Modal v-show="!state"></Modal>

    <Bar v-show="!isMobile" fontSize="5vmin" style="background-color: antiquewhite;order: 100;">Press &nbsp;
        <kbd>Enter</kbd> &nbsp; to submit your answer.
    </Bar>

    <Bar fontSize="2vh" style="text-align: center; background-color:beige" :style="statisticsStyle">
        总计：{{ count }}
        正确：{{ correct }}
        错误： {{ wrong }}
        <br />
        平均用时：{{ (sumTime / correct).toFixed(0) }}ms
        上次用时：{{ lastSubmitTime }}ms
    </Bar>

    <Numpad v-if="isMobile" v-show="state" style="order: 10000;" @click="(num) => this.onKeydown({ key: num })"
        @clear="this.nowAns = '?'"></Numpad>
</template>

<style>
@import "../assets/main.css";
@import "katex/dist/katex.min.css";

#top {
    flex: 1 1 auto;
    text-align: center;
}

.github-icon {
    align-self: flex-end;
}
</style>