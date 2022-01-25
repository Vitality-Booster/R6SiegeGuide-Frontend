<template>
  <div>
    <Spinner v-if="loadingComponents < checkComponentsToLoad"></Spinner>
  <MainBackground v-show="loadingComponents >= checkComponentsToLoad">
    <BCardGroup class="m-3">
        <router-link class="m-3"
                     v-for="name in mapsNames"
                     :key="name"
                     :to="{name: 'singleMap', params: {name: name}}">
          <MapBox :map-name="name"/>
        </router-link>
        <router-link class="m-3"
                     v-if="admin === true"
                     :to="{name: 'newMap'}">
          <MapBox map-name="new" />
        </router-link>
  </BCardGroup>
  </MainBackground>
  </div>
</template>

<script>
import MainBackground from "../components/MainBackground";
import {useStore} from "vuex";
import {computed, ref} from "vue";
import Spinner from "../components/Spinner";
import MapBox from "../components/MapBox";
import {useRouter} from "vue-router";
import axios from "axios";
export default {
  name: "Maps",
  components: {MapBox, Spinner, MainBackground},
  setup() {
    const router = useRouter();
    const store = useStore();
    const admin = computed(() => store.state.admin)
    store.commit('resetLoadingComponents')
    const componentsToLoad = ref(4)
    const checkComponentsToLoad = computed(() => componentsToLoad.value)
    const loadingComponents = computed(() => store.state.loadingComponents)
    const names = ref([])
    const mapsNames = computed(() => names.value)
    const getMapsNames = async () => {
      await axios.get(process.env.VUE_APP_BASE_URL + "maps/get-all-names")
          .then (res => {
            res.data.names.forEach(name => {
              names.value.push(name)
              componentsToLoad.value++
            })
            if (admin === true) {
              componentsToLoad.value++
            }
          })
          .catch(er => {
            alert(er.message)
          })
      .finally(() => {
        store.commit('addLoadingComponent', 1)
      })
    }


    getMapsNames()
    store.commit('addLoadingComponent', 1)

    return {mapsNames, router, admin, loadingComponents, checkComponentsToLoad}
  }
}
</script>

<style scoped>

</style>