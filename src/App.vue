<script>
import { ref, onMounted } from "vue";
import axios from "@/config/axios/index.js";
import { useUserStore } from '@/stores/UserStore.js';
import { useAuthStore } from "@/stores/AuthStore.js";



export default {
  setup(){
    const login = useUserStore();
    const dataIsFetched=ref(false)
    const authStore = useAuthStore();



  onMounted(async()=>{
    if(login.getUserData==null){
      const res= await axios.get("user")
      login.userData=res.data.user;
      if(login.getUserData!=null){
        authStore.authenticated = true;
      }
      dataIsFetched.value=true
      }else{
        authStore.authenticated = true;
      }
   })



    return{dataIsFetched}
  }
}
</script>

<template>
    <router-view v-if="dataIsFetched"></router-view>
</template>

<style>
html{
  font-size: 62.5%;
  outline: none;
  margin:0;
  padding:0;
  box-sizing: border-box;
  overflow-x: hidden;
  width: 100vw;
}
</style>
