import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";
import {setJwtToken, getJwtToken} from "@/helpers/jwt/index.js";

export const useLoginStore = defineStore("useLoginStore",{
 state(){
  return{
      isLogged:false,
      userData:null,
      isGoogleLogged:false,
      googleData:null,
      isLoggedOut:false,
      errors:[],
  }
 },

   getters:{
    getIsLogged: (state) => state.isLogged,
    getIsLoggedOut: (state) => state.isLoggedOut,
    getIsGoogleLogged: (state) => state.isLogged,
    getUserData: (state)=>state.userData,
    getIsLoggedErrors: (state) => state.errors,
 },



    actions:{
    
    changeStatus(){
      this.isLogged=true;
    },
    changeLogoutStatus(){
      this.isLoggedOut=true;
    },
    cleanErrors(){
      this.errors=[];
    },


    sendLoginData(values){
      axios.post('login', {
        name: values.name,
        password: values.password,
      })
      .then((response)=>{
        setJwtToken(response.data.access_token, response.data.expires_in);
        this.isLogged=true;
        this.googleData=response.data;
        //redirect from here to news feed page
      })
      .catch((error)=> {
        alert(error);
      });
    },


    loginWithGoogle(valueId, valueCode){
      axios.post('auth/google/login', {
        token: valueId,
       email: valueCode,
      })
      .then((response)=>{
        setJwtToken(response.data.access_token, response.data.expires_in);
        this.isGoogleLogged=true;
        this.userGoogleData=response.data;
        //redirect from here to news feed page
      })
      .catch((error)=> {
        //redirect on forbidden page
      });
    },

    sendLogoutData(){
      axios.post('logout', {
        token: getJwtToken(),
      })
      .then(()=>{
        document.cookie = 'jwt_token' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.isLoggedOut=true;
        location.reload();
      })
      .catch((error)=> {
        alert(error);
      });
    },

 }
});
