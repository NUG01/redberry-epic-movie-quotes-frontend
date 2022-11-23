import { useAuthStore } from "@/stores/AuthStore.js";
import { useLoginStore } from '@/stores/LoginStore.js';
import axios from "@/config/axios/index.js";



export async function isAuthenticated() {
  const authStore = useAuthStore();
  const login = useLoginStore();
  if(login.getUserData==null){
     let res= await axios.get("user")
     if(res.data.user==null){
       authStore.authenticated=false
      }
    }
  
  if (authStore.authenticated==false) {
    return "/403-forbidden";
  }
}

export async function isLoggedIn() {
  const authStore = useAuthStore();
  const login = useLoginStore();
  
  if(login.getUserData==null){
    let res= await axios.get("user")
    if(res.data.user!=null){
      authStore.authenticated=true
    }
  }

  if (authStore.authenticated==true) {
    return "/news-feed";
  }
}