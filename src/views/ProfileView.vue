<template>
  <div class="main w-[100vw] h-[100vh]">
  <basic-header></basic-header>
  <main>
    <div>
      <basic-navigation feed="#fff" movies="#fff" profile="border-[2px] border-solid border-[#E31221]"></basic-navigation>
    </div>
    <div class="bg-gray h-[100vh]">
      <img src="/src/assets/LordofRingsMovie.png" class="w-[80rem]">
      <div></div>
      <div></div>
    </div>
    <div></div>

  </main>
  </div>
</template>



<script>
import { useLoginStore } from '@/stores/LoginStore.js';
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import BasicHeader from "@/components/BasicHeader.vue";
import BasicNavigation from "@/components/BasicNavigation.vue";

export default {
  name:'profile',
  components:{BasicHeader, BasicNavigation},
  
  setup(){

    const login = useLoginStore();
    const router = useRouter();


const data=ref({})
    

     onMounted(()=>{
       login.fetchUserData(router.currentRoute.value.params.id, data)
      });
return {data}
  }
  
}
</script>


<style scoped>
.main{
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%);
}
main{
  display: grid;
  grid-template-columns: 1fr auto 1fr;
}
</style>