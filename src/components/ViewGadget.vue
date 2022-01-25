<template>
  <div>
    <h4 class="mt-3" style="color: white">Gadget 1: {{gadget.name}}</h4>
    <img :src="picture" alt="<<gadget picture>>">
    <h5 class="mt-2" style="color: white">Description: {{gadget.description}}</h5>
  </div>
</template>

<script>
import {ref} from "vue";
import {getDownloadURL, getStorage, ref as storageRef} from "firebase/storage";
import {useStore} from "vuex";

export default {
  name: "ViewGadget",
  props: [
    'gadget'
  ],
  setup(props) {
    const picture = ref()
    const store = useStore()
    const storage = getStorage()
    const picRef = storageRef(storage, "/gadgets/" + props.gadget.name + ".png")
    getDownloadURL(picRef)
        .then(res => {
          picture.value = res
          store.commit('addLoadingComponent', 1)
        })
    return {picture}
  },
}
</script>

<style scoped>

</style>