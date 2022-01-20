<template>
<div>
  <div v-if="isLoading" style="width: 100vw; height: 100vh" class="d-flex justify-content-center">
    <looping-rhombuses-spinner class="align-self-center"
        :animation-duration="2500"
        :rhombus-size="15"
        :color="'#ff1d5e'"
    />
  </div>
  <MainBackground v-else>
    <h1>There are gonna be some news!</h1>
  </MainBackground>
</div>
</template>

<script>
import MainBackground from "../components/MainBackground";
import {useStore} from "vuex";
import {computed} from "vue";
import {LoopingRhombusesSpinner} from 'epic-spinners'
export default {
  name: "Home",
  components: {
    MainBackground,
    LoopingRhombusesSpinner
  },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.state.isLoading);

    return {isLoading}
  }
}

</script>

<style scoped>

</style>