<template>
  <div style="width: 100vw; height: 100vh" class="d-flex justify-content-center">
    <looping-rhombuses-spinner class="align-self-center"
                               :animation-duration="2500"
                               :rhombus-size="15"
                               :color="'#ff1d5e'"
    />
  </div>
</template>

<script>
import {LoopingRhombusesSpinner} from 'epic-spinners'
export default {
  name: "Spinner",
  components: {
    LoopingRhombusesSpinner
  }
}
</script>

<style scoped>

</style>