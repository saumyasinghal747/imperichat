<template>
    <md-content class="md-accent" v-if="$store.state.user" style="overflow: hidden">




        <md-list  style="overflow: scroll;position: fixed;bottom: 75px;top:0;width:100%"  class="md-double-line messages hide-sb" v-chat-scroll="{smooth:!true,notSmoothOnInit: true}">
            <h1  class="md-display-3">{{ ($store.state.courses.filter(function(x) {
                return x.sectionId === $route.params.courseid
                })[0] || {name: "Loading..."}).name }}</h1>
            <div  style="margin-right: auto;margin-left: auto;padding-top: 2em" v-if="$store.state.messages.length===0" >
                <md-progress-spinner class="md-accent " md-mode="indeterminate"/>
            </div>
            <md-list-item @click="()=>{}" v-for="(msg, index) in $store.state.messages" v-bind:key="index" class="md-double-line message ">
                <md-avatar>
                    <img  :src="msg.senderPhoto||'https://placekitten.com/1000/1000'" />
                </md-avatar>
                <div class="md-list-item-text">
                   <p><span >{{msg.senderName}}</span> <span v-if="msg.bot" class="bot-badge">BOT</span>  <span style="margin-left: 1em">{{msg.time | moment("from")}}</span></p>
                    
                    <p style="margin-top: 0.5em" >{{msg.message}}</p>
                </div>
            </md-list-item>

        </md-list>
        <div><md-progress-bar  class="md-accent" md-mode="indeterminate"></md-progress-bar></div>
        <md-field style="position: fixed;bottom:5px;width: 90%;left: 20px">

            <label for="message">Message</label>
            <md-input md-autogrow name="message"  id="message" autocomplete="given-name" @keypress.enter.prevent="sendMessage" v-model="cmessage" />
            <md-button @click="sendMessage" class="md-icon-button">
               <md-icon>send</md-icon>
            </md-button>
        </md-field>
    </md-content>
</template>

<script>
    import {auth} from "../firebase";

    export default {
        name: "chat",
        data: ()=>{return {
            cmessage:"",
            sending:false
        }},
        methods:{
            sendMessage(){
                if (this.cmessage.trim().length===0){
                    return false;
                }
                const theGreaterGood = this;
                const message = this.cmessage;
                this.cmessage = "";
                // send a token and a message to the backend server. It shall handle the rest. Use await so you
                // only empty the thing after. Disable the input thing while it sends.
                /*this.$store.state.messages.push({
                    message: this.cmessage, //tampering with this is fine i guess
                    senderName: auth.currentUser.displayName, // someone could tamper with this and we would not want that
                    senderId: auth.currentUser.uid,
                    senderPhoto: auth.currentUser.photoURL, // or this
                    time:new Date() // tampering with this - not cool. needs to be generated server side.
                });*/
                // send a post request to the server
                auth.currentUser.getIdToken(false).then(function (token) {
                    theGreaterGood.sending = true;
                    fetch('https://mangoice.herokuapp.com/imperichat/message',{
                        method:'post',
                        headers:{
                            "Content-Type":"application/json",
                            "Access-Control-Allow-Origin":"*"
                        },

                        body: JSON.stringify({
                            message: message.trim(),
                            sectionId:theGreaterGood.$route.params.courseid,
                            token
                        })
                    }).then(function (response) {
                        theGreaterGood.sending = false
                        //theGreaterGood.cmessage =  "";
                    if (response.statusCode == 201){
                    

                    }
                    }).catch(function () {
                        theGreaterGood.sending = false
                    })


                })

            }
        }
    }
</script>

<style scoped>
    /* Hide scrollbar for Chrome, Safari and Opera */
    .hide-sb::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .hide-sb {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }


    .bot-badge{
        margin-left: 1em;
        background-color: var(--md-theme-default-light-accent, #ff8a65);
        padding: 3px 4px;
        border-radius: 4px;
        font-size: 0.7rem !important;
        font-weight: bold;
        color:white !important;
    }
</style>
