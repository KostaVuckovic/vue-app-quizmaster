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
    this.countDownTimer()
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
.progress{
    width: 100%;
}

.playground_two{
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
    width: 50%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 85%; 
    max-height: 700px;
    justify-content: space-around;
    background-color: #3a3a3c;
    box-shadow: 1px 0px 38px 0px #232324;
    border-radius: 5px;
}

.wrapper{
    width: 100%;
    height: 83%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    position: relative;
}

.wrappGame{
    height: 75%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.question{
    padding: 0 10px;
    font-size: 2.7rem;
    text-align: center;
    color: #22d1ee;
    border-radius: 5px;
}

.signs{
    height: 10%;
}

.correct{
    display: none;
    color: green;
    font-size: 2.5rem;
    transition: font-size 1s;
}

.wrong{
    display: none;
    color: #ff1a1a;
    font-size: 2.5rem;
    transition: font-size 1s;
}

.activeSign{
    animation: slide-down 1s ease-out;
    animation: slide-down 1s ease-out;
}

@keyframes slide-down {
      0% { opacity: 0; transform: translateY(-100%);}   
    100% { opacity: 1; transform: translateY(0); }
}
@keyframes slide-down {
      0% { opacity: 0; transform: translateY(-100%);}   
    100% { opacity: 1; transform: translateY(0); }
}

.answer{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 60%;
    width: 50%;
}

.answer label{
    color: #fff;
}

.answer input{
    padding: 10px 25px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 1.6rem;
    font-family: Arial, Helvetica, sans-serif;
}

.answer input:focus{
    outline: none;
}

.action-button{
    padding: 5px 20px;
	border-radius: 10px;
	font-size: 1.6rem;
	color: #FFF;
	text-decoration: none;
    border: none;
    /* height: 20%; */
    font-family: 'Press Start 2P', cursive;
}

.green{
	background-color: #22d1ee;
	border-bottom: 5px solid #1b9ab1;
	text-shadow: 0px -2px #1b9ab1;
}

.action-button:focus{
    outline: none;
}

.action-button:active
{
	transform: translate(0px,5px);
  -webkit-transform: translate(0px,5px);
	border-bottom: 1px solid;
}

.score_container{
    background-color: #3a3a3c;
    text-align: center;
    position: absolute;
    top: 0;
    right: .5em;
    border-radius: 5px;
    font-family: 'Libre Baskerville', serif;
    color: #f5eded;
    font-size: 1.8rem;
}

.score_container p{
    margin: 0;
}

.score{
    text-align: center;
}

.question_count{
    background-color: #3a3a3c;
    text-align: center;
    position: absolute;
    top: 0;
    left: .5em;
    border-radius: 5px;
    font-family: 'Libre Baskerville', serif;  
    color: #f5eded;  
    font-size: 1.8rem;
}

.question_count p{
    margin: 0;
}

@media screen and (max-width: 349px){
.playground_two{
    background: url('../assets/quiz1.jpg') repeat center center fixed;
    background-size: cover;
}

.container{
    width: 100%;
    height: 75%;
}

.wrapper{
    height: 88%;
}

.wrappGame{
    height: 80%;
}

.question{
    font-size: 1.6rem;
}

.correct{
    font-size: 2.5rem;
    transition: font-size 1s;
}

.wrong{
    font-size: 2.5rem;
    transition: font-size 1s;
}

.answer{
    height: 50%;
    width: 80%;
}

.answer input{
    padding: 5px 10px;
    font-size: 1rem;
}

.action-button{
    padding: 5px 10px;
	font-size: .9rem;
    height: 25%;
}

.score_container{
    padding: .3em;
    top: 0;
    right: 0;
    font-size: 1rem;
}

.question_count{
    padding: 0;
    top: 0;
    left: 0;
    font-size: 1rem;
}
}

@media screen and (min-width: 350px) and (max-width: 600px){

.playground_two{
    min-height: 700px;
    background: url('../assets/quiz1.jpg') repeat center center fixed;
    background-size: cover;
}

.container{
    width: 100%;
    height: 70%;
}

.wrapper{
    height: 88%;
}

.wrappGame{
    height: 80%;
}

.question{
    font-size: 2rem;
}

.correct{
    font-size: 2.7rem;
    transition: font-size 1s;
}

.wrong{
    font-size: 2.1rem;
    transition: font-size 1s;
}

.answer{
    height: 50%;
    width: 80%;
}

.answer input{
    padding: 8px 15px;
    font-size: 1.1rem;
}

.action-button{
    padding: 10px 20px;
	font-size: 0.9em;
}

.score_container{
    padding: .3em;
    top: 0;
    right: 0;
}

.score_container p{
    font-size: 1.1rem;
}

.question_count{
    padding: .3em;
    top: 0;
    left: 0;
    font-size: 1.1rem;
}
}

@media screen and (min-width: 601px) and (max-width: 950px) {
.playground_two{
    min-height: 720px;
    background: url('../assets/quiz111.jpg') repeat center center fixed;
    background-size: cover;
}

.container{
    width: 75%;
    max-width: 500px;
    height: 65%;
}

.wrapper{
    height: 88%;
}

.wrappGame{
    height: 85%;
}

.question p{
    margin: .6em 0 0 0;
    text-align: center;
    color: #22d1ee;
    font-size: 2rem;
}

.correct{
    font-size: 3.2rem;
    transition: font-size 1s;
}

.wrong{
    font-size: 3.2rem;
    transition: font-size 1s;
}

.answer{
    height: 50%;
    width: 80%;
}

.answer input{
    padding: 10px;
    font-size: 1.2rem;
}

.action-button{
    padding: 10px 20px;
	border-radius: 10px;
	font-size: 1.2rem;
}

.score_container{
    padding: .3em;
    top: 0;
    right: 0;
    font-size: 1.2rem;
}

.question_count{
    padding: .3em;
    top: 0;
    left: 0;
    font-size: 1.2rem;
}   
}

@media screen and (min-width: 951px) and  (max-width: 1450px){
.playground_two{
    min-height: 600px;
}

.container{
    height: 90%;
    max-height: 550px;
}

.wrapper{
    height: 88%;
}

.wrappGame{
    height: 85%;
}

.question{
    font-size: 2rem;
}

.question p{
    margin: 15px 0 10px 0;
}

.correct{
    font-size: 2.5rem;
    transition: font-size 1s;
}

.wrong{
    font-size: 2.5rem;
    transition: font-size 1s;
}

.answer{
    height: 50%;
    width: 60%;
}

.answer input{
    padding: 7px 15px;
    font-size: 1.2rem;
}

.action-button{
    padding: 5px 20px;
	font-size: 1.3rem;
}

.score_container{
    padding: .3em;
    top: 0;
    right: 0;
    font-size: 1.2rem;
}

.question_count{
    padding: .3em;
    top: 0;
    left: 0;
    font-size: 1.2rem;
}
}
</style>