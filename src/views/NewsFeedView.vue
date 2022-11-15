<script>
import { useLoginStore } from '@/stores/LoginStore.js';
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import BasicHeader from "@/components/BasicHeader.vue";
import BasicNavigation from "@/components/BasicNavigation.vue";
import CommentsIcon from "@/components/icons/CommentsIcon.vue";
import LikesIcon from "@/components/icons/LikesIcon.vue";
import PencilIcon from "@/components/icons/PencilIcon.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";

export default {
  name:'NewsFeed',
  components:{BasicHeader, BasicNavigation, CommentsIcon, LikesIcon, PencilIcon, SearchIcon},
  
  setup(){

    const login = useLoginStore();
    const router = useRouter();
    const dataIsFetched=ref(false)
    const user = ref([]);


    user.value =login.getUserData;
    dataIsFetched.value=login.getDataIsFetched

     function commentSubmit(ev){
    if(ev.target.value!=''){
      console.log(ev.target.value, 'okC')
    }
    return
  }


    

return {user,dataIsFetched, commentSubmit}
  }
  
}
</script>


<template>
<div v-if="dataIsFetched" class="main w-[100vw] h-[100vh] bg-[#181623] overflow-hidden">
  <basic-header></basic-header>
  <main class="w-[100%] h-[93%]">
    <div>
      <basic-navigation :user="user" :dataIsFetched="dataIsFetched" feed="#E31221" movies="#fff" profile="border-none"></basic-navigation>

    </div>
    <div class="bg-gray overflow-y-scroll scrollHide overflow-x-hidden">
      <div class="mt-[3.2rem] ml-[0.3rem] flex items-center gap-[2.4rem]">
        <div class="relative w-[85%]">
      <textarea :placeholder="$t('newsFeed.new_quote')" class="post rounded-[10px] h-[5.2rem] w-[100%] bg-[#24222F] pr-[2.5rem] pl-[5.6rem] py-[1rem]"></textarea> 
        <pencil-icon class="absolute top-0 left-0 translate-x-1/2 translate-y-1/2 hover:cursor-pointer"></pencil-icon>
        </div>

      <form class="w-[15%]">
        <div class="flex items-center gap-[1.6rem]">
       <button type="submit"><search-icon></search-icon></button>
        <input type="text" :placeholder="$t('newsFeed.search_by')"/>
        </div>
      </form>
      </div>
      <div class="w-[94rem] h-[auto] bg-[#11101A] p-[2.4rem] rounded-[12px] backdrop mt-[2.2rem]">
        <div class="flex items-center justify-start gap-[1.6rem]">
          <img src="/src/assets/InterstellarMovie.png" class="rounded-[100%] w-[5.2rem] h-[5.2rem]"/>
          <p class="text-[2rem] text-[#fff]">Maia Nakashidze</p>
        </div>
        <p class="mt-[1.6rem] mb-[2.8rem] text-[2rem] text-[#fff] font-normal">“Follow your dream.”movie-<span class="text-[#DDCCAA]">Billy Elliot.</span> (2000)</p>
        <div class="border-b border-solid border-[#f0f0f04d] pb-[2.5rem]">
        <img src="/src/assets/InterstellarMovie.png" class="rounded-[10px]"/>
        <div class="flex items-center justify-start gap-[2.4rem] mt-[2.4rem]">
        <div class="flex items-center justify-center gap-[1.2rem]"><span class="text-[#fff] text-[2rem]">3</span><comments-icon></comments-icon></div>
        <div class="flex items-center justify-center gap-[1.2rem]"><span class="text-[#fff] text-[2rem]">10</span><likes-icon></likes-icon></div>
        </div>
        </div>
      <div>
        <div class="flex gap-[2.4rem] pt-[2.4rem]">
         <img src="/src/assets/InterstellarMovie.png" class="rounded-[100%] w-[5.2rem] h-[5.2rem]"/>
         <div class="border-b border-solid border-[#f0f0f04d] pb-[2.4rem] pr-[1.2rem] w-[100%]">
          <p class="text-[2rem] font-medium text-[#fff]">Nina Baldadze</p>
          <p class="text-[2rem] font-normal text-[#fff]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc vel massa facilisis consequat elit morbi convallis convallis. Volutpat vitae et nisl et. Adipiscing enim integer mi leo nisl. Arcu vitae mauris odio eget.</p>
         </div>
        </div>
        <div class="flex gap-[2.4rem] pt-[2.4rem]">
         <img src="/src/assets/InterstellarMovie.png" class="rounded-[100%] w-[5.2rem] h-[5.2rem]"/>
         <div class="border-b border-solid border-[#f0f0f04d] pb-[2.4rem] pr-[1.2rem] w-[100%]">
          <p class="text-[2rem] font-medium text-[#fff]">Nika Tsetskhladze</p>
          <p class="text-[2rem] font-normal text-[#fff]">Lorem ipsum dolor sit amet, consectetur adipiscin</p>
         </div>
        </div>
        <div class="mt-[2.4rem] gap-[2.4rem] flex items-center">
          <img src="/src/assets/InterstellarMovie.png" class="rounded-[100%] w-[5.2rem] h-[5.2rem]"/>
          <textarea @keydown.enter.prevent="commentSubmit" :placeholder="$t('newsFeed.write_comment')" class="rounded-[10px] min-w-[91.5%] max-w-[91.5%] min-h-[5.2rem] max-h-[5.2rem] bg-[#24222F] px-[2.5rem] py-[1rem]"></textarea>
        </div>
      </div>
    </div>
      <div></div>
    </div>
    <div></div>

  </main>
  </div>
</template>



<style scoped>
.main{
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%);
}
main{
  display: grid;
  grid-template-columns: 1.2fr auto 1fr;
}
.backdrop{
  backdrop-filter: blur(25px);
}
.scrollHide::-webkit-scrollbar {
  display: none;
}
.scrollHide {
  scrollbar-width: none; 
}
textarea::placeholder {
    font-weight: 400;
    color: #CED4DA;
    font-size: 2rem;
}
input::placeholder {
    font-weight: 400;
    color: #CED4DA;
    font-size: 2rem;
}
.post::placeholder {
    font-weight: 400;
    color: #fff;
    font-size: 2rem;
}
.post {
  resize: none;
  font-weight: 400;
    color: #fff;
    font-size: 2rem;
}
textarea {
  resize: none;
  font-weight: 400;
    color: #CED4DA;
    font-size: 2rem;
}
input {
 border:none;
 outline: none;
 background: none;
  font-weight: 400;
    color: #CED4DA;
    font-size: 2rem;
}
</style>