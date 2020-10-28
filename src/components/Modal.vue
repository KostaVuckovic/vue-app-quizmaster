<template>
  <transition name="fade" mode="out-in">
    <div class="wrapper">
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

<style>
.wrapper {
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

</style>