<template>
    <div class="wrapper">
      <div class="container">

        <h1>Register</h1>
        <!-- inputs -->
        <label for="nam">First Name</label>
        <input type="text" class="nam" v-model="nameModel" v-on:keyup.enter="createAcc(nameModel, lastnameModel, usernameModel, passwordModel, gender)" >
        <label for="las">Last Name</label>
        <input type="text" class="las" v-model="lastnameModel" v-on:keyup.enter="createAcc(nameModel, lastnameModel, usernameModel, passwordModel, gender)" >
        <label for="usr">Username</label>
        <input type="text" class="usr" v-model="usernameModel" v-on:keyup.enter="createAcc(nameModel, lastnameModel, usernameModel, passwordModel, gender)" >
        <label for="psw">Password</label>
        <input type="password" class="psw" v-model="passwordModel" v-on:keyup.enter="createAcc(nameModel, lastnameModel, usernameModel, passwordModel, gender)" >
        <!-- inputs end -->
        <label class="label-gender" for="gender">Select gender</label>
        <div class="genders">
          <div class="radio">
            <input id="r1" type="radio" name="radio" value="1" v-model="gender">
            <label for="r1">Male</label>
          </div>
          <div class="radio">
            <input id="r2" type="radio" name="radio" value="2" v-model="gender">
            <label for="r2">Female</label>
          </div>
          
        </div>

        <p class="msg">{{msg}}</p>

        <button class="btn" @click="createAcc(nameModel, lastnameModel, usernameModel, passwordModel, gender)">SIGN UP</button>
        <p class="login">Or <span @click="goLogin">log in?</span></p>
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
      gender: null
    }
  },
  computed: {
    MSG(){
      return this.msg;
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
    createAcc(name,lastname,username, password, gender){

      if(!/^\w+$/.test(name) && !/^\w+$/.test(lastname) && !/^\w+$/.test(username) && !/^\w+$/.test(password) && gender == null){
        let mess = document.querySelector('.msg');
        mess.style.visibility = "visible";
        this.animateCSS('.msg', 'fadeIn');
        this.msg = 'You must fill a form.';
        return
      }
      
      if(!/^\w+$/.test(name)){
        let mess = document.querySelector('.msg');
        mess.style.visibility = "visible";
        this.animateCSS('.msg', 'fadeIn');
        this.msg = 'Name is missing';
        return
      }
      if(!/^\w+$/.test(lastname)){
        let mess = document.querySelector('.msg');
        mess.style.visibility = "visible";
        this.animateCSS('.msg', 'fadeIn');
        this.msg = 'Lastname is missing';
        return
      }
      if(!/^\w+$/.test(username)){
        let mess = document.querySelector('.msg');
        mess.style.visibility = "visible";
        this.animateCSS('.msg', 'fadeIn');
        this.msg = 'Username is missing';
        return
      }
      if(!/^\w+$/.test(password)){
        let mess = document.querySelector('.msg');
        mess.style.visibility = "visible";
        this.animateCSS('.msg', 'fadeIn');
        this.msg = 'Password is missing';
        return
      }
      
      if(password.length < 6){
        let mess = document.querySelector('.msg');
        mess.style.visibility = "visible";
        this.animateCSS('.msg', 'fadeIn');
        this.msg = 'Password must have at least 6 chars';
        return
      }

      if(gender == null){
        let mess = document.querySelector('.msg');
        mess.style.visibility = "visible";
        this.animateCSS('.msg', 'fadeIn');
        this.msg = 'You must choose gender.';
        return
      }

      axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/auth/signup', {name, lastname, username, password, avatar: gender})
      .then((response) => {
        if(response.data.msg){
          this.nameModel = '';
          this.lastnameModel = '';
          this.usernameModel = '';
          this.passwordModel = '';
          this.gender = null;
          this.msg = response.data.msg + ' Redirecting to login page...';
          let mess = document.querySelector('.msg');
          mess.style.visibility = "visible";
          this.animateCSS('.msg', 'fadeIn');
          setTimeout(() => {
            this.$router.push({name: 'Login'})
          }, 2700); 
        }else if(response.data.msg2) {
          console.log(response.data.msg2)
          this.msg = response.data.msg2;
          let mess = document.querySelector('.msg');
          mess.style.visibility = "visible";
          this.animateCSS('.msg', 'fadeIn');
        }
      })
      .catch(r => {
        console.log(r)
      })
	},
	goLogin(){
		this.$router.push({name: 'Login'})
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
    & .container{
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 1em 1.4em;
      width: 85%;
      max-width: 350px;
      border: 2px solid $narandza;
      background-color: $svetlo_plava;
      border-radius: 10px;
      @include phone{
        max-width: 380px;
      }
      @include tablet{
        max-width: 480px;
        padding: 1.4em 2.4em;
      }
      @include laptop{
        max-width: 450px;
        padding: 1.2em 2.3em;
      }
        & h1{
          color: $bela_kao;
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: .5em; 
          @include phone{
            font-size: 2.9rem;
          }
          @include tablet{
            font-size: 3.5rem;
          }
          @include laptop{
            font-size: 3rem;
          }
        }
        & label{
          color: $bela_kao;
          margin: .4em 0 0 0;
          @include tablet{
            font-size: 1.2rem;
          }
          @include laptop{
            font-size: 1.05rem;
          }
        }
        & input[type="text"], input[type="password"]{
          border-radius: 5px;
          border: 1px solid $tamno_plava;
          padding: .2em .5em;
          font-size: 1rem;
            &:focus{
              outline: none;
            }
        }
        & .label-gender{
          padding: .5em 0;
          border-bottom: 1px solid $narandza;
          text-align: center;
          font-size: 1.1rem;
          @include tablet{
            font-size: 1.2rem;
          }
        }
        & .genders{
          display: flex;
          justify-content: space-around;
          padding: .5em 0;
            & .radio{
            padding: .4em;
              & input[type="radio"]{
                margin-right: 1em;
              }
              & label{
                font-size: 1rem;
                margin: 0;
                @include tablet{
                  font-size: 1.2rem;
                }
                @include laptop{
                  font-size: 1.1rem;
                }

              }
            }
        }
        & .msg{
          margin: .4em 0 .8em 0;
          text-align: center;
          font-size: 1.2rem;
          height: 25px;
          color: $bela_kao;
          @include tablet{
              font-size: 1.3rem;
              margin: 1.1em 0;
          }
          @include laptop{
              font-size: 1.15rem;
              margin: .9em 0;
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
          @include laptop{
            font-size: .9rem;
          }
        }
        .login{
          color: $bela_kao;
          text-align: center;
          margin: 1em 0 0 0;
          @include tablet{
              font-size: 1.1rem;
          }
            & span{
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
