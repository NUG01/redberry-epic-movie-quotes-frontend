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
import LoadingSpinner from "@/components/LoadingSpinner.vue";


export default {
 emits:['emit-dots'],
 props:['id', 'quotes'],
 components:{HeartIcon, DescriptionComment, DotsIcon, DeleteTrash, EditPencil, ViewQuote, LoadingSpinner },
 setup(props, context){
  const router = useRouter();
  const quotesData=ref({})
  const currentId=props.id
  const quotes=props.quotes
  const movies = useMoviesStore();
  const detailsModal=ref(false)
  const dataIsFetched=ref(false)
  const commentsData=ref(null)
  const likesData=ref(null)

  
  onMounted(async ()=>{
    const resComments= await axios.get(`comments`);
    const resLikes= await axios.get(`likes`);
    likesData.value = resLikes.data;
    commentsData.value = resComments.data;
    quotesData.value = quotes;
    dataIsFetched.value=true;
})
  
  // imageDisplay.value='http://localhost:8000/public/images/'+user.value.thumbnail

 const quoteEditModal= (id)=>{
  if(detailsModal.value==id){
    detailsModal.value=0
    return;
  }
  detailsModal.value=id
  }

  function commentsQuantity(quote_id){
    return commentsData.value.filter(x => x.quote_id == quote_id).length
  }
  function likesQuantity(quote_id){
   return likesData.value.filter(x => x.quote_id == quote_id).length
  }

 async function deleteQuote(id){
   await axios.delete(`quotes/${id}`)
    .catch((err)=>{
      alert('Something went wrong!')
    })
    dataIsFetched.value=false;
    const resQuotes=await axios.get(`quotes/${currentId}`);
    quotesData.value = resQuotes.data;
    context.emit('quotesQuantity', resQuotes.data)
    dataIsFetched.value=true;
  }

  return {
    quoteEditModal, 
    quotesData, 
    deleteQuote,
    detailsModal,
    dataIsFetched,
    commentsQuantity,
    likesQuantity
  }
    }

  
}
</script>



<template>
<div>
  <loading-spinner  v-if="!dataIsFetched" texts="hidden" bgColor="bg-none" location="mt-[20rem]"></loading-spinner>

  <div v-else class="flex flex-col gap-[4rem] h-[17%]">
            <div class="px-[3.2rem] py-[2.4rem] w-[100%] bg-[#09090f] rounded-[10px]" v-for="quote in quotesData" :key="quote">
            <div class="relative">
              <dots-icon @emit-dots="quoteEditModal(quote.id)" class="absolute top-0 right-0 cursor-pointer z-40"></dots-icon>
              <div v-if="detailsModal==quote.id" :id="'quote'+quote.id" class="p-[4rem] bg-[#24222F] flex flex-col justify-center gap-[3rem] absolute top-[2rem] right-0 translate-x-[87%] rounded-[10px] z-50">
                   <div class="flex items-center gap-[1.6rem]">
                    <view-quote></view-quote>
                   <router-link :to="{ name: 'quote-details', params: { id: quote.id }}"><p class="text-[1.6rem] text-[#fff] cursor-pointer">{{ $t('newsFeed.view_quote') }}</p></router-link>
                   </div>
                   <div class="flex items-center gap-[1.6rem]">
                    <edit-pencil></edit-pencil>
                    <router-link :to="{ name: 'quote-edit', params: { id: quote.id }}"><p class="text-[1.6rem] text-[#fff] cursor-pointer">{{ $t('newsFeed.edit') }}</p></router-link>
                   </div>
                   <div class="flex items-center gap-[1.6rem]">
                    <delete-trash></delete-trash>
                    <p @click="deleteQuote(quote.id)" class="text-[1.6rem] text-[#fff] cursor-pointer">{{ $t('newsFeed.delete') }}</p>
                   </div>
              </div>
              <div class="flex items-center gap-[3.1rem] pb-[2.4rem] border-b border-b-[#f0f0f036] border-b-solid">
                <img src="/src/assets/LordofRingsMovie.png" class="w-[30%] rounded-[2px]"/>
                <p class="text-[2.4rem] text-[#CED4DA]">{{ $i18n.locale=='en'? quote.quote.en : quote.quote.ka }}</p>
                </div>
              <div class="flex items-center gap-[3.2rem] mt-[2.4rem]">
                <div class="flex items-center gap-[1.6rem]">
                  <span class="text-[2rem] text-[#fff]">{{ commentsQuantity(quote.id) }}</span>
                  <description-comment></description-comment>
                </div>
                <div class="flex items-center gap-[1.6rem]">
                  <span class="text-[2rem] text-[#fff]">{{ likesQuantity(quote.id) }}</span>
                  <heart-icon></heart-icon>
               </div>
              </div>
            </div>
            </div>
          </div>
</div>
</template>