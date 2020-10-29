<template>
  <transition name="fade" mode="out-in">
    <div class="wrapper">
      <div class="container">
        <header>
          <h2>Top 10 players</h2>
          <button @click="close">&times;</button>
        </header>

        <div class="scores">
          <slot class="score"></slot>
        </div>
        
      </div>
    </div>
  </transition>
</template>

<script>
export default {
name: 'Leaderboard',
methods: {
  close(){
    this.$emit('close')
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
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
    & .container{
      background-color: $tamno-plava;
      padding: 1em;
      border-radius: 15px;
        & header{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1em;
            & h2{
              margin: 0;
              color: $bela_kao;
            }
            & button{
              border: none;
              font-size: 2rem;
              background: transparent;
              font-weight: 500;
              color: $bela_kao;
                &:focus{
                  outline: none;
                }
            }
        }
        & .scores{
          padding: .5em;
            
        }
    }
}
</style>