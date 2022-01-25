<template>
  <div>
    <Spinner v-if="loadingComponents < 9" />
    <MainBackground v-show="loadingComponents >= 9">
      <div class="m-4">
        <BRow class="pb-5">
          <BCol class="text-center" lg="4">
            <div>
              <BImg :src="opPicture" alt="<<operator preview>>" />
            </div>
            <h1 class="mt-2" style="color: white">{{operator.name}}</h1>
            <h5 class="mt-2" style="color: white">{{operator.specialUnit}}</h5>
            <h3 class="mt-2" style="color: white">{{operator.side}}</h3>
          </BCol>
          <BCol lg="4">
            <BFormGroup style="color: white" label="Biography">
              <h4 style="color: white">{{operator.biography}}</h4>
            </BFormGroup>
            <h4 class="mt-3" style="color: white">Real Name: {{operator.realFullName}}</h4>
            <h4 class="mt-3" style="color: white">Place of Birth: {{operator.cityOfBirth}}, {{operator.countryOfBirth}}</h4>
            <h4 class="mt-3" style="color: white">Date of Birth: {{operator.dateOfBirth.substr(0, 10)}}</h4>
            <h4 class="mt-3" style="color: white">Unique ability: {{operator.uniqueAbility}}</h4>
            <h4 class="mt-3" style="color: white">Health: {{healthArray[operator.healthPoints - 1]}}</h4>
            <h4 class="mt-3" style="color: white">Speed: {{speedArray[operator.speedPoints - 1]}}</h4>
            <h4 class="mt-3" style="color: white">Difficulty: {{diffArray[operator.difficultyPoints - 1]}}</h4>
          </BCol>
          <BCol lg="4" v-if="loadingComponents >= 3">
            <h2 style="color: white">Loadout</h2>
            <ViewWeapon :weapon="operator.primaryWeapon1" />
            <ViewWeapon :weapon="operator.primaryWeapon2" />
            <ViewWeapon :weapon="operator.secondaryWeapon1" />
            <ViewWeapon :weapon="operator.secondaryWeapon2" />
            <ViewGadget :gadget="operator.gadget1" />
            <ViewGadget class="mt-2" :gadget="operator.gadget2" />
          </BCol>
        </BRow>
      </div>
    </MainBackground>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, ref} from "vue";
import Spinner from "../components/Spinner";
import MainBackground from "../components/MainBackground";
import axios from "axios";
import {ref as storageRef,getDownloadURL, getStorage} from "firebase/storage";
import ViewWeapon from "../components/ViewWeapon";
import ViewGadget from "../components/ViewGadget";

export default {
  name: "SingleOperator",
  components: {ViewGadget, ViewWeapon, MainBackground, Spinner},
  setup() {
    const router = useRouter()
    const healthArray = ['100 HP', '110 HP', '120 HP']
    const speedArray = ['Slow', 'Average', 'Fast']
    const diffArray = ['Easy', 'Average', 'Hard']
    const operatorPath = router.currentRoute.value.path
    const operatorName = operatorPath.substr(operatorPath.lastIndexOf("/") + 1)
    const store = useStore()
    const operator = ref()
    const opPicture = ref('value')
    store.commit('resetLoadingComponents')
    const loadingComponents = computed(() => store.state.loadingComponents)

    const loadOperator = async () => {
      await axios.get(process.env.VUE_APP_BASE_URL + "/operators/" + operatorName)
      .then(res => {
        operator.value = res.data
        store.state.someNames = res.data
      })
          .then(async () => {
            const storage = getStorage()
            const operRef = storageRef(storage, "/operators/" + operatorName + "/preview.png")
            getDownloadURL(operRef)
            .then(async res => {
              opPicture.value = res
            })
            store.commit('addLoadingComponent', 1)
          })
      .catch(er => {
        alert(er.message)
      })
    }

    loadOperator()

    return {loadingComponents, opPicture, operator, speedArray, healthArray, diffArray}
  }
}
</script>

<style scoped>

</style>