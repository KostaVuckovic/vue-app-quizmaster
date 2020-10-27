<template>
  <div class="home">

    <header>
      <h2>Quiz <span>Master</span></h2>
      <img id="img" class="img" src="../assets/quiz_bg2.svg" alt="quiz">
      <button id="leaderboardBtn" class="leaderboardBtn" >LEADERBOARD</button>
    </header>

    <div class="buttons">
      <button class="btn" @click="signUp()">SIGN UP</button>
      <button class="btn" @click="signIn()">SIGN IN</button>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    signUp(){
      this.$router.push({name: 'SignUp'})
    },
    signIn(){
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

.home{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

@keyframes sectionDown {
  from {
    height: 0;
  }
  to {
    height: 75%;
  }
}

@keyframes opacityAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

header{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: $svetlo_plava;
  padding: 1.5em 0;
  width: 100%;
  animation-duration: 2s;
  animation-name: sectionDown;
  animation-fill-mode: forwards;  
  transition: height 2s;
  border-radius: 0 0 40px 40px;
  -webkit-box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
  -moz-box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
  box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
    & h2{
      color: $bela_kao;
      text-align: center;
      font-size: 2.8rem;
      animation-duration: 2s;
      animation-name: opacityAnimation;
      animation-delay: 2s;
      animation-fill-mode: forwards;  
      opacity: 0;
      font-weight: 500;
      letter-spacing: -1px;
        & span{
          color: $narandza;
        }
    }
    & .img{
      width: 75%;
      max-width: 300px;
      // margin: 3em 0;
      animation-duration: 2s;
      animation-name: opacityAnimation;
      animation-delay: 2s;
      animation-fill-mode: forwards;  
      opacity: 0;
    }
    & .leaderboardBtn{
      background-color: $narandza;
      border-radius: 20px;
      border: 1px solid $narandza;
      padding: .9em 3em;
      animation-duration: 2s;
      animation-name: opacityAnimation;
      animation-delay: 2s;
      animation-fill-mode: forwards;  
      opacity: 0;
      width: 85%;
      max-width: 300px;
      color: $bela_kao;
      font-size: 1rem;
      font-weight: 500;
      // margin: 1.2em 0;
    } 
}

.buttons{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2px 0;
    & .btn{
      background-color: $narandza;
      border-radius: 20px;
      border: 1px solid $narandza;
      padding: .9em 3em;
      width: 85%;
      max-width: 300px;
      color: $bela_kao;
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 10px;
    }
}

</style>
