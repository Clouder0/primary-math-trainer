<script>
export default {
    data() {
        return {
        }
    },
    props: ["fontSize",],
}
</script>

<template>
    <div class="bar" :style="{fontSize: fontSize}">
        <slot></slot>
    </div>
</template>

<style scoped>
.bar {
    width: 100vw;
    height: auto;
    font-size: 6vmin;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: gainsboro;
}
</style>