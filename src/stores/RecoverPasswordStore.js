import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useRecoverStore = defineStore("useRecoverStore",{
 state(){
  return{
      isRecovered:true,
      errors:[],
  }
 },

   getters:{
    getIsRecovered: (state) => state.isRecovered,
    getRecoverPasswordErrors: (state) => state.errors,
 },



    actions:{
    
    changeStatus(){
      this.isRecovered=true;
    },
    cleanErrors(){
      this.errors=[];
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
        this.errors=[],
        this.errors.push(error.response.data)
        //redirect from here on forgot password route
      });
    },

 }
});