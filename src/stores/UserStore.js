import { defineStore } from "pinia";

export const useUserStore = defineStore("useUserStore",{
 state(){
  return{
      userData:null,
  }
 },

   getters:{
    getUserData: (state)=>state.userData,
 },
});
