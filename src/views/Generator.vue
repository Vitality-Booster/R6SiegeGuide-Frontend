<template>
  <div>
    <Spinner v-if="loadingComponents < 3"></Spinner>
    <MainBackground v-show="loadingComponents >= 3">

    </MainBackground>
  </div>
</template>

<script>
import MainBackground from "../components/MainBackground";
import Spinner from "../components/Spinner";
import {useStore} from "vuex";
import {computed} from "vue";
export default {
  name: "Generator",
  components: {
    MainBackground,
    Spinner
  },
  setup() {
    const store = useStore()
    store.commit('resetLoadingComponents')
    const loadingComponents = computed(() => store.state.loadingComponents)

    // when add more things that need time to load
    // then apply 'store.commit('addLoadingComponent', 1)' to them
    // and change loadingComponents quota in v-if and v-show accordingly

    store.commit('addLoadingComponent', 1)
    return {loadingComponents}
  }
}
</script>

<style scoped>

</style>