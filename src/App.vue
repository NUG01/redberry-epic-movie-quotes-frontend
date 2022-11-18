<script>
import { ref, onMounted } from "vue";
import { RouterView } from "vue-router";
import axios from "@/config/axios/index.js";
import { useLoginStore } from '@/stores/LoginStore.js';



export default {
  setup(){
    const login = useLoginStore();
    const dataIsFetched=ref(false)
    const usersIsFetched=ref(false)



  onMounted(async()=>{
    if(login.getAllUser==null){
      const resUsers= await axios.get("users")
      login.updateAllUserData(resUsers.data);
      login.changeUsersFetchedStatus()
      usersIsFetched.value=login.getUsersIsFetched
      }
    if(login.getUserData==null){
      const res= await axios.get("auth-user")
      login.updateUserData(res.data);
      login.changeFetchedStatus()
      dataIsFetched.value=login.getDataIsFetched
      }
   })



    return{dataIsFetched, usersIsFetched}
  }
}
</script>

<template>
    <router-view v-if="dataIsFetched && usersIsFetched"></router-view>
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
