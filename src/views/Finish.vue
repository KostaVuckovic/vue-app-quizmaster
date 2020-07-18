<template>
  <div class="wrapper">
    <div class="container">

      <div class="usersScoreWrap">
        <h1>Your score is <span class="usersScore line-1 anim-typewriter">{{SCORE}}</span> </h1>
      </div>

      <div class="buttons">
        <button @click="playAgain"><span class="material-icons">play_circle_outline</span> <span>Play again</span></button>
        <button @click="logout"><span class="material-icons">exit_to_app</span> <span>Logout</span></button>
        
      </div>

      <div class="leaderbord">
        <h1>Top 10 scores</h1>
        <div class="scoreWrapper">
          <div class="score" v-for="s in ALLSCORES" :key="s.usr_id"><span>{{s.user_username}}</span> <span>{{s.best_score}}</span> </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
name: 'Finish',
data(){
    return {
        score: null,
        scores: []
    }
},
created(){
  this.showScore();
  this.addScore()
},
computed: {
    SCORE(){
      return this.score;
    },
    ALLSCORES(){
      return _.orderBy(this.scores, ['best_score'], ['desc']) ;
    }
},
beforeRouteEnter (to, from, next) {
  let sid = localStorage.getItem('sid');
  axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/initScripts/sessioncheck', {sid: sid})
  .then(() => {
      next()
  })
  .catch(() => {
      next('/login')
  })
},
methods: {
  showScore(){
    let sid = localStorage.getItem('sid');
    axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/showScore', {sid: sid})
    .then((response) => {
      this.score = response.data.score
    })
  },
  addScore(){
    let sid = localStorage.getItem('sid');
    axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/score', {sid:sid})
    .then(() => {
      return axios.get('http://051b122.mars-e1.mars-hosting.com/quiz/engine/score')
      .then(response => {
        this.scores = response.data.score
      })
    })
  },
  logout(){
    let sid = localStorage.getItem('sid')
    axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/auth/logout', {sid: sid})
      .then(() => {
        localStorage.clear()
        this.$router.push({name: 'Login'})
      })
  },
  playAgain(){
    this.$router.push({name: 'Categories'})
  }
}
}
</script>

<style scoped>
.wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: url('../assets/quiz11.jpg') repeat center center fixed;
    background-repeat: repeat;
    background-position: center;
    background-size: cover;
}

.container{
    width: 70%;
    max-width: 880px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80%;
    max-height: 750px;
    justify-content: space-around;
    background-color: #3a3a3c;
    border-radius: 5px;
}

.buttons{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons button{
  margin-top: 1rem;
  padding: 10px;
  border-radius: 5px;
  border: none;
  display: inline-flex;
  align-items: center; 
  box-shadow: inset 0 0 0 0 #3d5af1;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
}

.buttons button:hover{
  box-shadow: inset 0 0 0 50px #3d5af1;
  color: #fff;
}

.buttons span{
  font-size: 1.7rem;
}

.usersScoreWrap{
  padding: 20px 25px;
  /* width: 65%; */
  text-align: center;
  background-color: #e2f3f5;
  border-radius: 5px;
}

.usersScore{
  color: green;
  padding: 0 10px 0 10px;
}

.usersScoreWrap h1 {
  font-size: 2rem;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  animation: 
    typing 2s steps(40, end),
    blink-caret .75s step-end 8;
    border-right: .15em solid transparent;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}


.leaderbord{
  height: 55%;
  width: 90%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  border-radius: 5px;
  counter-reset: score;
}

.leaderbord h1{
  text-align: center;
  display: inline-block;
  color: #3d5af1;
  font-size: 3rem;
  font-weight: 900;
}

.scoreWrapper{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 70%;
  justify-content: space-around;
  align-items: center;
}

.score::before{
  counter-increment: score;
  content:  counter(score) ". ";
  margin-right: 10px;

}

.score:first-child::before{
  font-family: "Material Icons";
  content: "grade";
  color: yellow;
  display: block;
  margin-right: 10px;
}

.score{
  height: 18%;
  width: 40%;
  display: inline-flex;
  padding: 0 10px;
  align-items: center;
  border: 1px solid #0e153a;
  background-color: #e2f3f5;
  font-size: 1.9rem;
  color: #3d5af1;
  border-radius: 5px;
}

.score span:last-child{
  margin-left: auto;
}

@media screen and (max-width: 349px){
.wrapper{
  background: url('../assets/quiz1.jpg') repeat center center fixed;
  background-size: cover;
}

.container{
    width: 100%;
    height: 70%;
}

.buttons{
  width: 100%;
}

.buttons button{
  padding: 7px;
}

.buttons span{
  font-size: 1rem;
}

.usersScoreWrap{
  padding: 15px 25px;
}

.usersScoreWrap h1{
  font-size: 1.1rem;
}

.leaderbord{
  width: 100%;
}

.leaderbord h1{
  font-size: 1.5rem;
}

.scoreWrapper{
  height: 75%;
}

.score{
  height: 18%;
  width: 45%;
  font-size: 1rem;
}
}

@media screen and (min-width: 350px) and (max-width: 600px){
.wrapper{
  background: url('../assets/quiz111.jpg') repeat center center fixed;
  background-size: cover;
}

.container{
    width: 100%;
    max-width: 500px;
    height: 70%;
}

.buttons{
  width: 100%;
}

.buttons button{
  padding: 7px;
}

.buttons span{
  font-size: 1.1rem;
}

.usersScoreWrap{
  padding: 10px 25px;
}

.usersScoreWrap h1{
  font-size: 1.4rem;
}

.leaderbord{
  width: 100%;
}

.leaderbord h1{
  font-size: 1.7rem;
}

.scoreWrapper{
  height: 75%;
}

.score{
  font-size: 1.3rem;
  width: 45%;
}
}

@media screen and (min-width: 601px) and (max-width: 950px){
.wrapper{
  background: url('../assets/quiz111.jpg') repeat center center fixed;
  background-size: cover;
}

.container{
    width: 80%;
    max-width: 600px;
    height: 73%;
}

.buttons{
  width: 100%;
}

.buttons span{
  font-size: 1.2rem;
}

.usersScoreWrap{
  padding: 15px 25px;
}

.usersScoreWrap h1{
  font-size: 1.9rem;
}

.leaderbord{
  width: 100%;
}

.leaderbord h1{
  font-size: 2.4rem;
}

.scoreWrapper{
  height: 75%;
}

.score{
  width: 45%;
  font-size: 1.4rem;
}
}

@media screen and (min-width: 951px) and  (max-width: 1450px){
.container{
  max-height: 700px;
  min-width: 700px;
  max-width: 800px;
}

.buttons span{
  font-size: 1.3rem;
}

.usersScoreWrap{
  padding: 10px 20px;
}

.usersScoreWrap h1{
  font-size: 2rem;
}

.score{
  font-size: 1.3rem;
  padding: 5px 10px;
}
}
</style>

