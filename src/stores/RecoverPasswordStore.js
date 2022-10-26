import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useRecoverStore = defineStore("useRecoverStore",{
 state(){
  return{
      isRecovered:true,
  }
 },

   getters:{
    getIsRecovered: (state) => state.isRecovered,
 },



    actions:{
    
    changeStatus(){
      this.isRecovered=true;
    },


    sendRecoverData(values, token, email){
      axios.post('reset-password-form', {
        password: values.password,
        token: token,
        email: email
      })
      .then(()=>{
        this.isRecovered=false;
      })
      .catch((error)=> {
        alert(error);
      });
    },

 }
});
