<template>
  <div class="wrapper">
    <header>
        <img :src="getImgUrl(this.category_id)" alt="category" v-if="category_id">
        <h2>{{category_name}}</h2>
    </header>

    <div class="progress2 progress-moved">
        <div class="progress-bar2">
        </div>                       
    </div> 

    <div class="score">
        <p>Score: <span>{{SCORE}}</span></p>
        <p><span>{{QUESTS}}</span>/5</p>
    </div>
    
    <div class="question">
        <transition name="slide-fade">
            <p v-if="showQuestion">{{QUESTION}}</p>
        </transition>
    </div>
   
    <div class="answer-check-wrapper">
        <transition name="fade">
            <p class="answer-check correct" v-if="correctShow">{{CHECK_ANSWER}}</p>
            <p class="answer-check wrong" v-if="wrongShow">{{CHECK_ANSWER}}</p>
        </transition>
    </div>

    <div class="answer">
        <input type="text" class="answer-input" v-model="answerModel" @keyup.enter="sendAnswer(answerModel, question.que_id)">
        <button @click="sendAnswer(answerModel, question.que_id)">SUBMIT</button>
    </div>
    
  </div>
</template>

<script>
import axios from "axios"
import _ from 'lodash'

export default {
name: 'PlaygroundTwo',
data(){
    return{
        question: '',
        answerModel: '',
        questionCount: 0,
        score: null,
        countdown: 0,
        timer: null,
        correctAnswer: null,
        category_name: '',
        category_id: null,
        checkAnswer: '',
        showQuestion: false,
        correctShow: false,
        wrongShow: false
    }
},
mounted(){
    this.showQuestions(this.score)   
    // this.countDownTimer()
},
computed: {
    SCORE(){
        return this.score;
    },
    QUESTS(){
        return this.questionCount
    },
    CHECK_ANSWER(){
        return this.checkAnswer
    },
    QUESTION(){
        return this.question.que_question
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
    showQuestions(scoreStageTwo){
        this.correctShow = false
        this.wrongShow = false
        let sid = localStorage.getItem('sid');
        axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/stage_two', {scoreStageTwo:scoreStageTwo,  sid: sid})
        .then((response) => {
            this.category_name = response.data.question.category_name
            this.category_id = response.data.question.category_id
            if(this.questionCount < 5){
                this.showQuestion = true
                this.question = response.data.question
                this.questionCount += 1
                this.score = response.data.question.score2
                let sid = localStorage.getItem('sid');
                axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/asked_questions_two', {sid: sid, stage_two_id: response.data.question.que_id})
            }else{ 
                clearTimeout(this.timer)
                this.countdown = 0  
                axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/score', {sid:sid})
                .then(() => {
                    this.$router.push({name: 'Finish'})  
                }) 
            }
        })
    },
    getImgUrl(cat) {
        return require('../assets/cat' + cat + '.svg')
    },
    sendAnswer: _.debounce(
        function (ans, id) {
        let sid = localStorage.getItem('sid');
        axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/answer_check', {sid: sid, answer: ans, id: id })
        .then((response) => {
            if(response.data.check === 'CORRECT'){
                this.score += 5;
                this.correctShow = true
                // document.querySelector('.answer-check').style.color = "green"
                this.checkAnswer = "Correct!"
                setTimeout(() => {
                    this.showQuestion = false 
                }, 500)
                setTimeout(() => {
                    this.countdown = 0
                    this.checkAnswer = ''
                    this.showQuestions(this.score)
                }, 1200)
                this.answerModel = ''
            }else{
                this.wrongShow = true
                this.score -= 5;
                if(this.score < 0){
                    this.score = 0
                }
                // document.querySelector('.answer-check').style.color = "red"
                this.checkAnswer = response.data.answer
                setTimeout(() => {
                    this.showQuestion = false
                }, 500)
                setTimeout(() => {
                    this.countdown = 0
                    this.checkAnswer = '' 
                    this.showQuestions(this.score)
                }, 1200)
                this.answerModel = ''
            }
        })
    }, 200),
    countDownTimer(){
        if(this.countdown < 20) {
            this.timer = setTimeout( () => {
                this.countdown += 1
                document.querySelector('.progress-bar2').style.width = (this.countdown*5) + '%';
                this.countDownTimer(this.score)
            }, 1000)
        }else if(this.questionCount < 5){
            this.score -= 5
            if(this.score < 0){
                this.score = 0
            }
            this.countdown = 0
            this.countDownTimer()
            this.showQuestions(this.score)
        }else{
            clearTimeout(this.timer)
            this.countdown = 0                
            this.$router.push({name: 'Finish'})
        }
    }
    
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
        & header{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1.5em 1.1em;
            width: 100%;
            background-color: $svetlo_plava;
            -webkit-box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
            -moz-box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
            box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
            @include laptop{
                padding: 1em 1.1em;
            }
                & img{
                    width: 15%;
                    max-width: 50px;
                    margin-right: 1em;
                    @include phone{
                        margin-right: 2em;
                        max-width: 55px;
                    }
                    @include tablet{
                        max-width: 65px;
                    }
                    @include laptop{
                        max-width: 55px;
                    }
                }
                & h2{
                    font-size: 2.2rem;
                    margin: 0;
                    color: $bela_kao;
                    @include phone{
                        font-size: 2.4rem;
                    }
                    @include tablet{
                        font-size: 2.8rem;
                    }
                    @include laptop{
                        font-size: 2.4rem;
                    }
                }
        }
        & .progress2 {
            padding: 3px;
            margin: 2em 0 1.2em 0;
            border-radius: 30px;
            background: rgba(0, 0, 0, 0.4);  
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 1px rgba(255, 255, 255, 0.08);
            width: 96%;
            @include phone{
                width: 85%;
                max-width: 650px;
            }
            @include laptop{
                max-width: 750px;
                margin: 1.9em 0 1em 0;
            }
        }

        & .progress-bar2 {
            height: 5px;
            border-radius: 30px;
            background-image: 
                linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
            transition: 0.4s linear;  
            transition-property: width, background-color;    
        }

        & .progress-moved .progress-bar2 {
            width: 0%; 
            background-color: $narandza;  
        }

        & .score{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .7em;
            width: 90%;
            border-bottom: 1px solid $bela_kao;
            @include phone{
                max-width: 570px;
            }
            @include laptop{
                max-width: 650px;
            }
                & p{
                    color: $bela_kao;
                    font-size: 1.2rem;
                    margin: 0;
                    @include phone{
                        font-size: 1.3rem;
                    }
                        & span{
                            color: $narandza;
                        }
                }
        }

        & .question{
            padding: 1em .9em;
            max-width: 450px;
            @include phone{
                max-width: 520px;
                padding: 1.2em;
            }
            @include tablet{
                max-width: 560px;
            }
            @include laptop{
                max-width: 650px;
            }
                & p{
                    color: $bela_kao;
                    font-size: 1.4rem;
                    margin: 0;
                    line-height: 1.6;
                    @include phone{
                        font-size: 1.5rem;
                    }
                    @include tablet{
                        font-size: 1.8rem;
                    }
                    @include laptop{
                        font-size: 1.5rem;
                    }
                }
        }

        & .answer-check-wrapper{
            width: 100%;
            height: 100px;
            margin-top: 1em;
            display: flex;
            justify-content: center;
            align-items: center;
                & .answer-check{
                    font-size: 1.5rem;
                    font-weight: 800;
                }
                & .correct{
                    color: green;
                }
                & .wrong{
                    color: red;
                }
        }

        & .answer{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 1em;
            margin-top: 1em;
                & input[type="text"]{
                    padding: .4em .8em;
                    border-radius: 50px;
                    border: 2px solid $narandza;
                    background-color: $bela_kao;
                    margin-bottom: 1em;
                    width: 100%;
                    max-width: 440px;
                    @include tablet{
                        padding: .6em .8em;
                        max-width: 550px;
                    }
                    @include laptop{
                        padding: .4em 1em;
                    }
                        &:focus{
                            outline: none;
                        }
                }
                & button{
                    border-radius: 10px;
                    background-color: $narandza;
                    color: $bela_kao;
                    padding: .5em 0;
                    font-weight: 500;
                    border: none;
                    width: 75%;
                    @include phone{
                        font-size: 1.2rem;
                        max-width: 350px;
                        padding: .6em .2em;
                    }
                    @include tablet{
                        font-size: 1.2rem;
                        max-width: 360px;
                        padding: .5em .2em;
                    }
                    @include laptop{
                        font-size: 1rem;
                        max-width: 320px;
                        padding: .4em .2em;
                        border-radius: 10px;
                    }
                        &:focus{
                            outline: none;
                        }
                }
        }
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.fade-enter,
.fade-leave-to { opacity: 0; }
.fade-enter-active,
.fade-leave-active { transition: .3s; }

.slide-enter {
  opacity: 0;
  transform: scale3d(2, 0.5, 1) translate3d(400px, 0, 0);
}

.slide-enter-to { transform: scale3d(1, 1, 1); }
.slide-enter-active,
.slide-leave-active { transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.slide-leave { transform: scale3d(1, 1, 1); }

.slide-leave-to {
  opacity: 0;
  transform: scale3d(2, 0.5, 1) translate3d(-400px, 0, 0);
}

.rotate-enter { transform: perspective(500px) rotate3d(0, 1, 0, 90deg); }
.rotate-enter-active,
.rotate-leave-active { transition: 0.5s; }
.rotate-leave-to { transform: perspective(500px) rotate3d(0, 1, 0, -90deg); }

</style>