<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <BButton @click="handleLogout">Log out</BButton>

    <div v-if="error">{{error}}</div>

    <h1 v-if="authIsReady">Auth is already ready!</h1>
    <br>
    <h1 v-if="user">Logged in person's email is: {{user.email}} and password is: {{user.password}}</h1>
    <h1 v-else>There is no logged in users</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '../components/HelloWorld.vue'
import { useStore } from 'vuex'
import {computed, ref} from "vue";

export default {
  name: 'Home',
  setup() {
    const store = useStore()
    const error = ref(null)

    const handleLogout = async () => {
      try {
        await store.dispatch('logout')
      } catch (err) {
        error.value = err.message
      }
    }
    return { store, error, handleLogout,
      authIsReady: computed(() => store.state.authIsReady),
      user: computed(() => store.state.user)
    }
  },
  components: {
    HelloWorld
  }

}
</script>

<style >

</style>