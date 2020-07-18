<template>
  <div class="wrapper404">
      <div class="main404">
          <h1 class="first">404</h1> 
          <h1 class="second"> NOT FOUND</h1>
        <p>Looks like you're lost. </p>
        <button class="action-button green" @click="goBack"><span class="material-icons">arrow_back</span></button>
      </div>
  </div>
</template>

<script>
export default {
    methods: {
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.wrapper404{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    box-sizing: border-box;
    background: url('../assets/quiz1.jpg') repeat center center fixed;
    background-repeat: repeat;
    background-position: center;
    background-size: cover;
    font-family: 'Pridi', serif;
}

.main404{
    height: 50%;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}


.first {
    font-size: 5.8rem;
    color: #fff;
    font-family: 'Pridi', serif;
    margin: 0;
    text-shadow: -0.06em 0 red,  0.06em 0 cyan;
}

.second {
    font-size: 5.8rem;
    color: #fff;
    margin: 0;
    text-shadow: -0.06em 0 red,  0.06em 0 cyan;
}

.main404 p {
    font-size: 3rem;
    color: #fff;
    margin: 0;
    text-shadow: -0.06em 0 red,  0.06em 0 cyan;
}

.action-button{
  font-family: 'Press Start 2P', cursive;
  padding: 0 20px;
  border-radius: 10px;
  font-size: 27px;
  color: #FFF;
  text-decoration: none;	
  border: none;
  vertical-align: middle;
}

.action-button span{
    font-size: 1.8rem;
    vertical-align: middle;
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

@media screen and (max-width: 345px){
.main404{
    height: 60%;
    width: 100%;
}

.first {
    font-size: 4.3rem;
}

.second {
    font-size: 3rem;
}

.main404 p {
    font-size: 1.6rem;
}

.action-button{
  padding: 5px 10px;
  font-size: 1rem;
} 
}

@media screen and (min-width: 350px) and (max-width: 600px){
.main404{
    height: 60%;
    width: 100%;
}

.first {
    font-size: 5.9rem;
}

.second {
    font-size: 3.9rem;
}

.main404 p {
    font-size: 2rem;
}

.action-button{
  padding: 5px 15px;
  font-size: 1.3rem;
} 
}

@media screen and (min-width: 601px) and (max-width: 950px){
.main404{
    height: 60%;
    width: 80%;
}

.first {
    font-size: 7.9rem;
}

.second {
    font-size: 4.9rem;
}

.main404 p {
    font-size: 2.5rem;
}

.action-button{
  padding: 5px 15px;
  font-size: 2rem;
} 
}

@media screen and (min-width: 951px) and  (max-width: 1450px){
.main404{
    height: 80%;
    width: 50%;
}

.first {
    font-size: 7.5rem;
}

.second {
    font-size: 4.5rem;
}

.main404 p {
    font-size: 2rem;
}

.action-button{
  padding: 5px 15px;
  font-size: 1.5rem;
} 
}
</style>