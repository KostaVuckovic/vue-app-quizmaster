<template>
    <div class="wrapperSignUp">
        <div class="containerSignUp">

            <div class="signUpForm">

                <div class="top">
                    <h1>Register</h1>
                  <div class="inputsSignUp">
                    <label for="nam">First Name</label>
                    <input type="text" class="nam" v-model="nameModel" v-on:keyup.enter="createAcc(nameModel, lastnameModel, usernameModel, passwordModel, avatarClick)" >
                    <label for="las">Last Name</label>
                    <input type="text" class="las" v-model="lastnameModel" v-on:keyup.enter="createAcc(nameModel, lastnameModel, usernameModel, passwordModel, avatarClick)" >
                    <label for="usr">Username</label>
                    <input type="text" class="usr" v-model="usernameModel" v-on:keyup.enter="createAcc(nameModel, lastnameModel, usernameModel, passwordModel, avatarClick)" >
                    <label for="psw">Password</label>
                    <input type="password" class="psw" v-model="passwordModel" v-on:keyup.enter="createAcc(nameModel, lastnameModel, usernameModel, passwordModel, avatarClick)" >
                  </div>
                    
                </div>

                <div class="bottom">
                   <p class="selectAvatar">select avatar</p>
                  <div class="avatarsWrap">
                  <div class="avatars" v-for="a in avatars" :key="a.ava_id"  @click="selectAvatar(a.ava_id)">
                    <img :class="{clickedA:a.ava_id == avatarClick}" :src="'http://051b122.mars-e1.mars-hosting.com/quiz/avatar/'+ a.ava_id +'/avatar'" alt="">
                  </div>
                  
                </div>

                <div class="msg">
                  <p>{{MSG}}</p>
                </div>

                <div class="footerSignUp">
                    <button class="action-button shadow animate green"  @click="createAcc(nameModel, lastnameModel, usernameModel, passwordModel, avatarClick)">Done</button>
                    <p>You already have an account? <span class="goLog" @click="goLog()">Log In</span></p>
                </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignUp',
  data(){
    return{
      nameModel: '',
      lastnameModel: '',
      usernameModel: '',
      passwordModel: '',
      usernameModelLog: '',
      passwordModelLog: '',
      msg: '',
      avatars: [],
      avatarClick: undefined

    }
  },
  mounted(){
    this.getAvatars()
  },
  computed: {
    MSG(){
      return this.msg;
    }
  },
  methods: {
    selectAvatar(avatar_id){
      this.avatarClick = avatar_id
    },
    getAvatars(){
        axios.get('http://051b122.mars-e1.mars-hosting.com/quiz/engine/getAvatars')
        .then((response) => {
          this.avatars = response.data.data
        })
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
    createAcc(name,lastname,username, password, avatar){

      if(!/^\w+$/.test(name) && !/^\w+$/.test(lastname) && !/^\w+$/.test(username) && !/^\w+$/.test(password) && avatar == undefined){
        let mess = document.querySelector('.msg');
        mess.style.visibility = "visible";
        this.animateCSS('.msg', 'shake');
        this.msg = 'You must fill a form.';
        return
      }
      
      if(!/^\w+$/.test(name)){
        let mess = document.querySelector('.msg');
        mess.style.visibility = "visible";
        this.animateCSS('.msg', 'shake');
        this.msg = 'Name is missing';
        return
      }
      if(!/^\w+$/.test(lastname)){
        let mess = document.querySelector('.msg');
        mess.style.visibility = "visible";
        this.animateCSS('.msg', 'shake');
        this.msg = 'Lastname is missing';
        return
      }
      if(!/^\w+$/.test(username)){
        let mess = document.querySelector('.msg');
        mess.style.visibility = "visible";
        this.animateCSS('.msg', 'shake');
        this.msg = 'Username is missing';
        return
      }
      if(!/^\w+$/.test(password)){
        let mess = document.querySelector('.msg');
        mess.style.visibility = "visible";
        this.animateCSS('.msg', 'shake');
        this.msg = 'Password is missing';
        return
      }
      
      if(password.length < 6){
        let mess = document.querySelector('.msg');
        mess.style.visibility = "visible";
        this.animateCSS('.msg', 'shake');
        this.msg = 'Password must have at least 6 chars';
        return
      }

      if(avatar == undefined){
        let mess = document.querySelector('.msg');
        mess.style.visibility = "visible";
        this.animateCSS('.msg', 'shake');
        this.msg = 'You must choose avatar.';
        return
      }

      axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/auth/signup', {name:name, lastname:lastname, username: username, password: password, avatar: avatar})
      .then((response) => {
        if(response.data.msg){
          this.nameModel = '';
          this.lastnameModel = '';
          this.usernameModel = '';
          this.passwordModel = '';
          this.avatarClick = undefined;
          this.msg = response.data.msg + ' Redirecting to login page...';
          let mess = document.querySelector('.msg');
          mess.style.visibility = "visible";
          this.animateCSS('.msg', 'shake');
          setTimeout(() => {
            this.$router.push({name: 'Login'})
          }, 2700); 
        }else if(response.data.msg2) {
          console.log(response.data.msg2)
          this.msg = response.data.msg2;
          let mess = document.querySelector('.msg');
          mess.style.visibility = "visible";
          this.animateCSS('.msg', 'shake');
        }
      })
      .catch(r => {
        console.log(r)
      })
	},
	goLog(){
		this.$router.push({name: 'Login'})
	}
  }
}
</script>

<style scoped>
.wrapperSignUp{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 930px;
    height: 100vh;
    box-sizing: border-box;
    background: url('../assets/quiz11.jpg') repeat center center fixed;
    background-repeat: repeat;
    background-position: center;
    background-size: cover;
}

.containerSignUp{
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
  border: 2px solid lightgray;
  height: 100%;
  max-height: 900px;
  width: 40%;
  max-width: 680px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.69);
  background-color: white;
}

.containerSignUp h1 {
  text-align: center;
  font-size: 6rem;
  margin: 10px 0 5px 0;
  font-weight: 800;
}

.signUpForm{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80%;
  height: 100%;
}

.signUpForm p{
  text-align: center;
}

.top{
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.bottom{
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.avatarsWrap{
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 20%;
}

.avatars {
  width: 15%;
  height: 100%;
  position: relative;
}

.avatars img{
  box-sizing: border-box;
  width: 100%;
  border-radius: 10px;
  max-height: 100px;
  height: 100%;
  transition: .1s ease;
}

.selectAvatar{
  font-size: 1.6rem;
  margin: 10px 0 0 0;
}

.clickedA{
  border: 3px solid green;
  opacity: 0.7;
}

.animate{
	transition: all 0.1s;
	-webkit-transition: all 0.1s;
}

.action-button{
  font-family: 'Press Start 2P', cursive;
  height: 37%;
  padding: 0 15px;
	border-radius: 10px;
	font-size: 20px;
	color: #FFF;
	text-decoration: none;	
  border: none;
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

.inputsSignUp{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 65%;
}

.inputsSignUp label{
  font-size: 1.4rem;
  margin: 0;
}

.goLog{
	color: rgb(51, 51, 255);
}

.goLog:hover{
	cursor: pointer;
}

input[type=text], input[type=password]{
  padding: 3px 15px; 
  border-radius: 5px;
  border: 1px solid lightgray;
  font-size: 1.5rem;
  font-family: Arial, Helvetica, sans-serif;
  background-color: rgb(255, 255, 255);
}

input[type=text]:focus {
  border: 1px solid rgb(126, 125, 125);
  outline: none;
}

input[type=password]:focus {
  border: 1px solid rgb(126, 125, 125);
  outline: none;
}

.footerSignUp{
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
  height: 40%;
}

.footerSignUp p{
    font-size: 1.6rem;
    box-sizing: border-box;
}

.msg{
  box-sizing: border-box;
  width: 100%;
  visibility: hidden;
  text-align: center;
  /* height: 15px; */
}

.msg p{
  margin: 0;
  color: red;
  font-size: 1.6rem;
}

@media screen and (max-width: 349px){
  .wrapperSignUp{
  min-height: 550px;
  background: url('../assets/quiz1.jpg') repeat center center fixed;
  background-size: cover;
}

.containerSignUp{
    border: 1px solid lightgray;
    width: 90%;
    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.49);
}

.containerSignUp h1 {
  font-size: 3.2rem;
  margin: 20px 0 10px 0;
}

.signUpForm{
  width: 90%;
  height: 100%;
}

.avatarsWrap{
  height: 20%;
}

.avatars {
  width: 17%;
  height: 100%;
}

.avatars img{
  width: 100%;
  max-height: 100px;
  height: 100%;
}

.selectAvatar{
  font-size: 1rem;
}

.action-button{
  border: none;
  padding: 0 10px;
	font-size: 14px;
  height: 45%;	
}

.inputsSignUp{
  height: 65%;
}

.inputsSignUp label{
  font-size: 1rem;
}

.goLog{
	color: blue;
	font-weight: bold;
}

input[type=text], input[type=password]{
  padding: 4px 7px; 
  font-size: 1rem;
  box-sizing: border-box;
}

.footerSignUp p{
    font-size: 0.9rem;
    margin: 0;
}

.msg{
  width: 100%;
  height: 10px;
}

.msg p{
  font-size: 1rem;
}
}

@media screen and (min-width: 350px) and (max-width: 600px){
.containerSignUp{
  max-width: 400px;
}

.wrapperSignUp{
  min-height: 720px;
  background: url('../assets/quiz1.jpg') repeat center center fixed;
  background-size: cover;
}

.containerSignUp{
    border: 1px solid lightgray;
    max-height: 630px;
    width: 90%;
    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.69);
}

.containerSignUp h1 {
  font-size: 3.8rem;
	margin: 27px 0 20px 0;
}

.signUpForm{
    width: 90%;
    height: 100%;
}

.avatarsWrap{
  height: 20%;
}

.avatars {
  width: 17%;
  height: 100%;
}

.avatars img{
  width: 100%;
  max-height: 100px;
  height: 100%;
}

.selectAvatar{
  font-size: 1.1rem;
}

.clickedA{
  border: 3px solid green;
}

.action-button{
  padding: 0 10px;
	font-size: 1rem;	
}

.inputsSignUp{
  height: 60%;
}

.inputsSignUp label{
  font-size: 1rem;
}

.goLog{
	color: blue;
  padding: 3px;
}

.goLog:hover{
	cursor: pointer;
}

input[type=text], input[type=password]{
    padding: 3px 10px; 
    border-radius: 5px;
    font-size: 1.2rem;
}

.footerSignUp p{
    font-size: 1rem;
}

.msg{
  height: 10px;
}

.msg p{
  font-size: 1.1rem;
}
}

@media screen and (min-width: 601px) and (max-width: 950px){
.wrapperSignUp{
  background: url('../assets/quiz111.jpg') repeat center center fixed;
  background-size: cover;
}

.containerSignUp{
  border: 1px solid lightgray;
  height: 85%;
  width: 75%;
  max-width: 540px;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.69);
}

.containerSignUp h1 {
  font-size: 6.3rem;
  margin: 20px 0;
}

.signUpForm{
  width: 90%;
  height: 100%;
}

.avatars {
  width: 16%;
  height: 100%;
}

.avatars img{
  width: 100%;
  height: 100%;
}

.selectAvatar{
  font-size: 1.6rem;
  margin: 12px 0;
}

.action-button{
  padding: 0 15px;
	font-size: 1.3rem;
}

.inputsSignUp label{
  font-size: 1.6rem;
}

.goLog{
	color: blue;
  padding: 3px;
}

input[type=text], input[type=password]{
    padding: 5px 10px;
    font-size: 1.4rem;
}

.msg{
  width: 100%;
  height: 35px;
}

.msg p{
  font-size: 1.6rem;
}
}

@media screen and (min-width: 951px) and (max-width: 1450px){
  .wrapperSignUp{
  height: 100vh;
  min-height: 600px;
}

.containerSignUp{
  border: 1px solid lightgray;
  width: 55%;
  border-radius: 5px;
  max-width: 500px;
  max-height: 750px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.69);
}

.containerSignUp  h1 {
  font-size: 4.7rem;
  margin: 7px 0;
}

.signUpForm{
  width: 85%;
  height: 100%;
}

.avatars img{
  width: 100%;
  max-height: 100px;
  height: 100%;
}

.selectAvatar{
  font-size: 1.2rem;
  margin: 10px 0;
}

.action-button{
  padding: 0 .9em;
	border-radius: 10px;
	font-size: 1rem;
	color: #FFF;
	text-decoration: none;	
}

.inputsSignUp{
  height: 70%;
}

.inputsSignUp label{
  font-size: 1.2rem;
}

.goLog{
  color: rgb(51, 51, 255);
}

input[type=text], input[type=password]{
    padding: 2px 10px; 
    font-size: 1rem;
}

.footerSignUp p{
  font-size: 1.1rem;
  margin: 0;
}

.msg{
  width: 100%;
}

.msg p{
  font-size: 1.2rem;
}
}
</style>
