<template>
  <transition name="modal">
    <div class="wrapper" @click="close">
      <div class="container">

        <header>
          <p>Personal info about user</p>  
          <button type="button" class="close" @click="close">
            <span>&times;</span>
          </button>
        </header>

        <div class="modal-body">
          <slot name="body">
            default body text
          </slot>
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
      max-width: 380px;
      width: 85%;
      transition: all .3s ease;
      @include phone{
        max-width: 470px;
        padding: 1.2em;
      }
        & header{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5em;
          padding-bottom: .5em;
          border-bottom: 1px solid $narandza;
          @include phone{
            margin-bottom: 6em;
          }
            & p{
              margin: 0;
              color: $bela_kao;
              @include phone{
                font-size: 1.1rem;
              }
              @include laptop{
                font-size: 1.2rem;  
              }
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
        & .modal-body{
          // margin-top: 2em;
          padding: .5em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
    }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .container,
.modal-leave-active .container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>