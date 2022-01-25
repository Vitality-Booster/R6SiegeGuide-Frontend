<template>
  <BCard class="someWeirdClass text-center card-img-bottom p-0" :style="{backgroundImage: 'url(' + previewPic.valueOf() + ')'}">
    <BCardBody id="mapPreviewImage" class=""  :style="{height: '150px', width: '200px'}">
    </BCardBody>
    <BCardFooter class="p-0">{{mapName.toUpperCase()}}</BCardFooter>
  </BCard>
</template>

<script>
import {getDownloadURL, getStorage, ref as storageRef} from "firebase/storage";
import {ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "MapBox",
  props: [
    'mapName',
  ],
  setup(props) {
    const storage = getStorage()
    const previewPic = ref('')
    const operatorPreviewImage = storageRef(storage, 'maps/' + props.mapName + '.png')
    // This method gets the url of an image to which a reference "operatorPreviewImage" refers to
    getDownloadURL(operatorPreviewImage)
        .then(res => {
          previewPic.value = res
          //document.getElementById('operatorPreviewImage').setAttribute('src', res)
        })
        .catch(err => {
          alert(err.message)
        })
    const store = useStore()
    store.commit('addLoadingComponent', 1)
    return {previewPic}
  }
}
</script>

<style scoped>
#mapPreviewImage {
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
}
</style>