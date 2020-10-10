<template>
    <md-content style="padding: 1em">
        <h1 class="md-display-1" >{{ ($store.state.courses.filter(function(x) {
            return x.sectionId === $route.params.courseid
            })[0] || {name: "Loading..."}).name }} Assignments</h1>

        <div>
            <md-card v-for="a in $store.state.assignments" :key="a.id" @click="()=>{}">
                <md-card-header>
                    <md-card-header-text>
                        <h2 class="md-title">{{a.title}}</h2>
                        <h4 class="md-subheading">{{a.due | moment("from") | catchDate}}</h4>
                    </md-card-header-text>
                    

                </md-card-header>
                <md-card-content>
                    <p>{{a.description}}</p>
                </md-card-content>
            </md-card>
        </div>
    </md-content>
</template>

<script>
    export default {
        name: "courseAssignments",
        data(){
            return {
                assignments: {
                    aid1:{
                title:"CHEM Classwork: Accuracy & Precision",
                web_url:"https://app.schoology.com/assignment/2875589655",
                description:"Instructions: Please read all instructions before starting1. Click \"launch\" below to start the simulation. Compare the different scenarios (accurate, precise, both, neither).2. Click \"Challenge Me\" to answer some multiple choice questions on accuracy and precision. Skip the last question, which asks you to post to a discussion board.3. Instead of posting to a discussion board, for your submission on this assigment, use the \"Create\" option in assignment submission to write a brief description that explains the difference between accuracy and precision. Make sure your response is in complete sentences. [50 words maximum]Having trouble launching? Try this link. Login Requested? Username: CatalanoStudent Password:GunnTitan1You can also explore more here."
            }}}
        },
        filters:{
            catchDate(value){
                if (value == "Invalid Date"){
                    return "No due date"
                }
                else {
                    return value
                }
            }
        }
    }
</script>

<style scoped>

</style>
