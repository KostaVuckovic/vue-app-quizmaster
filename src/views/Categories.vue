<template>
  <div class="wrapper">

        <div class="profile">

            <button class="profileInfo" @click="clickMenu">
            <span class="material-icons">account_circle</span> <span>{{USERUSERNAME}}</span> 
            </button>
            <div class="menu">
                <p @click="showModal">Info</p>
                <p @click="logOut">Log Out</p>
            </div>

        </div>

        <div class="container">

            <div class="header">
                <h1>First, choose a category.</h1>
            </div>

            <div class="categories">

                <div class="categorie" v-for="cat in categories" :key="cat.cat_id" @click="playCategory(cat.cat_id)">
                    <img :src="getImgUrl(cat.cat_id)" alt="">
                    <div class="textCat">
                        <h1>{{cat.cat_category}}</h1>
                    </div>
                </div>

            </div>
            <Modal
                v-show="isModalVisible"
                @close="closeModal"
            >
                <template #body>

                    <img :src="'http://051b122.mars-e1.mars-hosting.com/quiz/avatar/'+ AVATAR +'/avatar'" alt="">
                    <div class="infoModal">
                        <p><span class="spanUser">Name:</span> {{USERNAME}} </p>
                        <p><span class="spanUser">Lastname:</span> {{USERLASTNAME}} </p>
                        <p><span class="spanUser">Username:</span> {{USERUSERNAME}} </p>
                    </div>
                   
                </template>
            </Modal>
        </div>
        
      
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
        ava_id: 1,
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
    },
    AVATAR(){
        return this.ava_id;
    }
},
methods:{
    getInfoForUser(){
        axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/getInfoForUserModal', {sid: localStorage.getItem('sid')})
        .then((response) => {
            this.userName = response.data.info[0].user_name;
            this.userLastname = response.data.info[0].user_lastname;
            this.userUsername = response.data.info[0].user_username;
            this.ava_id = response.data.info[0].ava_id;
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
    clickMenu(){
        let menu = document.querySelector('.menu');
        menu.classList.toggle('active');
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
        axios.get('http://051b122.mars-e1.mars-hosting.com/quiz/engine/category', {params:{sid: sid}})
        .then((response) => {
            this.categories = response.data.data
        })
    },
    playCategory(id){
        let sid = localStorage.getItem('sid');
        axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/engine/category', {sid: sid, id: id})
        .then(() => {
            this.$router.push({name: 'Playground'})
        })
    }
}
}
</script>

<style scoped>
.wrapper{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100vh;
    min-height: 620px;
    background: url('../assets/quiz11.jpg') repeat center center fixed;
    background-repeat: repeat;
    background-position: center;
    background-size: cover;
}

.container{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 90%;
    max-height: 750px;
    width: 50%;
    align-items: center;
    background-color: #3a3a3c;
}

.header h1{
    padding: 10px;
    font-size: 3.1rem;
    margin: 0;
    text-align: center;
    color: #fff;
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    border-right: .15em solid #fff; /* The typwriter cursor */
    white-space: nowrap; /* Keeps the content on a single line */
    margin: 0 auto; /* Gives that scrolling effect as the typing happens */
    animation: 
    typing 2s steps(40, end),
    blink-caret .75s step-end 8;
    border-right: .10em solid transparent;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #6C63FF; }
}

.categories{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    align-content: space-around;
    height: 60%;
    width: 90%;
    max-width: 800px;
}

.categorie{
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 45%;
    height: 45%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.49);
    transition: transform .2s;
}

.categorie:hover{
    cursor: pointer;
    transform: scale(1.03);
    transition: .3s;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 9), 0 8px 23px 0 rgba(0, 0, 0, 9);
}

.categorie{
    overflow:hidden;
}

.categorie:hover{
    cursor: pointer;
    box-shadow: 0 9px 11px 0 rgba(0, 0, 0, 0.9), 0 10px 26px 0 rgba(0, 0, 0, 1);
    background-color: #6C63FF;
}

.categorie:hover .textCat h1{
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    transform: scale(1.5) translateY(40px);
    transition: transform ease-in-out 500ms;
    color: #fff;
}

.categorie:hover .textCat h1::after{
    font-family: 'Material Icons';
    content: "forward";
    display: block;
    text-align: center;
}

.categorie:hover img{
    width: 55%;
    transform: translateY(150%);
    transition: width ease-in-out 300ms,
                transform ease-in-out 400ms;
}

.textCat h1{
    font-size: 2rem;
    order:1;
    margin: 0;
    font-weight: bold;
    color: #6C63FF;
}

.categorie img{
    order: 2;
    width: 42%;
    border-radius: 10px;
}

.profile{
    position: absolute;
    top: 15px;
    right: 15px;
}

.profileInfo{
    border-radius: 5px;
    padding: 8px 25px;
    color: rgb(255, 255, 255);
    position: relative;
    background-color: #3d5af1;
    border: none;
}

.profileInfo span{
    text-align: center;
    vertical-align: middle;
    font-size: 2rem;
}

.profileInfo:focus{
    background-color: #3d5af1;
    outline: none;
}

.menu{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    visibility: hidden;
    position: absolute;
    width: 100%;
    margin: 0;
    padding: 0;
    transition: 0.5s;
    opacity: 0;
}

.menu.active{
    visibility: visible;
    opacity: 1;
}

.menu p{
    position: relative;
    box-sizing: border-box;
    font-size: 1.2rem;
    display: block;
    color:#0e153a;
    margin: 0;
    width: 100%;
    max-width: 170px;
    text-align: center;
    background-color: #e2f3f5;
    border-radius: 5px;
    transition: 0.5s;
    padding: 8px 5px;
    border-bottom: 1px solid #0300c5;
}

.menu p:hover{
    cursor: pointer;
    background-color: #22d1ee;
    color: #0e153a;
}

@media screen and (max-width: 349px){
.wrapper{
    min-height: 550px;
    background: url('../assets/quiz1.jpg') repeat center center fixed;
    background-size: cover;
}

.container{
    width: 100%;
    height: 60%;
}

.header h1{
    font-size: 1.35rem;
}

.textCat h1{
    font-size: 1rem;
}

.categorie img{
    width: 70%;
}

.profile{
    position: absolute;
    top: 10px;
    right: 10px;
}

.profileInfo{
    padding: 6px 15px;
    position: relative;
}

.profileInfo span{
    font-size: 1rem;
}

.menu{
    position: absolute;
    width: 100%;
}

.menu p{
    position: relative;
    font-size: 0.8rem;
    width: 100%;
    max-width: 120px;
    padding:7px 5px;
}
}

@media screen and (min-width: 350px) and  (max-width: 600px){
.wrapper{
    background: url('../assets/quiz1.jpg') repeat center center fixed;
    background-size: cover;
}

.container{
    height: 60%;
    width: 100%;
}

.header h1{
    font-size: 1.65rem;
}

.categories{
    height: 75%;
    width: 100%;
}

.categorie{
    max-width: 200px;
}

.categorie img{
    width: 60%;
    max-width: 100px;
}

.textCat h1{
    font-size: 1.3rem;
}

.profile{
    position: absolute;
    top: 10px;
    right: 10px;
}

.profileInfo{
    padding: 7px 18px;
    position: relative;
}

.profileInfo span{
    font-size: 1.3rem;
}

.menu{
    position: absolute;
    width: 100%;
}

.menu p{
    position: relative;
    font-size: 0.8rem;
    width: 100%;
    max-width: 120px;
    padding: 8px 5px;
}
}

@media screen and (min-width: 601px) and  (max-width: 950px){
.wrapper{
    background: url('../assets/quiz1.jpg') repeat center center fixed;
    background-size: cover;
}

.container{
    height: 70%;
    width: 90%;
    align-items: center;
    background-color: #3a3a3c;
}

.header h1{
    font-size: 2.5rem;
}

.categories{
    height: 70%;
    width: 100%;
}

.categorie img{
    width: 55%;
}

.textCat h1{
    font-size: 1.8rem;
}

.profile{
    position: absolute;
    top: 10px;
    right: 10px;
}

.profileInfo{
    padding: 7px 18px;
    position: relative;
}

.profileInfo span{
    font-size: 1.5rem;
}

.menu{
    position: absolute;
    width: 100%;
}

.menu p{
    position: relative;
    width: 100%;
    max-width: 140px;
    padding: 10px 10px;
}
}

@media screen and (min-width: 951px) and  (max-width: 1450px){
.container{
    height: 85%;
    width: 60%;
    background-color: #3a3a3c;
    border-radius: 5px;
}

.header h1{
    font-size: 2.8rem;
}

.categories{
    width: 90%;
    height:65%;
    max-height: 530px;
}

.categorie img{
    width: 35%;
}

.textCat h1{
    font-size: 1.75rem;
    font-weight: bold;
}

.profile{
    position: absolute;
    top: 10px;
    right: 10px;
}

.profileInfo{
    padding: 6px 20px;
    position: relative;
}

.profileInfo span{
    font-size: 1.4rem;
}

.menu{
    position: absolute;
    width: 100%;
}

.menu p{
    position: relative;
    font-size: 0.9rem;
    width: 100%;
    max-width: 140px;
    padding: 10px 5px;
}

.categorie:hover{
    cursor: pointer;
    box-shadow: 0 9px 11px 0 rgba(0, 0, 0, 0.9), 0 10px 26px 0 rgba(0, 0, 0, 1);
    background-color: #6C63FF;
}

.categorie:hover .textCat h1{
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    transform: scale(1.3) translateY(30px);
    transition: transform ease-in-out 500ms;
    color: #fff;
}

.categorie:hover .textCat h1::after{
    font-family: 'Material Icons';
    content: "forward";
    display: block;
    text-align: center;
}

.categorie:hover img{
    width: 55%;
    transform: translateX(9999px);
    transition: width ease-in-out 500ms,
                transform ease-in-out 500ms;
}
}
</style>