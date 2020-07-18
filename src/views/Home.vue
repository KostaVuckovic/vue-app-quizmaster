<template>
  <div class="home">

    <div class="main">
      <h1>QUIZ<br>MASTER</h1>
      <button class="play" @click="clickCheck"><span class="material-icons">play_circle_filled</span></button>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Home',
  mounted(){
    setTimeout(this.enterPress, 2000);
  },
  methods: {
    enterPress(){
      let anim = document.querySelector('.play');
      anim.style.visibility = "visible";
      anim.style.opacity = "1";
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
    clickCheck(){
      let th = this;
      this.animateCSS('.play', 'slideOutRight', function() {
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

  .play{
    animation-duration: 1s;
    border: 0;
    opacity: 0;
    background-color: darkcyan;
    transition: visibility 0s, opacity 0.5s linear;
    color: #ffffff;
    text-align: center;
    padding: 10px;
    border-radius: 100%;
    font-family: 'Press Start 2P', cursive;
  }

  .play span{
    font-size: 5rem;
    text-align: center;
    vertical-align: middle;
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

  .play{
    animation-duration: 1s;
    border: 0;
    opacity: 0;
    background-color: darkcyan;
    transition: visibility 0s, opacity 0.5s linear;
    font-size: 1rem;
    color: #ffffff;
    text-align: center;
    padding: 10px;
}

  .play span{
    font-size: 2rem;
    text-align: center;
    vertical-align: middle;
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

  .play{
    animation-duration: 1s;
    border: 0;
    opacity: 0;
    background-color: darkcyan;
    transition: visibility 0s, opacity 0.5s linear;
    color: #ffffff;
    text-align: center;
    padding: 10px;
    border-radius: 100%;
}

.play span{
  font-size: 3rem;

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

  .play{
    animation-duration: 1s;
    border: 0;
    opacity: 0;
    background-color: darkcyan;
    transition: visibility 0s, opacity 0.5s linear;
    color: #ffffff;
    text-align: center;
    padding: 10px;
}

.play span{
    font-size: 3rem;

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

.play{
  animation-duration: 1s;
  border: 0;
  opacity: 0;
  background-color: darkcyan;
  transition: visibility 0s, opacity 0.5s linear;
  color: #ffffff;
  text-align: center;
  padding: 10px;
  border-radius: 100%;
    
}

.play span{
  font-size: 3.5rem;

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

</style>
