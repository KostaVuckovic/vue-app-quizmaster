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
            <p v-if="showQuestion">{{question}}</p>
        </transition>
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
        category_id: null,
        showQuestion: false
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
                this.showQuestion = true
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
        clearTimeout(this.timer)
        if(a === 'CORRECT'){
            event.target.style.backgroundColor = 'green'
            event.target.style.color = '#fff'
            this.score += (10 - this.countdown)
            this.countdown = -1
            this.countDownTimer()
            setTimeout(() => {
               this.showQuestion = false 
            }, 500)
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
            this.countdown = -1
            this.countDownTimer()
            setTimeout(() => {
               this.showQuestion = false 
            }, 500)
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
            this.countdown = 0
            this.countDownTimer()
            setTimeout(() => {
                this.score -= 5
                if(this.score < 0){
                    this.score = 0
                }
                this.showQuestions(this.score)
            }, 2000)
            
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
            border-bottom: 5px solid $tamno_plava;
            width: 100%;
            background-color: $svetlo_plava;
            -webkit-box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
            -moz-box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
            box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
            @include laptop{
                padding: .7em 0;
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
                        max-width: 50px;
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
                        font-size: 2.1rem;
                    }
                }
        }
        & .progress2 {
            padding: 3px;
            margin: 2em 0 1.2em 0;
            border-radius: 30px;
            background: rgba(0, 0, 0, 0.4);  
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
            width: 96%;
            @include phone{
                max-width: 650px;
            }
            @include laptop{
                max-width: 750px;
                margin: 1.8em 0 1em 0;
            }
        }

        & .progress-bar2 {
            height: 5px;
            border-radius: 30px;
            background-image: 
                linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
            transition: 1s linear;  
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
                padding: .6em;
            }
                & p{
                    color: $bela_kao;
                    font-size: 1.2rem;
                    margin: 0;
                    @include phone{
                        font-size: 1.3rem;
                    }
                    @include laptop{
                        font-size: 1.2rem;
                    }
                        & span{
                            color: $narandza;
                        }
                }
        }

        & .question{
            padding: 1em;
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
                    font-size: 1.3rem;
                    margin: 0;
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

        & .answers{
            padding: 1em;
            width: 100%;
            max-width: 450px;
            @include phone{
                max-width: 520px;
            }
            & .answer{
                padding: .5em 1em;
                color: $tamno_plava;
                background-color: $bela_kao;
                border-radius: 50px;
                display: flex;
                justify-content: space-between;
                font-size: 1.2rem;
                margin-top: .6em;
                @include phone{
                    margin-top: 1em;
                    padding: .7em 1em;
                    font-size: 1.3rem; 
                }
                @include laptop{
                    padding: .5em 1em;
                    font-size: 1.2rem;
                }
                    &:hover{
                        cursor: pointer;
                    }
            }
        }
}

.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .7s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.fade-enter,
.fade-leave-to { opacity: 0; }
.fade-enter-active,
.fade-leave-active { transition: 0.5s; }

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