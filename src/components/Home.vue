<template>
    <div>
    <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
            <div class="md-toolbar-section-start">
                <md-button class="md-icon-button" @click="$store.commit('toggleDrawer')">
                    <md-icon>menu</md-icon>
                </md-button>

          <span class="md-title">Imperichat</span>
            </div>
                <top-right-menu/>


        </div>

        <div class="md-toolbar-row">
            <md-tabs class="md-primary" >

                <md-tab id="tab-pages"  md-label="Assignments"></md-tab>
                <md-tab id="tab-posts" md-label="Notes"></md-tab>
            </md-tabs>
        </div>
    </md-app-toolbar>
        <div style="padding: 20px;margin-top:20px">
            <h1 v-if="$store.state.user">
                Hello! Welcome to Imperichat! Please select a course to start talking to friends!
            </h1>
            <h1 v-else>
                Hello! Welcome to Imperichat! Please sign in to start talking to friends!
            </h1>
        </div>
    </div>
</template>

<script>
    // i think if we just sign in w redirect and not use the promise we should be fine, since we dont need promise in render.
    // Render happens automatically. So call the function and be happy since all are if statements.

    import TopRightMenu from "./topRightMenu";
    export default {
        name: "Home",
        components: {TopRightMenu}
    }
</script>

<style scoped>

</style>
