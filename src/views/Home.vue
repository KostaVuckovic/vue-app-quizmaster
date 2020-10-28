<template>
  <div class="home">

    <header>
      <h2>Quiz <span>Master</span></h2>
      <img id="img" class="img" src="../assets/quiz_bg2.svg" alt="quiz">
      <button id="leaderboardBtn" class="leaderboardBtn" @click="showLeaderboard">LEADERBOARD</button>
    </header>

    <div class="buttons">
      <button class="btn" @click="signUp()">SIGN UP</button>
      <button class="btn" @click="signIn()">SIGN IN</button>
    </div>

    <Leaderboard v-show="leaderboardVisible" @close="closeLeaderboard">
      <template name="score">
        <div class="score" v-for="score in scores" :key="score.usr_id">
          <img :src="avatarImage(score.ava_id)" alt="">
          <p class="lead-username">{{score.user_username}}</p> 
          <p class="lead-score">{{score.best_score}}</p></div>
      </template>  
    </Leaderboard>  

  </div>
</template>

<script>
import Leaderboard from '../components/Leaderboard.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Leaderboard
  },
  data(){
    return{
      scores: [],
      leaderboardVisible: false
    }
  },
  mounted(){
    this.getScores()
  },
  methods: {
    signUp(){
      this.$router.push({name: 'SignUp'})
    },
    signIn(){
      this.$router.push({name: 'Login'})
    },
    getScores(){
      axios.get('http://051b122.mars-e1.mars-hosting.com/quiz/engine/score')
      .then((response) => {
        this.scores = response.data.score
      })
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

@mixin phone {
  @media (min-width: 480px) { @content; }
}
@mixin tablet {
  @media (min-width: 769px) { @content; }
}
@mixin laptop {
  @media (min-width: 1025px) { @content; }
}
@mixin desktop {
  @media (min-width: 1281px) { @content; }
}
@mixin big-desktop {
  @media (min-width: 1800px) { @content; }
}

@keyframes sectionDown {
  from {
    height: 0;
  }
  to {
    height: 75%;
  }
}

@keyframes opacityAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.home{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  counter-reset: score;
    & header{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      background-color: $svetlo_plava;
      padding: 1.4em 0;
      width: 100%;
      animation-duration: 2s;
      animation-name: sectionDown;
      animation-fill-mode: forwards;  
      transition: height 2s;
      border-radius: 0 0 40px 40px;
      -webkit-box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
      -moz-box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
      box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
        & h2{
          color: $bela_kao;
          text-align: center;
          font-size: 2.8rem;
          animation-duration: 2s;
          animation-name: opacityAnimation;
          animation-delay: 2s;
          animation-fill-mode: forwards;  
          opacity: 0;
          font-weight: 500;
          letter-spacing: -1px;
          @include phone { 
              font-size: 4rem;
            }
          @include tablet{
            font-size: 5rem;
          }
            & span{
              color: $narandza;
            }
        }
        & .img{
          width: 75%;
          max-width: 300px;
          animation-duration: 2s;
          animation-name: opacityAnimation;
          animation-delay: 2s;
          animation-fill-mode: forwards;  
          opacity: 0;
          @include phone{
            max-width: 450px;
          }
          @include tablet{
            max-width: 580px;
          }
        }
        & .leaderboardBtn{
          background-color: $narandza;
          border-radius: 20px;
          border: 1px solid $narandza;
          padding: .9em 3em;
          animation-duration: 2s;
          animation-name: opacityAnimation;
          animation-delay: 2s;
          animation-fill-mode: forwards;  
          opacity: 0;
          width: 85%;
          max-width: 300px;
          color: $bela_kao;
          font-size: 1rem;
          font-weight: 500;
          @include phone{
            font-size: 1.2rem;
            max-width: 350px;
            padding: .6em .2em;
          }
          @include tablet{
            font-size: 1.4rem;
            max-width: 450px;
            padding: .6em .2em;
          }
            &:focus{
              outline: none;
            }
        } 
    }
    & .buttons{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 2px 0;
        & .btn{
          background-color: $narandza;
          border-radius: 20px;
          border: 1px solid $narandza;
          padding: .9em 3em;
          width: 85%;
          max-width: 300px;
          color: $bela_kao;
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 10px;
          @include phone{
            font-size: 1.2rem;
            max-width: 350px;
            padding: .6em .2em;
          }
          @include tablet{
            font-size: 1.4rem;
            max-width: 450px;
            padding: .6em .2em;
          }
        }
    }
    & .score{
      display: flex;
      align-items: center;
      padding: .3em .7em;
      border: 1px solid $bela_kao;
      border-radius: 10px;
      margin-bottom: .5em;
      background-color: $svetlo_plava;
        &::before{
          counter-increment: score;
          content:  counter(score) ". ";
          font-weight: 500;
          color: $bela_kao;
        }
        &:first-child::before{
          font-family: "Material Icons"; 
          font-weight: 900; 
          content: "emoji_events";
          display: inline-block;
          vertical-align: middle;
          color: $narandza;
          font-size: 1.5rem;
        }
        & img{
          width: 9%;
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
