<template>
  <transition name="fade" mode="out-in">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
            <p>Info about user.</p>  
            
            <button type="button" class="close" @click="close">
              <span aria-hidden="true">&times;</span>
            </button>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close');
      }
    }
  };
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 65%;
}

.modal-container {
  width: 50%;
  max-width: 560px;
  height: 100%;
  max-height: 750px;
  margin: 0 auto;
  background-color: #e2f3f5;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.7s ease;
}

.modal-header{
  padding: .5em 1em;
}

.modal-header p {
  font-size: 1.7rem;
  margin: 0;
  color: #0e153a;
}

.close{
  font-size: 2.5rem;
}

.close:focus{
  outline: none;
}

.modal-body {
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.modal-body img{
  width: 40%;
  border-radius: 5px;
  margin: 0 auto;
}

.infoModal{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 40%;
  width: 90%;
}

.infoModal p {
  display: inline-block;
  margin: 0;
  color: #0e153a;
  font-size: 1.7rem;
  border: 1px solid gray;
  width: 85%;
  border-radius: 3px;
}

.spanUser{
  padding: 3px 5px;
  background-color: #4AAE9B;
  color: #fff;
}


@media screen and (max-width: 349px){
.modal-wrapper {
  width: 100%;
  height: 70%;
  min-height: 370px;
}

.modal-container {
  width: 80%;
  height: 90%;
  max-height: 400px;
}

.modal-header{
  padding: .5em;
}

.modal-header p {
  font-size: 1.05rem;
}

.close{
  font-size: 1.5rem;
}

.modal-body img{
  width: 45%;
}

.infoModal p {
  font-size: 1.15rem;
  width: 100%;
}
}

@media screen and (min-width: 350px) and  (max-width: 600px){
.modal-wrapper {
  width: 100%;
  height: 70%;
}

.modal-container {
  width: 75%;
  height: 85%;
}

.modal-header{
  padding: .5em;
}

.modal-header p {
  font-size: 1.2rem;
}

.close{
  font-size: 1.8rem;
}

.modal-body img{
  width: 45%;
}

.infoModal p {
  width: 100%;
  font-size: 1.2rem;
}
}

@media screen and (min-width: 601px) and  (max-width: 950px){
.modal-wrapper {
  width: 100%;
  height: 70%;
}

.modal-container {
  width: 55%;
  max-width: 360px;
  height: 70%;
}

.modal-header{
  padding: .5em;
}

.modal-header p {
  font-size: 1.4rem;
}

.close{
  font-size: 2.3rem;
}

.modal-body img{
  width: 40%;
  border-radius: 5px;
  margin: 0 auto;
}

.infoModal p {
  font-size: 1.5rem;
}
}

@media screen and (min-width: 951px) and  (max-width: 1450px){
.modal-wrapper {
  width: 60%;
  height: 70%;
}

.modal-container {
  width: 50%;
  height: 100%;
}

.modal-header{
  padding: .5em;
}

.infoModal p {
  font-size: 1.1rem;
}
}

</style>