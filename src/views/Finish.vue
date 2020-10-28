<template>
  <div class="wrapper">

    <header>
      <div class="finish">
        <img src="../assets/flag.svg" alt="flag">
        <h2>Finish</h2>
      </div>
      <img :src="avatarImage(this.avatar)" alt="avatar" v-if="this.avatar">
        
    </header>

    <div class="trophy">
     
      <h2 v-if="this.score == 0">I'm sorry.</h2>
      <h2 v-else>Congrats!</h2>

      <img src="../assets/depression.svg" alt="trophy" v-if="this.score == 0">
      <img src="../assets/trophy.svg" alt="trophy" v-else>

      <p>Your score is <span>{{SCORE}}</span></p>
    </div>

    <div class="buttons">
      <button class="play-again" @click="playAgain"><font-awesome-icon :icon="['fas', 'redo-alt']" /></button>
      <button id="leaderboardBtn" class="leaderboardBtn" @click="showLeaderboard">LEADERBOARD</button>
    </div>

    <Leaderboard v-show="leaderboardVisible" @close="closeLeaderboard">
      <template name="score">
        <div class="score" v-for="score in ALLSCORES" :key="score.usr_id">
          <img :src="avatarImage(score.ava_id)" alt="">
          <p class="lead-username">{{score.user_username}}</p> 
          <p class="lead-score">{{score.best_score}}</p></div>

      </template>  
    </Leaderboard>  
    
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import Leaderboard from '../components/Leaderboard.vue'

export default {
name: 'Finish',
components: {
  Leaderboard
},
data(){
    return {
        score: null,
        scores: [],
        leaderboardVisible: false,
        username: '',
        name: '',
        lastname: '',
        avatar: null

    }
},
mounted(){
  this.showScore();
  this.getScores();
  this.getInfoForUser()
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
  getInfoForUser(){
    axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/getInfoForUserModal', {sid: localStorage.getItem('sid')})
    .then((response) => {
      this.name = response.data.info[0].user_name;
      this.lastname = response.data.info[0].user_lastname;
      this.username = response.data.info[0].user_username;
      this.avatar = response.data.info[0].ava_id;
    })
  },
  showScore(){
    let sid = localStorage.getItem('sid');
    axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/showScore', {sid: sid})
    .then((response) => {
      this.score = response.data.score
    })
  },
  getScores(){
    let sid = localStorage.getItem('sid');
    axios.get('http://051b122.mars-e1.mars-hosting.com/quiz/engine/score', {sid:sid})
    .then((response) => {
      this.scores = response.data.score
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
  },
  showLeaderboard(){
    this.leaderboardVisible = true
  },
  closeLeaderboard(){
    this.leaderboardVisible = false
  },
  avatarImage(id){
    return require('../assets/avatar' + id + '.svg')
  },
}
}
</script>

<style lang="scss" scoped>
$tamno_plava: #252b41;
$svetlo_plava: #2c4058;
$narandza: #e78230;
$bela_kao: #cadbe5; 

.wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
    & header{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5em 1.1em;
      width: 100%;
      background-color: $svetlo_plava;
      border-radius: 0 0 40px 40px;
      -webkit-box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
      -moz-box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
      box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
      counter-reset: score;
        & .finish{
          display: flex;
          justify-content: center;
            & img{
            width: 15%;
            margin-right: 1em;
            }
            & h2{
                font-size: 2.2rem;
                margin: 0;
                color: $bela_kao;
            }
        }
        img{
          width: 12%;
        }
        
    }
    & .trophy{
        width: 100%;
        margin-top: 1.2em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1em;
          & img{
            width: 50%;
            margin: 1em 0;
          }
          & h2{
            color: $narandza;
            font-weight: 800;
            font-size: 2.5rem;
            letter-spacing: 2px;
          }
          p{
            color: $bela_kao;
            font-size: 2rem;
              & span{
                color: $narandza;
                font-weight: 500;
              }
          }
      }
      & .buttons{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        & .play-again{
          border-radius: 50%;
          font-size: 1.9rem;
          border: none;
          text-align: center;
          margin-bottom: 1em;
          vertical-align: middle;
          padding: .2em .4em;
            &:focus{
              outline: none;
            }
        }
        & .leaderboardBtn{
          background-color: $narandza;
          border-radius: 20px;
          border: 1px solid $narandza;
          padding: .9em 3em;  
          width: 85%;
          max-width: 300px;
          color: $bela_kao;
          font-size: 1rem;
          font-weight: 500;
            &:focus{
              outline: none;
            }
        }
      }
      & .score{
        display: flex;
        align-items: center;
        padding: .3em .5em;
        border: 1px solid $bela_kao;
        border-radius: 10px;
        margin-bottom: .5em;
        background-color: $svetlo_plava;
          &::before{
            counter-increment: score;
            content:  counter(score) ". ";
            margin-right: 10px;
            font-weight: 500;
            color: $bela_kao;
          }
          &:first-child::before{
            font-family: "Material Icons"; 
            font-weight: 900; 
            content: "emoji_events";
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
            color: $narandza;
            font-size: 1.5rem;
          }
          & img{
            width: 10%;
            margin: 0 0 0 1em;
          }
          & .lead-username{
            margin: 0 0 0 1em;
            color: $bela_kao;
          }
          & .lead-score{
            color: $narandza;
            margin: 0 0 0 auto;
            
          }
      }
}


</style>

