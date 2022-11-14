export const imageUpload = (ev, selectedFile, imageDisplay, imageUrl) => {
  const file=ev.target.files[0]
  selectedFile.value=ev.target.files[0]
  const reader= new FileReader();
  reader.onload= () =>{
    if(imageUrl){
      imageUrl.value=reader.result
   }
      imageDisplay.value=reader.result
  }
  reader.readAsDataURL(file)

};