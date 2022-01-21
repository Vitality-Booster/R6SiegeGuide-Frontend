<template>
  <MainBackground>
    <WeaponModal />
    <AddGadgetModal />
    <BRow class="mt-3 mx-4 d-flex justify-content-between">
      <BCol lg="6">
        <BCard >
          <label for="biographyTextarea">Biography</label>
          <textarea class="form-control" id="biographyTextarea"></textarea>
          <BCardText class="mt-2" size="lg">Place of Birth</BCardText>
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
          <BFormGroup label="Select Primary Weapon 1" label-for="primWeapon1">
            <BFormSelect id="primWeapon1" v-model="primaryWeapon1" :options="primaryWeapons"></BFormSelect>
          </BFormGroup>
          <BFormGroup label="Select Primary Weapon 2" label-for="primWeapon2">
            <BFormSelect id="primWeapon2" :options="primaryWeapons"></BFormSelect>
          </BFormGroup>
          <BFormGroup label="Select Secondary Weapon 1" label-for="secWeapon1">
            <BFormSelect id="secWeapon1" v-model="secondaryWeapon1" :options="primaryWeapons"></BFormSelect>
          </BFormGroup>
          <BFormGroup label="Select Primary Weapon 2" label-for="secWeapon2">
            <BFormSelect id="secWeapon2" :options="primaryWeapons"></BFormSelect>
          </BFormGroup>
          <button type="button" v-show="primaryWeapon1 === 'New' || secondaryWeapon1 === 'New'"
                  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#weaponModal">
            Add new weapon
          </button>
          <BFormGroup label="Select Gadget 1">
            <BFormSelect v-model="gadget1" :options="gadgets"></BFormSelect>
          </BFormGroup>
          <BFormGroup label="Select Gadget 2">
            <BFormSelect :options="gadgets"></BFormSelect>
          </BFormGroup>
          <button type="button" v-show="gadget1 === 'New'"
                  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#gadgetModal">
            Add new gadget
          </button>
        </BCard>
      </BCol>
      <BCol class="ms-3" lg="5">
        <BCard >
          <label for="operatorPicture">Operator photo</label>
          <input class="form-control" type="file" id="operatorPicture">
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
          <label class="">Select operator's health</label>
          <BFormCheckboxGroup>
            <BFormCheckbox size="sm">100 HP</BFormCheckbox>
            <BFormCheckbox>110 HP</BFormCheckbox>
            <BFormCheckbox size="lg">120 HP</BFormCheckbox>
          </BFormCheckboxGroup>
          <label class="">Select operator's speed</label>
          <BFormCheckboxGroup class="">
            <BFormCheckbox size="sm">Slow</BFormCheckbox>
            <BFormCheckbox>Average</BFormCheckbox>
            <BFormCheckbox size="lg">Fast</BFormCheckbox>
          </BFormCheckboxGroup>
          <label class="">Select operator's difficulty</label>
          <BFormCheckboxGroup>
            <BFormCheckbox size="sm">Easy</BFormCheckbox>
            <BFormCheckbox>Average</BFormCheckbox>
            <BFormCheckbox size="lg">Difficult</BFormCheckbox>
          </BFormCheckboxGroup>
        </BCard>

          <div class="mt-4 d-flex justify-content-end">
          <button type="button" class="btn btn-danger btn-lg mr-5">Cancel</button>
          <button type="button" class="btn btn-primary btn-lg">Save</button>
          </div>
      </BCol>
    </BRow>
  </MainBackground>
</template>

<script>
import MainBackground from "../components/MainBackground";
import axios from "axios";
import {useRouter} from "vue-router";
import { ref} from "vue";
import WeaponModal from "../components/WeaponModal";
import AddGadgetModal from "../components/AddGadgetModal";
export default {
  name: "SingleOperator",
  components: {AddGadgetModal, WeaponModal, MainBackground},
  setup() {
    const router = useRouter()
    const file2 = null
    const route = router.currentRoute.value.fullPath
    const name = route.substr(route.lastIndexOf("/") + 1, route.length)
    const operatorPic = ref(null)
    const sides = ref(["Attacker", "Defender"])
    const health = ref([1, 2, 3])
    const value = ref()
    const primaryWeapons = ref(['Some weapon', 'New'])
    const primaryWeapon1 = ref()
    const secondaryWeapon1 = ref()
    const gadgets = ref(['Some Gadget', 'New'])
    const gadget1 = ref()

    const operator = axios.get(process.env.VUE_APP_BASE_URL + "/operators/" + name)

    return {operator, operatorPic, file2, sides, value,
      health, primaryWeapons, primaryWeapon1, secondaryWeapon1,
    gadgets, gadget1}
  }
}
</script>

<style scoped>

</style>