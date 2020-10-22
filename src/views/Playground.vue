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
        <p>{{question}}</p>
    </div>

    <div class="answers">
        <div class="answer" v-for="a in answers" :key="a.index" @click="clickAns(a.ans_option, $event)">
            {{a.ans_answer}}
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
        timer: null,
        category_name: '',
        category_id: null
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
mounted(){
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
    getImgUrl(cat) {
        return require('../assets/cat' + cat + '.svg')
    },
    showQuestions(score){
        axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/stage_one', {sid: localStorage.getItem('sid'), score: score})
        .then((response) => {
            this.category_id = response.data.question.category_id
            this.category_name = response.data.question.category_name
            if(this.questionCount < 5){
                this.question = response.data.question.que_question
                this.questionCount += 1
                this.answers = this.shuffle(response.data.question.answers)
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
            this.countdown = 0
            setTimeout(() => {
                event.target.style.backgroundColor = '#cadbe5'
                event.target.style.color = '#252b41'
                this.showQuestions(this.score)
                }, 1000)
        }else{
            event.target.style.backgroundColor = 'red'
            event.target.style.color = '#fff'
            this.score -= this.countdown
            if(this.score < 0){
                this.score = 0
            }
            this.countdown = 0
            setTimeout(() => {
                event.target.style.backgroundColor = '#cadbe5'
                event.target.style.color = '#252b41'
                this.showQuestions(this.score)
                }, 1000)
        }   
    }, 200),
    countDownTimer(){
        if(this.countdown < 10) {
            this.timer = setTimeout( () => {
                this.countdown += 1
                document.querySelector('.progress-bar2').style.width = `${this.countdown*10}%`;
                this.countDownTimer()
            }, 1000)
        }else if(this.questionCount < 5){
            this.score -= 5
            if(this.score < 0){
                this.score = 0
            }
            this.countdown = 0
            this.countDownTimer()
            setTimeout(() => {
                this.showQuestions(this.score)
            }, 1000)
            
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
    background-color: $tamno_plava;
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
  margin: 1.2em 0;
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
            font-size: 1.3rem;
            margin: 0;
        }
}

.answers{
    padding: 1em;
    width: 100%;
    & .answer{
        padding: .5em 1em;
        color: $tamno_plava;
        background-color: $bela_kao;
        border-radius: 50px;
        display: flex;
        justify-content: space-between;
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: .5em;
    }
}
</style>