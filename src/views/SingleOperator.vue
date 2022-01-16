<template>
  <MainBackground>
    <BRow class="mt-3 mx-4 d-flex justify-content-between">
      <BCol lg="6">
        <BCard >
          <BCardText>Biography</BCardText>
          <BFormInput type="text">Here it is</BFormInput>
          <BCardText>Place of Birth</BCardText>
          <BFormGroup label="City" label-for="cityOfBirthInput">
            <BFormInput type="text" id="cityOfBirthInput">
            </BFormInput>
          </BFormGroup>
          <BFormGroup label="Country" label-for="countryOfBirthInput">
            <BFormInput type="text" id="countryOfBirthInput">
            </BFormInput>
          </BFormGroup>
          <BFormGroup label="Date of Birth" label-for="fateOfBirthInput">
            <BFormInput type="date" id="dateOfBirthInput">
            </BFormInput>
          </BFormGroup>
        </BCard>
      </BCol>
      <BCol class="ms-3" lg="5">
        <BCard >
          <BCardText>Operator photo</BCardText>
          <input type="file" v-model="operatorPic" title="Operator picture">
          <BFormGroup label="Name" label-for="nameInput">
            <BFormInput type="text" id="nameInput">
            </BFormInput>
          </BFormGroup>
          <BFormGroup label="Real Full Name" label-for="fullNameInput">
            <BFormInput type="text" id="fullNameInput">
            </BFormInput>
          </BFormGroup>
          <BFormGroup label="Special Unit" label-for="specialUnitInput">
            <BFormInput type="text" id="specialUnitInput">
            </BFormInput>
          </BFormGroup>
          <BFormGroup label="Unique Ability" label-for="uniqueAbilityInput">
            <BFormInput type="text" id="uniqueAbilityInput">
            </BFormInput>
          </BFormGroup>
          <BFormGroup label="Side" label-for="sideSelectInput">
            <BFormSelect id="sideSelectInput" :options="sides"></BFormSelect>
          </BFormGroup>
          <BFormGroup>
            <BFormRating variant="info" class="mb-2"></BFormRating>
          </BFormGroup>
          <BFormCheckboxGroup :options="health">
          </BFormCheckboxGroup>
          <BRow>
            <BCol lg="4">
              <BFormRating variant="info" class="mb-2"></BFormRating>
            </BCol>
            <BCol lg="4">
              <b-form-rating variant="info" class="mb-2"></b-form-rating>
            </BCol>
            <BCol lg="4">
              <b-form-rating variant="info" class="mb-2"></b-form-rating>
            </BCol>
          </BRow>
        </BCard>
      </BCol>
    </BRow>
  </MainBackground>
</template>

<script>
import MainBackground from "../components/MainBackground";
import axios from "axios";
import {useRouter} from "vue-router";
import { ref} from "vue";
export default {
  name: "SingleOperator",
  components: {MainBackground},
  setup() {
    const router = useRouter()
    const file2 = null
    const route = router.currentRoute.value.fullPath
    const name = route.substr(route.lastIndexOf("/") + 1, route.length)
    const operatorPic = ref(null)
    const sides = ref(["Attacker", "Defender"])
    const health = ref([1, 2, 3])
    const value = ref()

    const operator = axios.get(process.env.VUE_APP_BASE_URL + "/operators/" + name)

    return {operator, operatorPic, file2, sides, value, health}
  }
}
</script>

<style scoped>

</style>