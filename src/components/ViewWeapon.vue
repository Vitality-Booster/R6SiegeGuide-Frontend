<template>
  <div>
    <h4 class="mt-3" style="color: white">Primary Weapon 1: {{weapon.name}}</h4>
    <BRow class="d-flex align-items-center">
      <BCol sm="6">
        <h5 class="mt-2" style="color: white">Damage: {{weapon.damage}}</h5>
      </BCol>
      <BCol sm="6">
        <h5 class="mt-2" style="color: white">Magazine: {{weapon.magazine}}</h5>
      </BCol>
    </BRow>
    <img :src="picture" alt="<<weapon picture>>">
  </div>
</template>

<script>
import {ref} from "vue";
import {getDownloadURL, getStorage, ref as storageRef} from "firebase/storage";
import {useStore} from "vuex";

export default {
  name: "ViewWeapon",
  props: [
      'weapon'
  ],
  setup(props) {
    const picture = ref()
    const store = useStore()
    const storage = getStorage()
    const picRef = storageRef(storage, "/weapons/" + props.weapon.name + ".png")
    getDownloadURL(picRef)
        .then(res => {
          picture.value = res
          store.commit('addLoadingComponent', 1)
        })
    return {picture}
  }
}
</script>

<style scoped>

</style>