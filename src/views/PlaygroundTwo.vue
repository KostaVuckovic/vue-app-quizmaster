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
        <p>{{question.que_question}}</p>
    </div>

    <div class="answer-check">

    </div>

    <div class="answer">
        <input type="text" class="answer-input" v-model="answerModel" @keyup.enter="sendAnswer(answerModel, question.que_id)">
        <button @click="sendAnswer(answerModel, question.que_id)">SUBMIT</button>
    </div>






      <!-- <div class="container">
        <div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width: 0%" aria-valuemin="0" aria-valuemax="100"></div>
        </div>

        <div class="wrapper">
            <div class="score_container">
                <p>SCORE:</p>
                <p class="score">{{SCORE}}</p>
            </div>
            <div class="question_count">
                <p>QUESTS:</p>
                <p class="quest">{{QUESTS}}/5</p>
            </div>

            <div class="wrappGame">
                <div class="question">
                    <p>{{question.que_question}}</p>
                </div>
                <div class="signs">
                    <span class="correct material-icons">check_circle_outline</span>
                    <span class="wrong"></span>
                </div>

                <div class="answer">
                    <input type="text" v-model="answerModel" @keyup.enter="sendAnswer(answerModel, question.que_id)" placeholder="Your answer">
                    <button class="action-button shadow animate green" @click="sendAnswer(answerModel, question.que_id)">Done</button>
                </div>
            </div>  
        
        </div>

      </div> -->
    
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
        category_id: null
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
        let sid = localStorage.getItem('sid');
        axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/stage_two', {scoreStageTwo:scoreStageTwo,  sid: sid})
        .then((response) => {
            this.category_name = response.data.question.category_name
            this.category_id = response.data.question.category_id
            if(this.questionCount < 5){
                this.question = response.data.question
                this.questionCount += 1
                this.score = response.data.question.score2
                let sid = localStorage.getItem('sid');
                axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/asked_questions_two', {sid: sid, stage_two_id: response.data.question.que_id})
            }else{ 
                clearTimeout(this.timer)
                this.countdown = 0  
                this.$router.push({name: 'Finish'})   
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
                
                setTimeout(() => {
                    this.countdown = 0
                    this.showQuestions(this.score)
                }, 1000)
                this.answerModel = ''
            }else{
                this.score -= 5;
                if(this.score < 0){
                    this.score = 0
                }
                
                setTimeout(() => {
                    this.countdown = 0
                    this.showQuestions(this.score)
                }, 1000)
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

.wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

header{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5em 1.1em;
    width: 100%;
    background-color: $svetlo_plava;
    -webkit-box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
    -moz-box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
    box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
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

.progress2 {
  padding: 3px;
  margin: 1.5em 0;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.25);  
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
  width: 100%;
}

.progress-bar2 {
  height: 5px;
  border-radius: 30px;
  background-image: 
    linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  transition: 0.4s linear;  
  transition-property: width, background-color;    
}

.progress-moved .progress-bar2 {
  width: 0%; 
  background-color: $narandza;  
}

.score{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .7em;
    width: 90%;
    border-bottom: 1px solid $bela_kao;
        & p{
            color: $bela_kao;
            font-size: 1.2rem;
            margin: 0;
                & span{
                    color: $narandza;
                }
        }
}

.question{
    padding: 1em;
        & p{
            color: $bela_kao;
            font-size: 1.5rem;
            margin: 0;
        }
}

.answer-check{
    width: 100%;
    height: 100px;
}

.answer{
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1em;
    margin-top: 1em;
        & input[type="text"]{
            padding: .4em .8em;
            border-radius: 50px;
            border: 2px solid $narandza;
            background-color: $bela_kao;
            margin-bottom: 1em;
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
                &:focus{
                    outline: none;
                }
        }
}
</style>