<template>
    <div class="md-toolbar-section-end">
    <md-menu v-if="!$store.state.user" :md-close-on-select="true" md-size="medium" :md-offset-x="0" :md-offset-y="8">
        <md-button  md-menu-trigger>
            sign in <md-icon>arrow_drop_down</md-icon>
        </md-button>

        <md-menu-content>
            <md-menu-item @click="signInAsStudent">As Student</md-menu-item>
            <md-menu-item @click="signInAsTeacher">As Teacher</md-menu-item>
        </md-menu-content>
    </md-menu>
    <md-menu v-if="$store.state.user"  :md-close-on-select="true" md-size="medium" :md-offset-x="0" :md-offset-y="8">
        <md-button  md-menu-trigger>
            <span class="md-small-hide">{{$store.state.user.displayName}}  </span>
            <md-avatar class="d-sm-only md-small">
            <img :src="$store.state.user.photoURL" />
        </md-avatar> <md-icon>arrow_drop_down</md-icon>
        </md-button>

        <md-menu-content>
            <md-menu-item @click="()=>{}">Settings</md-menu-item>
            <md-menu-item @click="()=>{}">About</md-menu-item>
            <md-menu-item @click="signOut">Sign Out</md-menu-item>
        </md-menu-content>
    </md-menu>
        <md-button @click="toggleTheme" class="md-icon-button">
            <md-icon >brightness_medium</md-icon>
        </md-button>
    </div>
</template>

<script>
    import {auth, studentProvider, teacherProvider} from "../firebase";


    export default {
        name: "topRightMenu",
        data(){
            return {
                darkMode:false
            }
        },
        methods:{
            signInAsStudent(){
                // the server will handle all
                auth.signInWithRedirect(studentProvider)
            },
            signInAsTeacher(){
                auth.signInWithRedirect(teacherProvider)
            },
            signOut(){
                auth.signOut().then(function () {
                    this.$router.push("/");
                    this.$store.commit('setCourses',[])
                })
            },
            toggleTheme(){
                this.$store.dispatch('toggleTheme')
            }
        }
    }
</script>

<style scoped>
    @media (max-width: 599px) {
        .d-sm-only {
            display: inline-flex;
        }
    }
    @media (min-width: 600px) {

        .d-sm-only{
            display: none;
        }
    }
</style>
