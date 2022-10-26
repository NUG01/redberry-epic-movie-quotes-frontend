import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";
import {setJwtToken} from "@/helpers/jwt/index.js";

export const useLoginStore = defineStore("useLoginStore",{
 state(){
  return{
      isLogged:false
  }
 },

   getters:{
    getIsLogged: (state) => state.isLogged,
 },



    actions:{
    
    changeStatus(){
      this.isLogged=true;
    },


    sendLoginData(values){
      axios.post('login', {
        name: values.name,
        password: values.password,
      })
      .then((response)=>{
        setJwtToken(response.data.access_token, response.data.expires_in);
        this.isLogged=true;
      })
      .catch((error)=> {
        alert(error);
      });
    },

 }
});
