<template>
    <div class="wrapper">
        <div class="container">

            <h1>Sign in</h1>

            <label for="usr">Username</label>
            <input type="text" class="usr" v-model="usernameModel" v-on:keyup.enter="loginUser(usernameModel, passwordModel)">
            <label for="psw">Password</label>
            <input type="password" class="psw" v-model="passwordModel" v-on:keyup.enter="loginUser(usernameModel, passwordModel)">

            <p class="msg">{{msg}}</p>

            <button class="btn" @click="loginUser(usernameModel, passwordModel)">SIGN IN</button>
            <p class="loginText">By logging in you agree to the ridiculously long terms. <span class="signUp" @click="backSignUp">SignUp?</span></p>

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
            let mess = document.querySelector('.msg');
            if(!/^\w+$/.test(username)){
                mess.style.visibility = "visible";
                this.animateCSS('.msg', 'shake');
                this.msg = 'Username missing';
                return
            }

            if(!/^\w+$/.test(password)){
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
                // let mess = document.querySelector('.msg');
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

<style lang="scss" scoped>
$tamno_plava: #252b41;
$svetlo_plava: #2c4058;
$narandza: #e78230;
$bela_kao: #cadbe5; 

.wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
    & .container{
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 1.5em;
      width: 85%;
      transition: height 2s ease-in-out;
      border: 2px solid $narandza;
      background-color: $svetlo_plava;
      border-radius: 10px;
        & h1{
          color: $bela_kao;
          font-size: 2.5rem;
          text-align: center;
        }
        & label{
          color: $bela_kao;
          margin: .5em 0 0 0;
        }
        & input[type="text"], input[type="password"]{
          border-radius: 5px;
          border: 1px solid $tamno_plava;
          padding: .3em .5em;
        }
        & .msg{
            color: $bela_kao;
            margin: .5em 0;
        }
        & .btn{
          background-color: $narandza;
          border-radius: 10px;
          border: 1px solid $narandza;
          padding: .5em 3em;
          color: $bela_kao;
          font-size: 1rem;
          font-weight: 500;
          margin-top: 1.5em;
        }
        & .loginText{
            color: $bela_kao;
            & .signUp{
                color: $narandza;
                font-weight: 500;
            }
        }
    }
}
</style>