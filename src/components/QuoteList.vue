<script>
import DotsIcon from "@/components/icons/DotsIcon.vue";
import EditPencil from "@/components/icons/EditPencil.vue";
import ViewQuote from "@/components/icons/ViewQuote.vue";
import DeleteTrash from "@/components/icons/DeleteTrash.vue";
import DescriptionComment from "@/components/icons/DescriptionComment.vue";
import HeartIcon from "@/components/icons/HeartIcon.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "@/config/axios/index.js";
import { useMoviesStore } from '@/stores/MoviesStore.js';


export default {
 emits:['emit-dots'],
 props:['id'],
 components:{HeartIcon, DescriptionComment, DotsIcon, DeleteTrash, EditPencil, ViewQuote },
 setup(props){
  const router = useRouter();
  const quotesData=ref({})
  const currentId=props.id
  const movies = useMoviesStore();

      
  quotesData.value = movies.getQuotes

  // imageDisplay.value='http://localhost:8000/public/images/'+user.value.thumbnail


  function quoteEditModal(id){
    document.getElementById(`quote${id}`).classList.toggle('hidden')
  }

  function deleteQuote(id){
    axios.delete(`quotes/${id}`)
    .then((res)=>{
      location.reload();
    })
    .catch((err)=>{
      alert('err')
    })
  }

  return {
    quoteEditModal, 
    quotesData, 
    deleteQuote
  }
    }

  
}
</script>



<template>
  <div class="flex flex-col gap-[4rem] h-[17%]">
            <div class="px-[3.2rem] py-[2.4rem] w-[100%] bg-[#09090f] rounded-[10px]" v-for="quote in quotesData" :key="quote">
            <div class="relative">
              <dots-icon @emit-dots="quoteEditModal(quote.id)" class="absolute top-0 right-0 cursor-pointer z-40"></dots-icon>
              <div :id="'quote'+quote.id" class="p-[4rem] bg-[#24222F] hidden flex flex-col justify-center gap-[3rem] absolute top-[2rem] right-0 translate-x-[87%] rounded-[10px] z-50">
                   <div class="flex items-center gap-[1.6rem]">
                    <view-quote></view-quote>
                   <router-link :to="{ name: 'quote-details', params: { id: quote.id }}"><p class="text-[1.6rem] text-[#fff] cursor-pointer">View Quote</p></router-link>
                   </div>
                   <div class="flex items-center gap-[1.6rem]">
                    <edit-pencil></edit-pencil>
                    <router-link :to="{ name: 'quote-edit', params: { id: quote.id }}"><p class="text-[1.6rem] text-[#fff] cursor-pointer">Edit</p></router-link>
                   </div>
                   <div class="flex items-center gap-[1.6rem]">
                    <delete-trash></delete-trash>
                    <p @click="deleteQuote(quote.id)" class="text-[1.6rem] text-[#fff] cursor-pointer">Delete</p>
                   </div>
              </div>
              <div class="flex items-center gap-[3.1rem] pb-[2.4rem] border-b border-b-[#f0f0f036] border-b-solid">
                <img src="/src/assets/LordofRingsMovie.png" class="w-[30%] rounded-[2px]"/>
                <p class="text-[2.4rem] text-[#CED4DA]">{{ quote.quote.en }}</p>
                </div>
              <div class="flex items-center gap-[3.2rem] mt-[2.4rem]">
                <div class="flex items-center gap-[1.6rem]">
                  <span class="text-[2rem] text-[#fff]">3</span>
                  <description-comment></description-comment>
                </div>
                <div class="flex items-center gap-[1.6rem]">
                  <span class="text-[2rem] text-[#fff]">10</span>
                  <heart-icon></heart-icon>
               </div>
              </div>
            </div>
            </div>
          </div>
</template>