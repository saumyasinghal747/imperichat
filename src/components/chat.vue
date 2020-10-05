<template>
    <md-content v-if="$store.state.user">
        <h1 >{{ ($store.state.courses.filter(function(x) {
            return x.sectionId === $route.params.courseid
            })[0] || {name: "Loading..."}).name }}</h1>
        <md-list v-for="n in $store.state.messages" v-bind:key="n" class="md-double-line" v-chat-scroll>
            <md-list-item>
                <md-avatar>
                    <img  src="https://cdn11.bigcommerce.com/s-sq9zkarfah/images/stencil/1280x1280/products/94144/189479/Snoopy-Happy-Decal-Sticker__67019.1511154642.jpg?c=2"/>
                </md-avatar>
                <div class="md-list-item-text">
                    <span>Someone</span>
                    <p >{{n % 2 == 0 ? "Hello, Someone!":"Hi!!"}}</p>
                </div>
            </md-list-item>

        </md-list>

    </md-content>
</template>

<script>
    export default {
        name: "chat"
    }
</script>

<style scoped>

</style>
