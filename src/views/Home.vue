<template>
  <div class="mainBackground">
    <NavigationBar />
<!--    Some weird changes-->
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->

<!--    <BButton @click="handleLogout">Log out</BButton>-->

<!--    <div v-if="error">{{error}}</div>-->

<!--    <h1 v-if="authIsReady">Auth is already ready!</h1>-->
<!--    <br>-->
<!--    <h1 v-if="user">Logged in person's email is: {{user.email}} and password is: {{user.password}}</h1>-->
<!--    <h1 v-else>There is no logged in users</h1>-->

  </div>
</template>

<script>
// @ is an alias to /src
import { useStore } from 'vuex'
import {computed, ref} from "vue";
import NavigationBar from '../components/NavigationBar'
// import HelloWorld from "../components/HelloWorld";

export default {
  name: 'Home',
  setup() {
    const store = useStore()
    const error = ref(null)

    const handleLogout = async () => {
      try {
        await store.dispatch('logout')
      } catch (err) {
        alert(err.message)
      }
    }

    return { store, error, handleLogout,
      authIsReady: computed(() => store.state.authIsReady),
      user: computed(() => store.state.user)
    }
  },
  components: {
    //HelloWorld,
    NavigationBar
  }

}
</script>

<style >

.mainBackground {
  background-position: center;
  object-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../assets/background.jpg");
  min-height: 100vh;
  min-width: 100vw;
}

</style>