<script>
import { useUserStore } from '@/stores/UserStore.js';
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "@/config/axios/index.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useAuthStore } from "@/stores/AuthStore.js";

export default {
  name:'OAuth',
  components:{LoadingSpinner},
   setup(){

    const login = useUserStore();
    const router = useRouter();
    const authStore = useAuthStore();
    


    onMounted(async()=>{
      const userId=router.currentRoute.value.query.user_id
      const res= await axios.get("user")
      login.userData=res.data.user;
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
