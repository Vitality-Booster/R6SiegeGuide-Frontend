<template>
  <BCard>
    <BCardBody>
      <BCardImage id="operatorPreviewImage" :style="{backgroundImage: 'url(' + previewPic.valueOf() + ')'}">
      </BCardImage>
    </BCardBody>
    <BCardFooter>{{operatorName}}</BCardFooter>
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
          document.getElementById('operatorPreviewImage').setAttribute('src', res)
        })
        .catch(err => {
          alert(err.message)
        })

    const operatorIconImage = storageRef(storage, 'operators/' + props.operatorName + '/' + 'icon.svg')
    // This method gets the url of an image to which a reference "operatorPreviewImage" refers to
    getDownloadURL(operatorIconImage)
        .then(res => {
          document.getElementById('operatorIconImage').setAttribute('src', res)
        })
        .catch(err => {
          alert(err.message)
        })
    return {previewPic}
  }
}
</script>

<style scoped>

</style>