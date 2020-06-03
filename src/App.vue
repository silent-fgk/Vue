<template>
    <div id="app">
        <HelloWorld/>
    </div>
</template>

<script>
    import HelloWorld from './views/index.vue'

    export default {
        name: 'App',
        components: {
            HelloWorld
        }
    }
</script>

<style>
    body{
        background-image:url("../src/assets/img/bg.jpg");
        background-size: cover;
    }
</style>
