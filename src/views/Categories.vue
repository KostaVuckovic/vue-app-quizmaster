<template>
  <div class="wrapper">
      <header>
          <h2>Quiz <span>Master</span></h2>
          <img :src="avatarImage(this.gender)" alt="">
      </header>

      <h3>Choose a category</h3>

      <div class="categories">
        <div class="category" v-for="category in categories" :key="category.cat_id" @click="playCategory(category.cat_id, category.cat_category)">
            <img :src="getImgUrl(category.cat_id)" alt="category">
            <p>{{category.cat_category}}</p>
        </div>
      </div>
        
    <Modal
        v-show="isModalVisible"
        @close="closeModal"
    >
        <template #body>

            <div class="infoModal">
                <p><span class="spanUser">Name:</span> {{USERNAME}} </p>
                <p><span class="spanUser">Lastname:</span> {{USERLASTNAME}} </p>
                <p><span class="spanUser">Username:</span> {{USERUSERNAME}} </p>
            </div>
            
        </template>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
import Modal from '@/components/Modal.vue'

export default {
name: 'Categories',
components: {
    Modal
},
data(){
    return{
        categories: [],
        isModalVisible: false,
        gender: 1,
        userName: null,
        userUsername: null,
        userLastname: null
    }
},
mounted(){
    this.getInfoForUser()
    this.showCategories()
},
beforeRouteEnter (to, from, next) {
  let sid = localStorage.getItem('sid');
  axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/initScripts/sessioncheck', {sid: sid})
  .then(() => {
      next()
  })
  .catch(() => {
      next('/login')
  })
},
computed: {
    USERNAME(){
        return this.userName;
    },
    USERLASTNAME(){
        return this.userLastname;
    },
    USERUSERNAME(){
        return this.userUsername;
    }
},
methods:{
    getInfoForUser(){
        axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/getInfoForUserModal', {sid: localStorage.getItem('sid')})
        .then((response) => {
            this.userName = response.data.info[0].user_name;
            this.userLastname = response.data.info[0].user_lastname;
            this.userUsername = response.data.info[0].user_username;
            this.gender = response.data.info[0].ava_id;
        })
    },
    logOut(){
        let sid = localStorage.getItem('sid');
        axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/auth/logout', {sid: sid})
        .then(() => {
            localStorage.clear();
            this.$router.push({name: 'Login'})
        })
    },
    avatarImage(id){
        return require('../assets/avatar' + id + '.svg')
    },
    showModal() {
        this.isModalVisible = true;
    },
    closeModal() {
        this.isModalVisible = false;
    },
    getImgUrl(cat) {
        return require('../assets/cat' + cat + '.svg')
    },
    showCategories(){
        let sid = localStorage.getItem('sid');
        axios.get('http://051b122.mars-e1.mars-hosting.com/quiz/engine/category', {params:{sid}})
        .then((response) => {
            this.categories = response.data.data
        })
    },
    playCategory(id, category_name){
        let sid = localStorage.getItem('sid');
        axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/category', {sid, id, category_name})
        .then(() => {
            this.$router.push({name: 'Playground'})
        })
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5em 1.1em;
        width: 100%;
        background-color: $tamno_plava;
        border-radius: 0 0 40px 40px;
        -webkit-box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
        -moz-box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
        box-shadow: 0px 9px 63px 12px rgba(0,0,0,0.42);
            & h2{
                color: $bela_kao;
                font-size: 2.2rem;
                text-align: center;
                    & span{
                        color: $narandza;
                    }
            }
            img{
                width: 12%;
            }
    }
    & h3{
        color: $bela_kao;
        font-size: 1.8rem;
        margin: 1em 0;
    }
    & .categories{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
            & .category{
                display: flex;
                align-items: center;
                width: 85%;
                margin: .5em 0;
                background-color: $svetlo_plava;
                color: $bela_kao;
                padding: .6em .8em;
                font-size: 1.4rem;
                border-radius: 10px;
                    & img{
                        width: 18%;
                    }
                    & p{
                        margin: 0 0 0 1em;
                        font-weight: 500;
                    }
            }
    }
    
}
</style>