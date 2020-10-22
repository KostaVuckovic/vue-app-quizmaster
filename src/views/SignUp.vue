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
        <label for="gender">Select gender</label>
        <div class="genders">
          <div class="radio">
            <input id="r1" type="radio" name="radio" value="1" v-model="gender">
            <label for="r1">Male</label>
            <div class="check"></div>
          </div>
          
          <div class="radio">
            <input id="r2" type="radio" name="radio" value="2" v-model="gender">
            <label for="r2">Female</label>
            <div class="check"></div>
          </div>
          
        </div>
        <button class="btn" @click="createAcc(nameModel, lastnameModel, usernameModel, passwordModel, gender)">SIGN UP</button>
        <p class="login">Or <span @click="goLogin">log in?</span></p>
        <p style="color: white" class="msg">{{msg}}</p>
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

      if(gender == null){
        let mess = document.querySelector('.msg');
        mess.style.visibility = "visible";
        this.animateCSS('.msg', 'shake');
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

@keyframes containerDown {
  from {
    height: 0;
  }
  to {
    height: 75%;
  }
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
      animation-duration: 2s;
      animation-name: containerDown;
      animation-fill-mode: forwards;  
      transition: height 2s;
      padding: 1.5em;
      width: 85%;
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
    }
}

// input[type="radio"]{
//   position: absolute;
//   visibility: hidden;
// }

// .genders{
//   display: flex;
//   justify-content: space-between;
//     & .radio{
//       padding: .5em;
//         & .check{
//           display: block;
//           position: absolute;
//           border: 5px solid #AAAAAA;
//           border-radius: 100%;
//           height: 25px;
//           width: 25px;
//           top: 30px;
//           left: 20px;
//           z-index: 5;
//           transition: border .25s linear;
//           transition: border .25s linear;
//         }
//     }
//     & label{
//       cursor: pointer;
//       transition: all 0.25s linear;
//     }
  
// }

.login{
  color: $bela_kao;
  text-align: center;
    & span{
      color: $narandza;
    }
}
</style>
