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

</style>

