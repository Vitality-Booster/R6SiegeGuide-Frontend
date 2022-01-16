<template>
  <div class="d-flex justify-content-between" id="mainBar">
    <BCol lg="3">
      <img class="p-2" alt="R6 logo" id="logoImage" :src="logoPic">
    </BCol>
    <BCol class="d-flex align-items-center justify-content-end pe-2" lg="9">
      <ul class="nav d-flex align-items-center">
        <li class="nav-item">
          <router-link class="nav-link" to="/"><Link :link=home /></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/generator"><Link :link="generator"/></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/operators"><Link :link="operators"/></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/maps"><Link :link="maps"/></router-link>
        </li>
        <li class="nav-item" v-if="user">
          <router-link class="nav-link" @click="handleLogout" to="/login"><Link :link="logout"/></router-link>
        </li>
        <li class="nav-item" v-else>
          <router-link class="nav-link" to="/login"><Link :link="login"/></router-link>
        </li>
        <li class="nav-item d-flex align-items-center p-2" v-if="user">
          <BIcon icon="person-circle" class="h2 m-0" style="color: wheat;"/>
        </li>
      </ul>
    </BCol>
  </div>
</template>

<script>
import Link from './Link'
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {getDownloadURL, ref as storageRef} from "firebase/storage";
import {storage} from "../firebase/config";

export default {
  name: "NavigationBar",
  components: {
    Link
  },
  setup() {
    const home = ref('Home');
    const generator = ref('Generator');
    const operators = ref('Operators');
    const maps = ref('Maps');
    const logout = ref('Logout');
    const login = ref('Login');

    const store = useStore();
    const logoPic = ref('')

    if (store.state.logoPic == null) {
      const logoRef = storageRef(storage, "website/logo.png")
      getDownloadURL(logoRef)
          .then(res => {
            logoPic.value = res
            store.commit('setLogoPic', res)
          })
          .catch(err => {
            alert(err.message)
          })
    }
    else {
      logoPic.value = store.state.logoPic
    }




    const user = computed(() => store.state.user)

    const handleLogout = async () => {
      try {
        await store.dispatch('logout')
      } catch (err) {
        alert(err.message)
      }
    }

    return { home, generator, operators, maps, logout, handleLogout, user, login, logoPic}
  }
}
</script>

<style scoped>

#mainBar {
  background-color: #1c1815;
  opacity: 90%;
}

#logoImage {
  width: 70px;
  height: 70px;
  border-radius: 15px;
}
</style>