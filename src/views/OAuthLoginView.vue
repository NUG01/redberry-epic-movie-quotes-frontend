<script>
import { useLoginStore } from '@/stores/LoginStore.js';
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "@/config/axios/index.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
export default {
  name:'OAuth',
  components:{LoadingSpinner},
   setup(){

    const login = useLoginStore();
    const router = useRouter();

    onMounted(()=>{
      login.loginWithGoogle(router.currentRoute.value.query.token, router.currentRoute.value.query.expires_in, router.currentRoute.value.query.user_id);
    })


    return {}
   }

}
</script>


<template>
<div class="bg-[#181623] w-[100vw] h-[100vh] absolute top-0 left-0">
  <loading-spinner location="mt-[30rem]"></loading-spinner>
</div>
</template>
