<script>
export default {
  props:['type','paddings','rounded','text','width'],
  setup(props,context){
    const type=props.type;
    const paddings=props.paddings;
    const rounded=props.rounded;
    const text=props.text;
    const width=props.width;

     function emitBase(){
      context.emit('emit-base')
    };


   return{
    type,
    paddings,
    rounded,
    text,
    width,
    emitBase,
    
    }
  }
}
</script>



<template>
    <button @click="emitBase"
    :type="type" :class="[rounded, width]"
    class="
    z-30 
    border 
    border-solid 
    transition-all 
    disabled:opacity-[0.65]
    bg-[#E31221] 
    border-[#E31221] 
    hover:bg-[#CC0E10] 
    hover:border-[#CC0E10] 
    active:bg-[#B80D0F] 
    active:border-[#B80D0F]
    disabled:bg-[#EC4C57]
    focus:bg-[#B80D0F]
    focus:border-[#B80D0F]
    focus:shadow-base-shadow">
    <p :class="[paddings, text, width]"><slot></slot></p></button>
</template>


<style scoped>
button{
   font-family:sans-serif;
   font-weight: normal;
}
</style>