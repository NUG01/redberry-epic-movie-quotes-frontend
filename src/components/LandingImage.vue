<script>
export default {
props:['margintop','image','gradient', 'imageSource'],
setup(props, context){
  const margintop=props.margintop;
  const image=props.image;
  const imageSource=props.imageSource;
  const gradient=props.gradient;

  

  return {
    margintop,
    image,
    gradient,
    imageSource,
     }
  }
}

</script>

 
<template>
  <div class="w-[100%] h-[100vh] relative backImg" :class="image">
    <div class="absolute top-0 left-0 h-[100%] w-[100%] z-10" :class="gradient">
   <div class="h-[auto] w-[60%] custom-grid ml-[5%] gap-[1.6rem]" :class="margintop">
       <div class="w-[5rem] h-[4.5rem] flex items-end"><div class="h-[2px] w-[100%] bg-white text-[white]"></div></div>
       <div class="font-bold">
        <p class="text-[5rem] text-[#ffffff]"><slot></slot></p>
        <p class="text-[3rem] text-[#D9D9D9] mt-[1.6rem]"><slot name="movie"></slot></p>
        </div>
    </div>
  </div>
  </div>
</template>




<style scoped>
.gradient-three{
 background: linear-gradient(180deg, rgba(17, 16, 26, 0.95) 0%, rgba(8, 8, 13, 0.13) 50%, rgba(0, 0, 0, 0) 100%);
}
.gradient-four{
 background: linear-gradient(360deg, rgba(17, 16, 26, 0.95) 0%, rgba(8, 8, 13, 0.13) 50%, rgba(0, 0, 0, 0) 100%);
}
.gradient-two{
  background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%);
}
.custom-grid{
  display: grid;
  grid-template-columns: auto 1fr;
}
.backImg{
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>