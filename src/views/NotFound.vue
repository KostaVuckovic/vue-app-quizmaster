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


</style>