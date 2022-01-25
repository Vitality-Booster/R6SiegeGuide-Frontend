<template>
  <div>
    <Spinner v-if="loadingComponents < checkComponentsToLoad" />
  <MainBackground v-show="loadingComponents >= checkComponentsToLoad">
    <BCardGroup class="m-3">
      <router-link class="m-3"
        v-for="name in operatorsNames"
        :key="name"
        :operator-name="name"
        :to="{name: 'singleOperator', params: {name: name}}">
        <OperatorBox :operator-name="name"/>
      </router-link>
      <router-link class="m-3"
          v-if="admin === true"
          :to="{name: 'newOperator'}">
        <OperatorBox operator-name="new" />
      </router-link>
    </BCardGroup>
  </MainBackground>
  </div>
</template>

<script>
import MainBackground from "../components/MainBackground";
import axios from "axios";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import OperatorBox from "../components/OperatorBox";
import {computed, ref} from "vue";
import Spinner from "../components/Spinner";

export default {
  name: "Operators",
  components: {Spinner, OperatorBox, MainBackground},
  setup() {

    const router = useRouter();
    const store = useStore();
    const admin = computed(() => store.state.admin)
    store.commit('resetLoadingComponents')
    const componentsToLoad = ref(4)
    const checkComponentsToLoad = computed(() => componentsToLoad.value)
    const loadingComponents = computed(() => store.state.loadingComponents)
    const names = ref([])
    const operatorsNames = computed(() => names.value)
    const getOperatorsNames = async () => {
      await axios.get(process.env.VUE_APP_BASE_URL + "operators/get-all-names")
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
      store.commit('addLoadingComponent', 1)
    }


    getOperatorsNames()
    store.commit('addLoadingComponent', 1)

    return {operatorsNames, router, admin, loadingComponents, checkComponentsToLoad}
  }
}
</script>

<style scoped>

</style>