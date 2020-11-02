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
            <p class="loginText">By logging in you agree to the ridiculously long terms. <span class="signUp" @click="backSignUp">Sign up?</span></p>

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
                this.animateCSS('.msg', 'fadeIn');
                this.msg = 'Username missing';
                return
            }

            if(!/^\w+$/.test(password)){
                mess.style.visibility = "visible";
                this.animateCSS('.msg', 'fadeIn');
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
  min-height: 100vh;
    & .container{
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 1.5em;
      width: 85%;
      max-width: 370px;
      transition: height 2s ease-in-out;
      border: 2px solid $narandza;
      background-color: $svetlo_plava;
      border-radius: 10px;
      @include tablet{
          max-width: 500px;
          padding: 2.2em;
      }
      @include laptop{
          max-width: 470px;
          padding: 1.7em 2.2em;
      }
      @include desktop{
          width: 40%;
          max-width: 500px;
          padding: 1.8em 2.8em;
      }
        & h1{
          color: $bela_kao;
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: .5em;
          @include phone{
              font-size: 2.8rem;
          }
          @include tablet{
              font-size: 3.1rem;
          }
          @include laptop{
              font-size: 3.5rem;
          }
        }
        & label{
          color: $bela_kao;
          margin: .5em 0 0 0;
          @include phone{
              font-size: 1.1rem;
          }
          @include tablet{
              font-size: 1.2rem;
          }
          @include laptop{
              font-size: 1.1rem;
          }
        }
        & input[type="text"], input[type="password"]{
          border-radius: 5px;
          border: 1px solid $tamno_plava;
          padding: .3em .5em;
            &:focus{
                outline: none;
            }
        }
        & .msg{
            color: $bela_kao;
            margin: 1em 0;
            height: 25px;
            text-align: center;
            font-size: 1.2rem;
            @include tablet{
                font-size: 1.3rem;
                margin: 1.1em 0;
            }
            @include laptop{
                font-size: 1.2rem;
            }
        }
        & .btn{
          background-color: $narandza;
          border-radius: 10px;
          border: 1px solid $narandza;
          padding: .5em 3em;
          color: $bela_kao;
          font-size: 1rem;
          font-weight: 500;
          outline: none;
          @include tablet{
              font-size: 1.1rem;
          }
          @include laptop{
              font-size: 1rem;
          }
            
        }
        & .loginText{
            color: $bela_kao;
            text-align: center;
            margin: 1em 0;
            @include tablet{
                font-size: 1.1rem;
            }
            @include laptop{
                margin: .7em 0;
                font-size: 1rem;
            }
            & .signUp{
                color: $narandza;
                font-weight: 500;
                    &:hover{
                        cursor: pointer;
                    }
            }
        }
    }
}
</style>