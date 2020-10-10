<template>
  <div class="page-container">
    <md-app   :md-theme="$store.state.darkMode? 'default-dark':'default-light'"  md-mode="fixed-last" :md-scrollbar="false">
      <md-app-drawer :md-active.sync="$store.state.showDrawer" v-if="$store.state.courses.length>0" md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <h1 >Courses</h1>
        </md-toolbar>

        <md-list class="md-double-line">
          <div v-for="course in $store.state.courses" >
            <md-list-item  :to="'/courses/'+course.sectionId" :key="course.sectionId"  >
              <md-avatar>
                <img :src="course.photoURL">
              </md-avatar>

              <div class="md-list-item-text">
                <span style="font-weight: bold">{{course.name}}</span>
                <span>{{course.section}}</span>

              </div>
              <!--<md-badge v-if="course.sectionId==='2772301852'" class="md-primary " md-content="2" />-->

            </md-list-item>
          </div>

        </md-list>
      </md-app-drawer>

      <md-app-content  style="padding:0;margin:0;border:none;overflow-x:hidden">
       <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<style  scoped>
  /*#556c1433*/
  .md-app {
    height: 100vh;

  }
.router-link-active{
  background-color: #556c1433; /* for the courses */
}

  .router-link-active:hover{
    background-color: #556c1433 !important;
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }


.md-app-container{
  overflow-x: hidden !important;
}
  /* Hide scrollbar for Chrome, Safari and Opera */
  .hide-sb::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .hide-sb {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  
</style>
<style lang="scss">
  @import "~vue-material/dist/theme/engine";
  $primary: md-get-palette-color(lightgreen, 800);
  $accent: md-get-palette-color(deeporange,300); //#de7758;
  @include md-register-theme("default-dark", (
          primary: $primary, // The primary color of your application
          accent: $accent, // The accent or secondary color
          theme: dark
  ));

  @include md-register-theme("default-light", (
          primary: $primary, // The primary color of your application
          accent: $accent, // The accent or secondary color
          theme: light
  ));

  @import "~vue-material/dist/theme/all"; // Apply the theme
</style>
<script>
  import Home from "./views/courseView";
  export default {
    name: 'App',
    components: {Home}
  }
</script>

