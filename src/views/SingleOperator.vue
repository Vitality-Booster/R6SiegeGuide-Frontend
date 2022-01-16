<template>
  <MainBackground>

  </MainBackground>
</template>

<script>
import MainBackground from "../components/MainBackground";
import axios from "axios";
export default {
  name: "SingleOperator",
  components: {MainBackground},
  props: {
    operatorName: {type: String, required: true}
  },
  setup(props) {
    const operator = axios.get(process.env.VUE_APP_BASE_URL + "/operators/" + props.operatorName)

    return {operator}
  }
}
</script>

<style scoped>

</style>