<template>
  <md-content style="padding:0;padding-top: 2em" >

    <h1 class="md-display-1" style="color:black">
      <span style="padding-left: 2em">{{ ($store.state.courses.filter(function(x) {
            return x.sectionId === $route.params.courseid
        })[0] || {name: "Loading..."}).name }}</span></h1>
    <div style="padding-left:5em;">
      <p>If someone could suggest what goes here, that would be great</p>
    </div>

  </md-content>
</template>

<script>
export default {
  name: 'courseHome',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
