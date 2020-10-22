<template>
  <div class="playground_two">
      <div class="container">
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
        correctAnswer: null
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
    animateCSS(element, animationName, callback){
        const node = document.querySelector(element)
        node.classList.add('animated', animationName)

        function handleAnimationEnd() {
            node.classList.remove('animated', animationName)
            node.removeEventListener('animationend', handleAnimationEnd)

            if (typeof callback === 'function') callback()
        }

        node.addEventListener('animationend', handleAnimationEnd)
    },
    showQuestions(scoreStageTwo){
        let sid = localStorage.getItem('sid');
        axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/stage_two', {scoreStageTwo:scoreStageTwo,  sid: sid})
        .then((response) => {
            if(this.questionCount < 5){
                this.question = response.data.question
                this.questionCount += 1
                this.score = response.data.question.score2
                let sid = localStorage.getItem('sid');
                axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/asked_questions_two', {sid: sid, stage_two_id: response.data.question.que_id})
            }else{ 
                this.$router.push({name: 'Finish'})   
            }
        })
    },
    sendAnswer: _.debounce(
        function (ans, id) {
        let sid = localStorage.getItem('sid');
        axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/answer_check', {sid: sid, answer: ans, id: id })
        .then((response) => {
            if(response.data.check === 'CORRECT'){
                document.querySelector('.correct').style.display = 'block'
                document.querySelector('.correct').classList.add('activeSign')
                this.score += 5;
                this.animateCSS('.score', 'heartBeat')
                
                setTimeout(() => {
                    document.querySelector('.correct').style.display = 'none'
                    document.querySelector('.correct').classList.remove('activeSign')
                    this.countdown = 0
                    this.showQuestions(this.score)
                }, 1600)
                this.answerModel = ''
            }else{
                document.querySelector('.wrong').style.display = 'block'
                document.querySelector('.wrong').innerHTML = response.data.answer
                document.querySelector('.wrong').classList.add('activeSign')
                this.animateCSS('.score', 'fadeOut')
                this.score -= 5;
                if(this.score < 0){
                    this.score = 0
                }
                
                setTimeout(() => {
                    document.querySelector('.wrong').style.display = 'none'
                    document.querySelector('.wrong').classList.remove('activeSign')
                    this.countdown = 0
                    this.showQuestions(this.score)
                }, 1600)
                this.answerModel = ''
            }
        })
    }, 200),
    countDownTimer(){
        if(this.countdown < 20) {
            this.timer = setTimeout( () => {
                this.countdown += 1
                document.querySelector('.progress-bar').style.width = (this.countdown*5) + '%';
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
            this.$router.push({name: 'PlaygroundTwo'})
        }
    }
    
}
}
</script>

<style scoped>


</style>