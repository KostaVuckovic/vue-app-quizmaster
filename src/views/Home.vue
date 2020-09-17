<template>
  <div class="home">
    <div class="main">
      <h1>QUIZ<br>MASTER</h1>
      <button class="start-btn" @click="clickCheck">START</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
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
    clickCheck(){
      let th = this;
      this.animateCSS('.start-btn', 'flash', function() {
        th.$router.push({name: 'SignUp'})
      }) 
    }
  }
}
</script>

<style scoped>
.home {
  flex-direction: column;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  background: url('../assets/quiz1.jpg') repeat center center fixed;
  background-repeat: repeat;
  background-position: center;
  background-size: cover;
  }

.main h1{
  color: rgb(245, 245, 245);
  font-size: 8rem;
  pointer-events: none;
  margin: 0;
  font-weight: 900;
}

.start-btn{
  font-family: 'Press Start 2p';
  text-align: center;
  margin:5px;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 10px ;
  background-color: lightgray;
  text-shadow: -1px -1px black, 1px 1px white;
  color: gray;
  -webkit-border-radius: 7px;
  -moz-border-radius: 7px;
  -o-border-radius: 7px;
  border-radius: 7px;
  box-shadow: 0 .2em gray; 
  cursor: pointer;

}

.start-btn:active {
  box-shadow: none;
  position: relative;
  top: .2em;
}

.start-btn:focus{
  outline: none;
} 

.main{
  align-items: center;
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}

@media screen and (max-width: 349px){
  .home {
    flex-direction: column;
    display: flex;
    justify-content: space-around;
    align-items: center;
    }

  .main h1{
    color: rgb(245, 245, 245);
    font-size: 4.1rem;
    pointer-events: none;
    margin: 0;
  }

  .main{
    width: 100%;
    height: 45%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }

  .start-btn{
    font-size: .8rem;
  }
}


@media screen and (min-width: 350px) and (max-width: 800px){
    .home {
    flex-direction: column;
    display: flex;
    justify-content: space-around;
    align-items: center;
    }

  .main h1{
    color: rgb(245, 245, 245);
    font-size: 5rem;
    pointer-events: none;
    margin: 0;
  }

  .main{
    align-items: center;
    width: 100%;
    height: 45%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
  }

  .start-btn{
    font-size: 1rem;
  }
}

@media screen and (min-width: 801px) and (max-width: 1099px){
  .home {
    flex-direction: column;
    display: flex;
    justify-content: space-around;
    align-items: center;
    }

  .main h1{
    color: rgb(245, 245, 245);
    font-size: 5rem;
    pointer-events: none;
    margin: 0;
  }


  .main{
    align-items: center;
    width: 100%;
    height: 55%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
  }
}
@media screen and (min-width: 1100px) and  (max-width: 1450px){
.home {
  flex-direction: column;
  display: flex;
  justify-content: space-around;
  align-items: center;
  }

.main h1{
  color: rgb(245, 245, 245);
  font-size: 6.2rem;
  pointer-events: none;
  margin: 0;
}


.main{
  align-items: center;
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}
}

</style>
