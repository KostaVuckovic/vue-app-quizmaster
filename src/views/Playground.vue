<template>
<div class="playground">
    
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
                    <p>{{this.question}}</p>
                </div>
                <div class="answers_container">
                    <div class="answers" v-for="a in answers" :key="a.index" @click="clickAns(a.ans_option, $event)">
                        {{a.ans_answer}}
                        
                    </div>
                    
                </div>
            </div>
            
        </div>
    </div>
      
</div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
name: 'Playground',
data(){
    return{
        question: '',
        questionCount: 0,
        answers: [],
        countdown: 0,
        score: 0,
        timer: null
    }
},
computed: {
    SCORE(){
        return this.score
    },
    QUESTS(){
        return this.questionCount
    }
},
created(){
    this.showQuestions(0);
    this.countDownTimer();
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
    shuffle(array){
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;

    },
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
    showQuestions(score){
        axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/stage_one', {sid: localStorage.getItem('sid'), score: score})
        .then((response) => {
            if(this.questionCount < 5){
                this.question = response.data.question.que_question
                this.questionCount += 1
                let answers = response.data.question.answers
                this.answers = this.shuffle(answers)
                this.score = response.data.question.score
                axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/asked_questions', {sid: localStorage.getItem('sid'), stage_one_id: response.data.question.que_id})
                return
            }else{
                clearTimeout(this.timer)
                this.countdown = 0              
                this.$router.push({name: 'PlaygroundTwo'})  
            }
        })
    },
    clickAns: _.debounce(
        function(a, event){
        if(a === 'CORRECT'){
            event.target.style.backgroundColor = 'green'
            event.target.style.color = '#fff'
            this.score += (10 - this.countdown)
            this.animateCSS('.score', 'heartBeat')
            this.countdown = 0
            setTimeout(() => {
                event.target.style.backgroundColor = '#e2f3f5'
                event.target.style.color = 'black'
                this.showQuestions(this.score)
                }, 1000)
        }else{
            event.target.style.backgroundColor = 'red'
            event.target.style.color = '#fff'
            this.score -= this.countdown
            this.animateCSS('.score', 'fadeOut')
            if(this.score < 0){
                this.score = 0
            }
            this.countdown = 0
            setTimeout(() => {
                event.target.style.backgroundColor = '#e2f3f5'
                event.target.style.color = 'black'
                this.showQuestions(this.score)
                }, 1000)
        }   
    }, 200),
    countDownTimer(){
        if(this.countdown < 10) {
            this.timer = setTimeout( () => {
                this.countdown += 1
                document.querySelector('.progress-bar').style.width = (this.countdown*10) + '%';
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
            this.timer = null;
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

.playground{
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
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    max-height: 850px;
    justify-content: space-around;
    background-color:  #3a3a3c;
    box-shadow: 1px 0px 38px 0px #232324;
    border-radius: 5px;
}

.wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 90%;
    justify-content: flex-end;
    position: relative;
}

.wrappGame{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 85%;
    width: 100%;
}

.question{
    padding: 15px 20px;
    font-size: 3.5rem;
    text-align: center;
    color: #c23131;
    border-radius: 5px;
}

.answers_container{
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    align-items:stretch;
    align-content: space-around;
    justify-content: space-around;
    justify-items: stretch;
    height: 40%;
}

.answers{
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.49);
    transition: ease-in-out .5s;
    width: 45%;
    height: 35%;
    background-color: #e2f3f5;
    color: black;
    font-size: 2rem;
}

.answers:hover{
    box-shadow: 0 9px 11px 0 rgba(0, 0, 0, 0.9), 0 10px 26px 0 rgba(0, 0, 0, 1);
    cursor: pointer;
}

.score_container{
    background-color: #3a3a3c;
    padding: .7em;
    text-align: center;
    position: absolute;
    top: 0;
    right: .5em;
    border-radius: 5px;
    font-family: 'Libre Baskerville', serif;
    color: #f5eded;
    font-size: 2rem;
}

.score_container p{
    margin: 0;
}

.score{
    text-align: center;
}

.question_count{
    background-color: #3a3a3c;
    padding: .7em;
    text-align: center;
    position: absolute;
    top: 0;
    left: .5em;
    border-radius: 5px;
    font-family: 'Libre Baskerville', serif;  
    color: #f5eded;
    font-size: 2rem;  
}

.question_count p{
    margin: 0;
}

@media screen and (max-width: 349px) {
.playground{
    background: url('../assets/quizMini.jpg') repeat center center fixed;
    background-repeat: repeat;
    background-position: center;
    background-size: cover;
    }

.container{
    width: 100%;
    height: 75%;
}

.wrapper{
    height: 80%;
}

.question{
    padding: 0 10px;
    font-size: 1.5rem;
}

.answers_container{
    width: 100%;
    height: 45%;
}

.answers{
    font-size: .95rem;
}

.score_container{
    padding: .4em;
    top: 0;
    right: 0;
    font-size: .8rem;
}

.question_count{
    padding: .4em;
    top: 0;
    left: 0;
    font-size: .8rem;
}
}

@media screen and (min-width: 350px) and (max-width: 600px){
.playground{
    justify-content: center;
    background: url('../assets/quizMini.jpg') repeat center center fixed;
    background-repeat: repeat;
    background-position: center;
    background-size: cover;
}

.container{
    width: 100%;
    height: 80%;
    max-height: 650px;
}

.wrapper{
    width: 100%;
    height: 85%;
}

.question{
    padding: 0 10px;
    font-size: 1.8rem;
}

.answers_container{
    width: 100%;
    height: 45%;
    max-height: 200px;
}

.answers{
    font-size: 1.2rem;
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
}

.question_count p{
    font-size: 1.1rem;
}  
}

@media screen and (min-width: 601px) and (max-width: 950px) {
.progress{
    width: 100%;
}

.playground{
    justify-content: center;
    background: url('../assets/quiz11.jpg') repeat center center fixed;
    background-repeat: repeat;
    background-position: center;
    background-size: cover;
}

.container{
    height: 80%;
}

.wrapper{
    height: 85%;
}

.question{
    padding: 0 10px;
    font-size: 2rem;
}

.answers_container{
    width: 100%;
    height: 45%;
}

.answers{
    height: 35%;
    font-size: 1.3rem;
}

.score_container{
    padding: .4em;
    text-align: center;
    top: 0;
    right: 0;
    font-size: 1.3rem;
}

.question_count{
    padding: .4em;
    top: 0;
    left: 0;  
    font-size: 1.3rem;
} 
}

@media screen and (min-width: 951px) and  (max-width: 1450px){
.container{
    width: 70%;
    max-width: 850px;
}

.wrapper{
    height: 85%;
}

.question{
    padding: 0 10px;
    font-size: 2.5rem;
}

.answers_container{
    width: 100%;
    height: 45%;
}

.answers{
    font-size: 1.7rem;
}


.score_container{
    padding: .4em;
    top: 0;
    right: 0;
    font-size: 1.4rem;
}

.question_count{
    padding: .4em;
    top: 0;
    left: 0;   
    font-size: 1.4rem;
}

}
</style>