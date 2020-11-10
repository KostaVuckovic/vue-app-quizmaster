<template>
  <div class="wrapper">

    <header>
      <div class="finish">
        <img src="../assets/flag.svg" alt="flag">
        <h2>Finish</h2>
      </div>

      <img :src="avatarImage(this.avatar)" alt="avatar" class="avatar" v-if="this.avatar" @click="showModal">
    </header>

    <section class="container">
     
     <div class="h2-wrapper">
       <h2 v-if="this.score == 0">Better luck next time.</h2>
       <h2 v-else>Congrats!</h2>
     </div>
      
      <div class="score-image">
        <img src="../assets/sad.svg" alt="trophy" v-if="this.score == 0">
        <img src="../assets/trophy.svg" alt="trophy" v-else>

        <div class="usersScore">
          <p class="scoreText">Your score is</p>
          <p class="scoreNumber">{{SCORE}}</p>
        </div>
      </div>

      <div class="buttons">
        <div class="play-logout">
          <div class="play">
            <p class="play-again-text">Play again!</p>
            <button class="play-logout-button" @click="playAgain"><font-awesome-icon :icon="['fas', 'redo-alt']" /></button>
          </div>
          <div class="logout">
            <p class="play-again-text">Logout!</p>
            <button class="play-logout-button" @click="logout"><font-awesome-icon :icon="['fas', 'sign-out-alt']" /></button>
          </div>
        </div>
        
        <button id="leaderboardBtn" class="leaderboardBtn" @click="showLeaderboard">LEADERBOARD</button>
      </div>
    </section>

    

    <Leaderboard v-show="leaderboardVisible" @close="closeLeaderboard">
      <template #score>
        <div class="score" v-for="score in ALLSCORES" :key="score.usr_id">
          <img :src="avatarImage(score.ava_id)" alt="avatar">
          <p class="lead-username">{{score.user_username}}</p> 
          <p class="lead-score">{{score.best_score}}</p></div>

      </template>  
    </Leaderboard>  

    <Modal v-show="isModalVisible" @close="closeModal"
    >
      <template #body class="modalContainer">

        <div class="info">
          <img :src="avatarImage(avatar)" v-if="avatar" class="avatar" alt="avatar">

          <div class="wrap">
            <p><span class="spanUser">Name:</span> {{userName}} </p>
            <p><span class="spanUser">Last name:</span> {{userLastname}} </p>
            <p><span class="spanUser">Username:</span> {{userUsername}} </p>
            <p><span class="spanUser">Best score:</span> {{userBestScore}} </p>
          </div>
        </div>
          
      </template>
    </Modal>
    
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import Leaderboard from '../components/Leaderboard.vue'
import Modal from '@/components/Modal.vue'

export default {
name: 'Finish',
components: {
  Leaderboard,
  Modal
},
data(){
    return {
        score: null,
        scores: [],
        leaderboardVisible: false,
        isModalVisible: false,
        userName: '',
        userUsername: '',
        userLastname: '',
        userBestScore: '',
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
    let sid = localStorage.getItem('sid')
    axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/getInfoForUserModal', {sid})
    .then((response) => {
      this.userName = response.data.info[0].user_name;
      this.userLastname = response.data.info[0].user_lastname;
      this.userUsername = response.data.info[0].user_username;
      this.userBestScore = response.data.info2[0].best_score;
      this.avatar = response.data.info[0].ava_id;
    })
  },
  showScore(){
    let sid = localStorage.getItem('sid');
    axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/showScore', {sid})
    .then((response) => {
      this.score = response.data.score
    })
  },
  getScores(){
    let sid = localStorage.getItem('sid');
    axios.get('http://051b122.mars-e1.mars-hosting.com/quiz/engine/score', {sid})
    .then((response) => {
      this.scores = response.data.score
    })
  },
  logout(){
    let sid = localStorage.getItem('sid')
    axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/auth/logout', {sid})
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
  showModal() {
    this.isModalVisible = true;
  },
  closeModal() {
    this.isModalVisible = false;
  },
  avatarImage(id){
    return require('../assets/avt' + id + '.svg')
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
  @media (min-width: 1025px) { @content; }
}
@mixin desktop {
  @media (min-width: 1281px) { @content; }
}
@mixin big-desktop {
  @media (min-width: 1800px) { @content; }
}

.wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  counter-reset: score;
    & header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1em 1.2em;
      border-left: 5px solid $tamno_plava;
      border-right: 5px solid $tamno_plava;
      border-bottom: 5px solid $tamno_plava;
      width: 100%;
      background-color: $svetlo_plava;
      border-radius: 0 0 40px 40px;
      -webkit-box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
      -moz-box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
      box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
      @include phone{
          padding: 1.8em 1.5em;
          max-width: 550px;
      }
      @include tablet{
          padding: 1.5em 2em;
          max-width: 630px;
      }
      @include laptop{
          padding: .7em 1.6em;
          max-width: 900px;
      }
        & .finish{
          display: flex;
          align-items: center;
            & img{
              width: 50%;
              max-width: 45px;
              @include laptop{
                max-width: 42px;
              }
              margin-right: 1em;  
            }
            & h2{
              color: $bela_kao;
              font-size: 2rem;
              text-align: center;
              margin: 0;
              @include tablet{
                font-size: 2.4rem;
              }
              @include laptop{
                font-size: 1.8rem;
              }
                & span{
                  color: $narandza;
                }
            }
            
        }
        & .avatar{
            width: 12%;
            max-width: 45px;
            @include laptop{
              max-width: 40px;
            }
                &:hover{
                    cursor: pointer;
                }
        }
        
    }
    & .container{
        width: 80%;
        margin-top: 2em;
        background-color: $svetlo_plava;
        border: 1px solid $narandza;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0;
        @include phone{
          max-width: 450px;
        }
        @include tablet{
          max-width: 500px;
          margin-top: 2.5em;
        }
        @include laptop{
          margin-top: 2em;
          max-width: 600px;
        }
          & .h2-wrapper{
            width: 100%;
            background-color: $tamno_plava;
            padding: .5em;
            @include tablet{
              padding: .6em;
            }
            & h2{
              color: $bela_kao;
              font-weight: 500;
              font-size: 1.9rem;
              letter-spacing: 1px;
              text-align: center;
              @include tablet{
                font-size: 2.5rem;
              }
              @include laptop{
                font-size: 2rem;
              }
            }
          }
          & .score-image{
            display: flex;
            align-items: center;
            width: 100%;
            flex-direction: column;
            justify-content: space-around;
            @include laptop{
              flex-direction: row;
              margin-top: 1em;
            }
            & img{
              width: 65%;
              max-width: 220px;
              margin: 1em 0;
              @include laptop{
                max-width: 220px;
              }
            }
            & .usersScore{
              padding: 0 1.5em;
              margin: .5em 0;
              border-radius: 10px;
              text-align: center;
              & .scoreText{
                color: $bela_kao;
                font-size: 1.5rem;
                margin: 0;
                padding-bottom: .3em;
                border-bottom: 1px solid $bela_kao;
                @include tablet{
                  font-size: 1.8rem;
                }
                @include laptop{
                  font-size: 1.5rem;
                }
              }
              & .scoreNumber{
                color: $narandza;
                font-size: 2rem;
                font-weight: 500;
                margin: 0;
                @include tablet{
                  font-size: 2.5rem;
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
            padding: 1em;
              & .play-logout{
                display: flex;
                width: 100%;
                justify-content: space-around;
                align-items: center;
                margin-bottom: 1.5em;
                @include laptop{
                  width: 80%
                }
                & p{
                    color: $bela_kao;
                    font-size: 1.2rem;
                    margin-bottom: .5em;
                    @include laptop{
                      font-size: 1.3rem
                    }
                  }
                & .play-logout-button{
                  border-radius: 50%;
                  font-size: 1.1rem;
                  border: none;
                  text-align: center;
                  margin-bottom: 1em;
                  vertical-align: middle;
                  padding: .2em .4em;
                  margin: 0;
                  @include phone{
                    font-size: 1.2rem;;
                  }
                  @include tablet{
                    font-size: 1.5rem;
                  }
                  @include laptop{
                    font-size: 1.3rem;
                  }
                    &:focus{
                      outline: none;
                    }
                }
                & .play{
                  text-align: center;
                }
                & .logout{
                  text-align: center;
                  padding: .5em;
                }
              }
              & .leaderboardBtn{
                background-color: $narandza;
                border-radius: 10px;
                border: 1px solid $narandza;
                padding: .6em 0;  
                width: 95%;
                max-width: 300px;
                color: $bela_kao;
                font-size: .9rem;
                font-weight: 500;
                @include tablet{
                  font-size: 1rem;
                }
                  &:focus{
                    outline: none;
                  }
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

      .info{
          width: 100%;
          max-width: 300px;
          // margin-top: 5.5em;
          padding: 1em 0;
          background-color: $svetlo_plava;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          border: 1px solid $narandza;
          border-radius: 10px;
          @include phone{
            max-width: 350px;
          }
            & .avatar{
              width: 45%;
              margin-top: -100px;
                @include phone{
                    width: 55%;
                    max-width: 165px;
                    margin-top: -120px;
                }
            }

            & .wrap{
              width: 100%;
              padding: .5em 1.5em;
                & p{
                  color: $bela_kao;
                  margin: 1em 0 0 0;
                  @include phone{
                    font-size: 1.1rem;
                  }
                    & .spanUser{
                      color: $narandza;
                      margin-right: .5em;
                      font-weight: 500;
                    }
                }
            }

            
      }
}


</style>

