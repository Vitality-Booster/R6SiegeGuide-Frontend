<template>
  <div>
    <Spinner v-if="loadingComponents < 3"></Spinner>
  <MainBackground v-show="loadingComponents >= 3">

  </MainBackground>
  </div>
</template>

<script>
import MainBackground from "../components/MainBackground";
import {useStore} from "vuex";
import {computed} from "vue";
import Spinner from "../components/Spinner";
export default {
  name: "Maps",
  components: {Spinner, MainBackground},
  setup() {
    const store = useStore()
    store.commit('resetLoadingComponents')
    const loadingComponents = computed(() => store.state.loadingComponents)


    store.commit('addLoadingComponent', 1)
    return {loadingComponents}
  }
}
</script>

<style scoped>

</style>