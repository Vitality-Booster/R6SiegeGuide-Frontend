<template>
  <div>
    <Spinner v-if="loadingComponents < 3"></Spinner>
    <MainBackground v-show="loadingComponents >= 3">
      <div>
        <h1>To see statistics you need to sign in with yor Uplay account in the form below</h1>
        <div class="input-group pt-4"
             :style="{width: '25%', minWidth: '225px', margin: 'auto', color: 'white'}">
          <div class="input-group-text" :style="{background: 'transparent', border: 'transparent'}">
            <BIconEnvelope aria-hidden="true"
                           style="color: white; opacity: 70%; border: transparent;" />
          </div>
          <input :style="{borderRadius: '100px', opacity: '70%', border: 'transparent' }"
                 class="form-control" v-model="email" placeholder="Email" type="email">
        </div>
        <div class="input-group pt-4"
             :style="{width: '25%', minWidth: '225px', margin: 'auto', color: 'white'}">
          <div class="input-group-text" :style="{border: 'none', background: 'transparent'}">
            <BIconLock aria-hidden="true"
                       style="color: white; opacity: 70%; border: transparent;" />
          </div>
          <input :style="{borderRadius: '100px', opacity: '70%', border: 'transparent' }"
                 class="form-control" v-model="password" placeholder="Password" type="password">
        </div>
        <BButton class="mt-4" type="button" @click="loadStats"
                 :style="{borderRadius: '100px', width: '120px', backgroundColor: 'black', color: 'bisque'}">Sign in</BButton>
      </div>
    </MainBackground>
  </div>
</template>

<script>
import MainBackground from "../components/MainBackground";
import Spinner from "../components/Spinner";
import {useStore} from "vuex";
import {computed, ref} from "vue";
import axios from "axios";
export default {
  name: "Statistics",
  components: {
    MainBackground,
    Spinner
  },
  setup() {
    const store = useStore()
    const email = ref()
    const password = ref()
    store.commit('resetLoadingComponents')
    const loadingComponents = computed(() => store.state.loadingComponents)

    const loadStats = async () => {
      if (store.state.queueStats === null) {
        await axios.post(process.env.VUE_APP_BASE_URL_2 + "statistics/queue-stats", {
          email: email.value,
          password: password.value
        })
            .then(res => {
              store.commit('setQueueStats', res)
            })
            .catch(er => {
              alert(er.message)
            })
      }
      if (store.state.profileStats === null) {
        await axios.post(process.env.VUE_APP_BASE_URL_2 + "statistics/profile-stats", {
          email: email.value,
          password: password.value
        })
            .then(res => {
              store.commit('setProfileStats', res)
            })
            .catch(er => {
              alert(er.message)
            })
      }
      if (store.state.playerStats === null) {
        await axios.post(process.env.VUE_APP_BASE_URL_2 + "statistics/player-stats", {
          email: email.value,
          password: password.value
        })
            .then(res => {
              store.commit('setPlayerStats', res)
            })
            .catch(er => {
              alert(er.message)
            })
      }
      if (store.state.seasonalStats === null) {
        await axios.post(process.env.VUE_APP_BASE_URL_2 + "statistics/seasonal-stats", {
          email: email.value,
          password: password.value
        })
            .then(res => {
              store.commit('setSeasonalStats', res)
            })
            .catch(er => {
              alert(er.message)
            })
      }
    }

    // when add more things that need time to load
    // then apply 'store.commit('addLoadingComponent', 1)' to them
    // and change loadingComponents quota in v-if and v-show accordingly

    store.commit('addLoadingComponent', 1)
    return {loadingComponents, email, password, loadStats}
  }
}
</script>

<style scoped>

</style>