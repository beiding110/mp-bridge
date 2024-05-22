<template>
    <div class="dialog-model">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
    .dialog-model{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 1000;
    }
</style>