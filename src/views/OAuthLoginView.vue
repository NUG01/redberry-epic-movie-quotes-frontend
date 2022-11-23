<script>
import { useLoginStore } from '@/stores/LoginStore.js';
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "@/config/axios/index.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useAuthStore } from "@/stores/AuthStore.js";

export default {
  name:'OAuth',
  components:{LoadingSpinner},
   setup(){

    const login = useLoginStore();
    const router = useRouter();
    const authStore = useAuthStore();
    


    onMounted(async()=>{
      const userId=router.currentRoute.value.query.user_id
      const response=await axios.get(`user/${userId}`)
      login.userData=response.data;
      login.changeFetchedStatus();
      login.isGoogleLogged=true;
      authStore.authenticated=true;
      router.push({ name: 'news-feed' })})


    return {}
   }

}
</script>


<template>
<div class="bg-[#181623] w-[100vw] h-[100vh] absolute top-0 left-0">
  <loading-spinner location="mt-[30rem]"></loading-spinner>
</div>
</template>
