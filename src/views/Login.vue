<template>
    <div class="wrapperLogin">
        <div class="containerLogin">

                <h1>Login</h1>
           
                <div class="loginForm">

                    <div class="inputs">
                        <label for="usr">Username</label>
                        <input type="text" class="usr" v-model="usernameModel" v-on:keyup.enter="loginUser(usernameModel, passwordModel)">
                        <label for="psw">Password</label>
                        <input type="password" class="psw" v-model="passwordModel" v-on:keyup.enter="loginUser(usernameModel, passwordModel)">
                    </div>

                    <div class="msg">
                      <p>{{msg}}</p>
                    </div>

                    <div class="footerLogin">
                     
                        <button class="action-button shadow animate green" @click="loginUser(usernameModel, passwordModel)">Done</button>
                        <p>By logging in you agree to the ridiculously long terms. <span class="signUp" @click="backSignUp">SignUp?</span></p>
                    </div>
  
                </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data(){
        return{
            usernameModel: '',
            passwordModel: '',
            msg: ''
        }
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
        loginUser(username, password){
            if(!/^\w+$/.test(username)){
                let mess = document.querySelector('.msg');
                mess.style.visibility = "visible";
                this.animateCSS('.msg', 'shake');
                this.msg = 'Username missing';
                return
            }

            if(!/^\w+$/.test(password)){
                let mess = document.querySelector('.msg');
                mess.style.visibility = "visible";
                this.animateCSS('.msg', 'shake');
                this.msg = 'Password missing';
                return
            }
            axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/auth/login', {username: username, password: password})
            .then((response) => {
                localStorage.setItem('sid', response.data.sid)
                let user_data = {
                    'id' : response.data.user_data.id,
                    'username' : response.data.user_data.username
                }
                localStorage.setItem('user_data', JSON.stringify(user_data));
                this.usernameModel = ''
                this.passwordModel = ''
                this.$router.push({name: 'Categories'})
                .catch(() => {})
            })
            .catch(() => {
                let mess = document.querySelector('.msg');
                mess.style.visibility = "visible";
                this.animateCSS('.msg', 'shake');
                this.msg = 'Username or password is bad.';
            })
        },
        backSignUp(){
            this.$router.push({name: 'SignUp'})
        }
    }
}
</script>

<style scoped>
.wrapperLogin{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    min-height: 800px;
    background: url('../assets/quiz11.jpg') repeat center center fixed;
    background-repeat: repeat;
    background-position: center;
    background-size: cover;
    box-sizing: border-box;
}

.containerLogin{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    border: 2px solid lightgray;
    height: 70%;
    max-height: 600px;
    width: 60%;
    max-width: 630px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.69);
    background-color: white;
}

.containerLogin h1 {
    font-size: 7.5rem;
    margin: 0;
}

.loginForm{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 77%;
    height: 65%;
}

.action-button{
    padding: 5px 15px;
	border-radius: 10px;
	font-size: 1.3rem;
	color: #FFF;
    border: none;
	text-decoration: none;	
    font-family: 'Press Start 2P', cursive;
    height: 40%;
}

.action-button:hover{
    cursor: pointer;
}

.action-button:focus{
    outline: none;
}

.green{
	background-color: #82BF56;
	border-bottom: 5px solid #669644;
	text-shadow: 0px -2px #669644;
}

.action-button:active{
	transform: translate(0px,5px);
    -webkit-transform: translate(0px,5px);
	border-bottom: 1px solid;
}

.inputs{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 50%;
}

.inputs label{
    font-size: 1.6rem;
    margin: 0;
}

input[type=text], input[type=password]{
    padding: 3px 13px; 
    border-radius: 5px;
    border: 1px solid lightgray;
    font-size: 1.8rem;
    font-family: Arial, Helvetica, sans-serif;
}

input[type=text]:focus {
  border: 2px solid rgb(126, 125, 125);
  outline: none;
  
}

input[type=password]:focus {
  border: 2px solid rgb(126, 125, 125);
  outline: none;
}

.footerLogin{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 30%;
}

.footerLogin p{
    font-size: 1.2rem;
    margin: 0;
    text-align: center;
}

.signUp{
    color: blue;
}

.signUp:hover{
    cursor: pointer;
}

.msg{
  box-sizing: border-box;
  width: 100%;
  visibility: hidden;
  text-align: center;
  height: 30px;
}

.msg p{
  margin: 0;
  color: red;
  font-size: 1.6rem;
}

@media screen and (max-width: 349px){
  .wrapperLogin{
    min-height: 520px;
    background: url('../assets/quiz1.jpg') repeat center center fixed;
  background-size: cover;
}

.containerLogin{
    border: 1px solid lightgray;
    height: 63%;
    max-height: 300px;
    width: 93%;
    max-width: 330px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.49);
}

.containerLogin h1 {
    font-size: 4rem;
    margin: 20px 0 15px 0;
}

.loginForm{
    width: 85%;
    height: 80%;
}

.action-button{
    padding: 3px 10px;
    font-size: 0.6rem;
    height: 35%;
}

.inputs label{
    font-size: 1rem;
}

input[type=text], input[type=password]{
    padding: 2px 9px; 
    font-size: 1rem;
}

.footerLogin{
    height: 35%;
}

.footerLogin p{
    font-size: 0.75rem;
}

.msg{
  width: 100%;
  height: 15px;
}

.msg p{
  font-size: 0.8rem;
}
}

@media screen and (min-width: 350px) and  (max-width: 600px){
  .wrapperLogin{
    min-height: 750px;
    background: url('../assets/quiz1.jpg') repeat center center fixed;
  background-size: cover;
}

.containerLogin{
    border: 1px solid lightgray;
    height: 65%;
    max-height: 450px;
    width: 90%;
    max-width: 450px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.69);
}

.containerLogin h1 {
    font-size: 5.3rem;
    margin: 20px 0 15px 0;
}

.loginForm{
    width: 85%;
    height: 60%;
}

.action-button{
    padding: 2px 10px;
	font-size: 0.9rem;
    height: 35%;
}

.inputs label{
    font-size: 1.1rem;
}

input[type=text], input[type=password]{
    padding: 5px 9px; 
    font-size: 1.1rem;
}

.footerLogin{
    height: 35%;
}

.footerLogin p{
    font-size: 0.8rem;
}

.msg{
  width: 100%;
  height: 25px;
}

.msg p{
  font-size: 1.1rem;
}
}

@media screen and (min-width: 601px) and  (max-width: 950px){
  .wrapperLogin{
    min-height: 900px;
    background: url('../assets/quiz1.jpg') repeat center center fixed;
  background-size: cover;
}

.containerLogin{
    height: 70%;
    width: 75%;
    max-width: 550px;
    max-height: 600px;
    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.69);
}

.containerLogin h1 {
    font-size: 7rem;
    margin: 15px 0 5px 0;
}

.loginForm{
    width: 90%;
    height: 65%;
}

.action-button{
    padding: 3px 13px;
	font-size: 1.1rem;
    height: 35%;
}

.inputs label{
    font-size: 1.4rem;
}

input[type=text], input[type=password]{
    padding: 3px 13px; 
    font-size: 1.5rem;
}

.footerLogin{
    height: 35%;
}

.footerLogin p{
    font-size: 1.3rem;
}

.msg{
  width: 100%;
}

.msg p{
  font-size: 1.4rem;
}
}

@media screen and (min-width: 951px) and  (max-width: 1450px){
  .wrapperLogin{
    min-height: 600px;
}

.containerLogin{
    padding: 10px;
    height: 85%;
    width: 45%;
    max-width: 550px;
    min-width: 530px;
    max-height: 600px;
    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.69);
}

.containerLogin h1 {
    font-size: 6.5rem;
    margin: 15px 0 10px 0;
}

.action-button{
    padding: 0 15px;
	font-size: 1.1rem;
}

.inputs label{
    font-size: 1.2rem;
}

input[type=text], input[type=password]{
    padding: 3px 9px; 
    border: 2px solid lightgray;
    font-size: 1.3rem;
}

.footerLogin p{
    font-size: 1.05rem;
}

.msg{
  width: 100%;
}

.msg p{
  font-size: 1.35rem;
}
}

</style>