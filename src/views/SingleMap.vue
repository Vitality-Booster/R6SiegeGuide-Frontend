<template>
  <div>
    <Spinner v-if="loadingComponents < 4" />
    <MainBackground v-show="loadingComponents >= 4">
      <BRow class="m-3">
        <BCol class="mt-2 text-center" lg="6">
          <img :src="picture" alt="<<map picture>>">
          <h2 class="mt-2" style="color: white">{{mapName}}</h2>
        </BCol>
        <BCol v-if="loadingComponents === 4" class="mt-2" lg="6">
          <h3 style="color: white">Basic information:</h3>
          <h3 style="color: white">{{ map.info }}</h3>
          <h3 style="color: white">Location:</h3>
          <h3 style="color: white">{{ map.locationCity }}, {{map.locationCountry}}</h3>
        </BCol>
      </BRow>
    </MainBackground>
  </div>
</template>

<script>
import MainBackground from "../components/MainBackground";
import {useRouter} from "vue-router";
import axios from "axios";
import {getDownloadURL, getStorage, ref as storageRef} from "firebase/storage";
import {computed, ref} from "vue";
import {useStore} from "vuex";
import Spinner from "../components/Spinner";
export default {
  name: "SingleMap",
  components: {Spinner, MainBackground},
  setup() {
    const router = useRouter()
    const store = useStore()
    const mapPath = router.currentRoute.value.path
    const mapName = mapPath.substr(mapPath.lastIndexOf("/") + 1)
    const map = ref()
    const picture = ref()
    store.commit('resetLoadingComponents')
    const loadingComponents = computed(() => store.state.loadingComponents)

    const loadMap = async () => {
      await axios.get(process.env.VUE_APP_BASE_URL + "/maps/" + mapName)
          .then(res => {
            map.value = res.data
            store.state.someNames = res.data
          })
          .then(async () => {
            const storage = getStorage()
            const mapRef = storageRef(storage, "/maps/" + mapName + ".png")
            getDownloadURL(mapRef)
                .then(async res => {
                  picture.value = res
                })
            store.commit('addLoadingComponent', 1)
          })
          .catch(er => {
            alert(er.message)
          })
    }

    store.commit('addLoadingComponent', 1)

    loadMap()
    return {mapName, picture, map, loadingComponents}
  }
}
</script>

<style scoped>

</style>