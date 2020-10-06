<template>
    <md-content v-if="$store.state.user" style="overflow: hidden">
        <h1 >{{ ($store.state.courses.filter(function(x) {
            return x.sectionId === $route.params.courseid
            })[0] || {name: "Loading..."}).name }}</h1>
        <md-list  style="overflow: scroll;height: 70vh"  class="md-double-line messages" v-chat-scroll="{smooth:true,notSmoothOnInit: true}">
            <md-list-item v-for="(msg, index) in $store.state.messages" v-bind:key="index" class="md-double-line message">
                <md-avatar>
                    <img  :src="msg.senderPhoto" alt="SO"/>
                </md-avatar>
                <div class="md-list-item-text">
                   <p><span >{{msg.senderName}}</span>  <span style="margin-left: 1em">{{msg.time | moment("from")}}</span></p>

                    <p style="margin-top: 0.5em" >{{msg.message}}</p>
                </div>
            </md-list-item>

        </md-list>
        <md-field>
            <label for="message">Message</label>
            <md-input name="message" id="message" autocomplete="given-name" @keypress.enter.prevent="sendMessage" v-model="cmessage" />
        </md-field>
    </md-content>
</template>

<script>
    import {auth} from "../firebase";

    export default {
        name: "chat",
        data: ()=>{return {
            cmessage:""
        }},
        methods:{
            sendMessage(){
                // send a token and a message to the backend server. It shall handle the rest. Use await so you
                // only empty the thing after. Disable the input thing while it sends.
                this.$store.state.messages.push({
                    message: this.cmessage, //tampering with this is fine i guess
                    senderName: auth.currentUser.displayName, // someone could tamper with this and we would not want that
                    senderId: auth.currentUser.uid,
                    senderPhoto: auth.currentUser.photoURL, // or this
                    time:new Date() // tampering with this - not cool. needs to be generated server side.
                });
                this.cmessage =  ""
            }
        }
    }
</script>

<style scoped>

</style>
