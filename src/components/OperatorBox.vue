<template>
  <BCard class="someWeirdClass text-center card-img-bottom p-0" :style="{backgroundImage: 'url(' + previewPic.valueOf() + ')'}">
    <BCardBody id="operatorPreviewImage" class=""  :style="{height: '125px', width: '85px'}">
<!--      <BCardImage id="operatorIconImage" :src="'url(' + iconPic.valueOf() + ')'" :style="{width: '30px', height: '30px'}"/>-->
<!--      <b-card-image class="ms-1 position-absolute bottom-0" id="operatorIconImage" img-bottom="true"  :style="{width: '30px', height: '30px'}"></b-card-image>-->
    </BCardBody>
    <BCardFooter class="p-0">{{operatorName.toUpperCase()}}</BCardFooter>
  </BCard>
</template>

<script>
import {ref as storageRef, getDownloadURL} from "firebase/storage";
import {getStorage} from "firebase/storage";
import {ref} from "vue";

export default {
  name: "OperatorBox",
  props: [
      'operatorName',
  ],
  setup(props) {
    const storage = getStorage()
    const previewPic = ref('')
    const operatorPreviewImage = storageRef(storage, 'operators/' + props.operatorName + '/' + 'preview.png')
    // This method gets the url of an image to which a reference "operatorPreviewImage" refers to
    getDownloadURL(operatorPreviewImage)
        .then(res => {
          previewPic.value = res
          //document.getElementById('operatorPreviewImage').setAttribute('src', res)
        })
        .catch(err => {
          alert(err.message)
        })

    // const operatorIconImage = storageRef(storage, 'operators/' + props.operatorName + '/' + 'icon.png')
    // // This method gets the url of an image to which a reference "operatorPreviewImage" refers to
    // getDownloadURL(operatorIconImage)
    //     .then(res => {
    //       document.getElementById('operatorIconImage').setAttribute('src', res)
    //     })
    //     .catch(err => {
    //       alert(err.message)
    //     })
    return {previewPic}
  }
}
</script>

<style scoped>
#operatorPreviewImage {
  background-position: center;
  object-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100%;
  min-width: 100%;
}

.someWeirdClass {
  background-position: center;
  object-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100%;
  min-width: 100%;
  background-color: aqua;
}
</style>