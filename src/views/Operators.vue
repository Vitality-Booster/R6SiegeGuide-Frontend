<template>
  <MainBackground>
    <BCardGroup>
      <router-link
        v-for="name in operatorsNames"
        :key="name"
        :to="{name: 'singleOperator', params: {name: name}}">
        <OperatorBox :operator-name="name"/>
      </router-link>
      <h1 :style="{color:'blue'}">This is the admin value {{admin}}</h1>
      <router-link
          v-if="admin.valueOf() === false"
          :to="{name: 'singleOperator', params: {name: 'new'}}">
        <OperatorBox operator-name="new" />
      </router-link>
    </BCardGroup>
  </MainBackground>
</template>

<script>
import MainBackground from "../components/MainBackground";
import axios from "axios";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import OperatorBox from "../components/OperatorBox";
import {ref} from "vue";
export default {
  name: "Operators",
  components: {OperatorBox, MainBackground},
  setup() {
    const operatorsNames = axios.get(process.env.VUE_APP_BASE_URL + "operators/get-all-names")

    const router = useRouter();
    const store = useStore();



    const admin = ref(Boolean);

    const checkAdmin = async () => {
      await store.dispatch('checkIfAdmin')
          .then(res => {
            admin.value = res
            console.log("This is admin variablreeeeeeeeeeeeeeeeeeeeee: " + admin.value)
          })
    }

    checkAdmin()
    // const adminCheck = async () => {
    //   const admin = await store.dispatch('checkIfAdmin')
    //   console.log("Admin inside computed function: " + admin)
    //   return admin
    // }
    // const admin = await adminCheck()
    // console.log("This is admin var to String inside the Operator: " + admin)
    return {operatorsNames, router, admin}
  }
}
</script>

<style scoped>

</style>