<template>
  <div>
    <md-app-toolbar class="md-large md-dense md-primary" style="z-index: 10">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button d-sm-only" @click="$store.commit('toggleDrawer')">
            <md-icon>menu</md-icon>
          </md-button>

          <span class="md-title">{{ ($store.state.courses.filter(function(x) {
            return x.sectionId === $route.params.courseid
            })[0] || {name: "Loading..."}).name }}</span>
          <top-right-menu/>
        </div>


      </div>

      <div class="md-toolbar-row">
        <md-tabs class="md-primary">
          <md-tab :to="'/courses/'+$route.params.courseid" exact="exact" id="tab-home" md-label="Home"></md-tab>
          <md-tab :to="'/courses/'+$route.params.courseid+'/chat'"  exact="exact" id="tab-chat" md-label="Chat"></md-tab>
          <md-tab :to="'/courses/'+$route.params.courseid+'/assignments'" exact="exact" id="tab-pages" md-label="Assignments"></md-tab>
          <md-tab id="tab-posts" md-label="Notes"></md-tab>
        </md-tabs>
      </div>
    </md-app-toolbar>

    <md-app-content style="padding:0;margin:0;border:none;overflow-x:hidden">
      <router-view/>
    </md-app-content>
  </div>
</template>

<script>
// @ is an alias to /src
import courseHome from '@/components/courseHome.vue'
import TopRightMenu from "../components/topRightMenu";

export default {
  name: 'Home',
  props:['courseid'],
  components: {
    TopRightMenu,
    courseHome
  }
}
</script>
<style>
  @media (max-width: 599px) {
    .d-sm-only {
      display: unset;
    }
  }
  @media (min-width: 600px) {

    .d-sm-only{
      display: none;
    }
  }
</style>
