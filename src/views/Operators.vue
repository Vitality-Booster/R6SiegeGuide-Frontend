<template>
  <div>
  <MainBackground>
    <BCardGroup>
      <router-link
        v-for="name in operatorsNames"
        :key="name"
        :operator-name="name"
        :to="{name: 'singleOperator', params: {name: name}}">
        <OperatorBox :operator-name="name"/>
      </router-link>
      <router-link
          v-if="admin === true"
          :to="{name: 'singleOperator', params: {name: 'new'}}">
        <OperatorBox operator-name="new" />
      </router-link>
    </BCardGroup>
  </MainBackground>
  </div>
</template>

<script>
import MainBackground from "../components/MainBackground";
// import axios from "axios";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import OperatorBox from "../components/OperatorBox";
import {computed, ref} from "vue";

export default {
  name: "Operators",
  components: {OperatorBox, MainBackground},
  setup() {

    const operatorsNames = ref()
    // const operatorsNames = axios.get(process.env.VUE_APP_BASE_URL + "operators/get-all-names")
    // .then()

    const router = useRouter();
    const store = useStore();
    const admin = computed(() => store.state.admin)

    // if (store.state.admin == null) {
    //   store.dispatch('checkIfAdmin')
    //   admin.value = computed(store.state.admin);
    // }
    // else {
    //   admin.value = store.state.admin
    // }

    // const checkAdmin = async () => {
    //   await store.dispatch('checkIfAdmin')
    //   console.log("I got there")
    //   admin.value = store.state.admin
    // }
    //
    // const adminRef = ref()
    //
    // const jwt = async() => {
    //   auth.currentUser.getIdToken()
    //       .then(res => {
    //         const decoded = jwtDecode(res);
    //         adminRef.value = decoded.admin;
    //       })
    // }
    //
    // jwt()



    // if (store.state.admin == null) {
    //   checkAdmin()
    // }
    // else {
    //   admin.value = store.state.admin
    // }

    //checkAdmin()
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