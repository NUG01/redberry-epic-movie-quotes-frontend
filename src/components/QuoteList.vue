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
  const imageUrl=import.meta.env.VITE_API_BASE_URL_IMAGE


  
  onMounted(async ()=>{
    quotesData.value = props.quotes;
    dataIsFetched.value=true;
})
  
 const quoteEditModal= (id)=>{
  if(detailsModal.value==id){
    detailsModal.value=0
    return;
  }
  detailsModal.value=id
  }

  function deleteQuote(id){
      axios.delete(`quotes/${id}`)
      .then(()=>{
        dataIsFetched.value=false;
         axios.get(`quotes/${currentId}`)
         .then((resQuotes)=>{
            quotesData.value = resQuotes.data;
            context.emit('quotesQuantity', resQuotes.data)
           dataIsFetched.value=true;
           })
      })
    .catch(()=>{
      alert('Something went wrong!')
    })
  }


  function quoteImage(image){
    return imageUrl+image
  }

  return {
    quoteEditModal, 
    quotesData, 
    deleteQuote,
    detailsModal,
    dataIsFetched,
    quoteImage
  }
    }

  
}
</script>



<template>
<div>
  <loading-spinner  v-if="!dataIsFetched" texts="hidden" bgColor="bg-none" location="mt-[20rem]"></loading-spinner>

  <div v-else class="flex flex-col gap-[4rem] h-[17%] md:w-[100%]">
            <div class="px-[3.2rem] py-[2.4rem] md:px-0 md:py-0 md:pb-[2.7rem] w-[100%] bg-[#09090f] rounded-[10px] md:rounded-[2px]" v-for="quote in quotesData" :key="quote">
            <div class="relative">
              <dots-icon @emit-dots="quoteEditModal(quote.id)" class="absolute top-0 right-0 cursor-pointer z-30 md:hidden"></dots-icon>
              <div v-if="detailsModal==quote.id" :id="'quote'+quote.id" class="p-[4rem] bg-[#24222F] flex flex-col justify-center gap-[3rem] absolute top-[2rem] md:-top-[0.3px] right-0 translate-x-[87%] md:translate-x-0 rounded-[10px] md:rounded-[2px] z-50">
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
              <div class="flex items-center md:flex-col gap-[3.1rem] md:gap-[2.4rem] pb-[2.4rem] border-b border-b-[#f0f0f036] border-b-solid md:border-b-0">
                <div :style="'background-image:url('+(quoteImage(quote.thumbnail))+')'" class="bg-cover bg-no-repeat bg-center w-[30%] h-[12rem] rounded-[2px] md:hidden"></div>
                <div :style="'background-image:url('+(quoteImage(quote.thumbnail))+')'" class="bg-cover bg-no-repeat bg-center w-[100%] min-h-[15rem] height rounded-[2px] hidden md:block"></div>
                <p class="text-[2.4rem] text-[#CED4DA] md:w-[95%] md:border-b md:border-b-[#f0f0f036] md:border-b-solid md:pb-[2.4rem] break-words">"{{ $i18n.locale=='en'? quote.quote.en : quote.quote.ka }}"</p>
                </div>
              <div class="flex items-center gap-[3.2rem] mt-[2.4rem] md:mt-0 md:justify-start md:pl-[1rem]">
                <div class="flex items-center gap-[1.6rem] md:gap-[1.2rem]">
                  <span class="text-[2rem] text-[#fff]">{{ quote.comments.length }}</span>
                  <description-comment class="md:hidden"></description-comment>
                  <description-comment class="hidden md:block" width="24" height="23"></description-comment>
                </div>
                <div class="flex items-center gap-[1.6rem] md:gap-[1.2rem]">
                  <span class="text-[2rem] text-[#fff]">{{ quote.likes.length }}</span>
                  <heart-icon class="md:hidden"></heart-icon>
                  <heart-icon class="hidden md:block" width="24" height="22.5"></heart-icon>
               </div>
              <dots-icon @emit-dots="quoteEditModal(quote.id)" class="cursor-pointer z-40 hidden md:block md:ml-[36%]"></dots-icon>
              </div>
            </div>
            </div>
          </div>
</div>
</template>

<style scoped>
.height{
  height: 15rem;
}
@media (max-width: 920px) {
  .height{
    height: 24rem;
  }
}
@media (max-width: 520px) {
  .height{
    height: 20rem;
  }
}
@media (max-width: 450px) {
  .height{
    height: 16rem;
  }
}

</style>
