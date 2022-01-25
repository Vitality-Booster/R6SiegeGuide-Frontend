<template>
  <div>
    <Spinner v-if="loadingComponents < 3"></Spinner>
    <MainBackground v-show="loadingComponents >= 3">
      <div v-if="loadingComponents === 3">
        <div class="mt-5 container text-center">
          <h2 style="color: wheat">To see statistics you need to sign in with </h2>
           <h2 style="color: wheat"> yor Uplay account in the form below</h2>
          <div class="pt-4 col pr-4 align-items-center">
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
        </div>
      </div>
      <div class="mx-3" v-if="loadingComponents > 3">
        <BRow class="my-2 text-center">
          <h3 class="my-3" style="color: wheat">Ranked matches played in every season</h3>
          <column-chart :data="chartSeasonalStatsData" :colors="['#38f000']"></column-chart>
        </BRow>
        <BRow class="my-2">
          <BCol md="4">
            <h3 class="mt-3 pl-3" style="color: wheat">Overall kills and deaths</h3>
            <pie-chart :data="chartKDStatsData" :colors="['#70a5f1', '#b3a9af']" ></pie-chart>
          </BCol>
          <BCol md="4">
            <h3 class="mt-3 pl-3" style="color: wheat">Overall won and lost matches</h3>
            <pie-chart :data="chartWLStatsData"></pie-chart>
          </BCol>
          <BCol md="4">
            <h4 class="my-3 mr-2" style="color: wheat">Your current MMR: {{currentMMR}}</h4>
            <h4 class="my-3" style="color: wheat">Your best MMR: {{maxMMR}}</h4>
          </BCol>
        </BRow>
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
    const chartKDStatsData = ref([])
    const chartWLStatsData = ref([])
    const chartSeasonalStatsData = ref([])
    const chartPlayerStatsData = ref([])
    store.commit('resetLoadingComponents')
    const loadingComponents = computed(() => store.state.loadingComponents)
    const loadedStats = ref(0)
    const maxMMR = computed(() => store.state.playerStats[0].maxMmr)
    const currentMMR = computed(() => store.state.playerStats[0].mmr)

    const loadTest = async () => {
      for (let i = 0; i < 3; i++) {
        const data = [
          "Number" + i.toString(),
          100 * i
        ]
        chartSeasonalStatsData.value.push(data)
      }
      store.commit('addLoadingComponent', 1)
    }

    const loadCharts = async () => {
      if (store.state.seasonalStats !== null) {
        await loadSeasonal()
        await loadQueueStats()
        store.commit('addLoadingComponent', 1)
      }
    }

    const loadSeasonal = async () => {
      if (store.state.seasonalStats !== null) {
        const rankedGames = store.state.seasonalStats.ranked.teamRoles.all
        for (let i in rankedGames) {
          console.log("Got in the loop")
          const data = [
            rankedGames[i].seasonYear + ":" + rankedGames[i].seasonNumber,
            rankedGames[i].matchesPlayer
          ]
          chartSeasonalStatsData.value.push(data)
        }
      }
    }

    const loadQueueStats = async () => {
      if (store.state.queueStats !== null) {
        const data = store.state.queueStats[0]
        chartKDStatsData.value.push(["Deaths", data.rankedPvpDeaths])
        chartKDStatsData.value.push(["Kills", data.rankedPvpKills])
        chartWLStatsData.value.push(["Matches lost", data.rankedPvpMatchesLost])
        chartWLStatsData.value.push(["Matches won", data.rankedPvpMatchesWon])
      }
    }

    const loadStats = async () => {
      await axios.post(process.env.VUE_APP_BASE_URL_2 + "user/sign-in", {
        email: email.value,
        password: password.value
      })
      .then(async () => {
        if (store.state.queueStats === null) {
          await axios.post(process.env.VUE_APP_BASE_URL_2 + "statistics/queue-stats", {
            email: email.value,
            password: password.value
          })
              .then(res => {
                store.commit('setQueueStats', res.data.results)
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
                store.commit('setPlayerStats', res.data.players)
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
                // the part with platforms.PC can be changed later in order to get the info from PS and Xbox as well
                // now it is done for the simplicity
                store.commit('setSeasonalStats', res.data.platforms.PC.gameModes)
              })
              .catch(er => {
                alert(er.message)
              })
        }
      })
          .then(() => {
            loadCharts()
          })
      .catch((er => {
        alert(er.message)
      }))
    }

    loadCharts()

    // when add more things that need time to load
    // then apply 'store.commit('addLoadingComponent', 1)' to them
    // and change loadingComponents quota in v-if and v-show accordingly

    store.commit('addLoadingComponent', 1)
    return {loadingComponents, email, password, loadStats, chartKDStatsData,
      chartPlayerStatsData, chartSeasonalStatsData, loadedStats, loadTest, chartWLStatsData,
      maxMMR, currentMMR}
  }
}
</script>

<style scoped>

</style>