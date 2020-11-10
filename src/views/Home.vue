<template>
  <div class="home">

    <header>
      <h2>Quiz <span>Master</span></h2>
      <img id="img" class="img" src="../assets/laptop_bg2.svg" alt="quiz">
      <button id="leaderboardBtn" class="leaderboardBtn" @click="showLeaderboard">LEADERBOARD</button>
      
      <div class="headerButtons">
        <p class="btnLaptop" @click="showLeaderboard">LEADERBOARD</p>
        <p class="btnLaptop" @click="signUp()">SIGN UP</p>
        <p class="btnLaptop" @click="signIn()">SIGN IN</p>
      </div>
    </header>

    <div class="buttons">
      <button class="btn" @click="signUp()">SIGN UP</button>
      <button class="btn" @click="signIn()">SIGN IN</button>
    </div>

    <div class="containerLaptop">
      <div class="containerText">
        <h1 class="firstH">Quiz</h1>
        <h1 class="secondH">Master</h1>
        <p class="textIn"><span class="spanOrange">Hello</span>, you have big brain and time to play?</p>
        <p class="textIn">First, <span class="spanOrange">sign up</span> and <span class="spanOrange">play</span> quiz!</p>
        <button class="btn" @click="signUp()">SIGN UP</button>
      </div>

      <img src="../assets/laptop_bg2.svg" alt="quiz">
    </div>

    <Leaderboard v-show="leaderboardVisible" @close="closeLeaderboard">
      <template #score>
        <div class="score" v-for="score in scores" :key="score.usr_id">
          <img :src="avatarImage(score.ava_id)" alt="">
          <p class="lead-username">{{score.user_username}}</p> 
          <p class="lead-score">{{score.best_score}} pts</p></div>
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
  @media (min-width: 768px) { @content; }
}
@mixin laptop {
  @media (min-width: 1024px) { @content; }
}
@mixin desktop {
  @media (min-width: 1280px) { @content; }
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
  @include laptop{
    justify-content: flex-start;
  }
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
      @include laptop{
        animation: none; 
        padding: .7em 2.5em;
        flex-direction: row;
        border-radius: 0 0 20px 20px;
        border-bottom: 5px solid $tamno_plava;
        max-width: 1500px;
      }
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
          @include laptop{
            font-size: 2.2rem;
            animation: none;
            opacity: 1;
              &:hover{
                cursor: default;
              }
          }
            & span{
              color: $narandza;
            }
        }
        & .img{
          width: 80%;
          max-width: 350px;
          animation-duration: 2s;
          animation-name: opacityAnimation;
          animation-delay: 2s;
          animation-fill-mode: forwards;  
          opacity: 0;
          @include phone{
            max-width: 470px;
          }
          @include tablet{
            max-width: 590px;
            width: 70%;
          }
          @include laptop{
            max-width: 400px;
            width: 60%;
            margin: 1em 0;
            display: none;
          }
        }
        & .leaderboardBtn{
          background-color: $narandza;
          border-radius: 10px;
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
          @include phone{
            font-size: 1.2rem;
            max-width: 350px;
            padding: .6em .2em;
          }
          @include tablet{
            font-size: 1.4rem;
            max-width: 450px;
            padding: .7em .2em;
          }
          @include laptop{
            font-size: 1rem;
            max-width: 350px;
            padding: .4em .2em;
            margin-top: 1em;
            border-radius: 10px;
            display: none;
          }
            &:focus{
              outline: none;
            }
        } 

        .headerButtons{
          display: none;
          @include laptop{
            display: block;
            display: flex;
          }
            & .btnLaptop{
              display: none;
              @include laptop{
                display: block;
                margin: 0 0 0 1.5em;
                color: $bela_kao;
                font-size: .9rem;
                  &:hover{
                    cursor: pointer;
                  }
              }
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
          border-radius: 10px;
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
            padding: .7em .2em;
            margin-bottom: 15px;
          }
          @include laptop{
            font-size: 1rem;
            max-width: 350px;
            padding: .4em .2em;
            margin-top: 1em;
            border-radius: 10px;
            display: none;
          }
        }
    }

    & .containerLaptop{
      display: none;
      @include laptop{
        display: block;
        display: flex;
        justify-content: space-around;
        width: 100%;
        max-width: 1400px;
        margin-top: 2em;
      }
        & img{
          width: 45%;
          max-width: 600px;
        }
        & .containerText{
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
            & .firstH{
              color: $bela_kao;
              font-size: 6rem;
              margin: 0;
              line-height: 0;
            }
            & .secondH{
              color: $narandza;
              font-size: 6rem;
              margin: 0 0 .2em 0;
            }
            & .textIn{
              color: $bela_kao;
              margin: 0;
              font-size: 1.5rem;
                & .spanOrange{
                  color: $narandza;
                  font-weight: 500;
                }
            }
            & .btn{
              background-color: $narandza;
              border-radius: 10px;
              border: 1px solid $narandza;
              padding: .6em 1em;
              width: 65%;
              max-width: 200px;
              color: $bela_kao;
              font-size: 1rem;
              font-weight: 500;
              margin-top: 1em;
            }
            &:hover{
              cursor: default;
            }
        }
    }

    & .score{
      display: flex;
      align-items: center;
      padding: .3em .7em;
      border: 1px solid $bela_kao;
      border-radius: 10px;
      margin-top: .5em;
      background-color: $svetlo_plava;
      @include laptop{
        padding: .2em .7em;
      }
        &::before{
          counter-increment: score;
          content:  counter(score) ". ";
          font-weight: 500;
          color: $bela_kao;
        }
        &:first-child{
          border: 1px solid $narandza;
            &::before{
              font-family: "Material Icons"; 
              font-weight: 900; 
              content: "emoji_events";
              display: inline-block;
              vertical-align: middle;
              color: $narandza;
              font-size: 1.5rem;
            }
        }
        & img{
          width: 9%;
          margin: 0 0 0 1em;
          @include laptop{
            max-width: 27px;
          }
        }
        & .lead-username{
          margin: 0 0 0 1em;
          color: $bela_kao;
          @include laptop{
            font-size: .9rem;
          }
        }
        & .lead-score{
          color: $narandza;
          margin: 0 0 0 auto;
          @include laptop{
            font-size: .9rem;
          }
        }
      }
}


</style>
