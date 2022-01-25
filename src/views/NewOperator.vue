<template>
  <MainBackground>
    <WeaponModal />
    <AddGadgetModal />
    <BRow class="mt-3 mx-4 d-flex justify-content-between">
      <BCol lg="6">
        <BCard >
          <label for="biographyTextarea">Biography</label>
          <textarea class="form-control" v-model="biography" id="biographyTextarea"></textarea>
          <BFormGroup class="mt-3" label="Special Unit" label-for="specialUnitInput">
            <BFormInput type="text" v-model="specialUnit" id="specialUnitInput">
            </BFormInput>
          </BFormGroup>
          <BFormGroup label="Unique Ability" label-for="uniqueAbilityInput">
            <BFormInput type="text" v-model="uniqueAbility" id="uniqueAbilityInput">
            </BFormInput>
          </BFormGroup>
          <BFormGroup label="Side" label-for="sideSelectInput">
            <BFormSelect id="sideSelectInput" v-model="side" :options="sides"></BFormSelect>
          </BFormGroup>
          <BFormGroup label="Select Primary Weapon 1" label-for="primWeapon1">
            <BFormSelect id="primWeapon1" v-model="primaryWeapon1" :options="primaryWeapons"></BFormSelect>
          </BFormGroup>
          <BFormGroup label="Select Primary Weapon 2" label-for="primWeapon2">
            <BFormSelect id="primWeapon2" v-model="primaryWeapon2" :options="primaryWeapons"></BFormSelect>
          </BFormGroup>
          <BFormGroup label="Select Secondary Weapon 1" label-for="secWeapon1">
            <BFormSelect id="secWeapon1" v-model="secondaryWeapon1" :options="secondaryWeapons"></BFormSelect>
          </BFormGroup>
          <BFormGroup label="Select Primary Weapon 2" label-for="secWeapon2">
            <BFormSelect id="secWeapon2" v-model="secondaryWeapon2" :options="secondaryWeapons"></BFormSelect>
          </BFormGroup>
          <button type="button" v-show="primaryWeapon1 === 'New' || secondaryWeapon1 === 'New' || primaryWeapon2 === 'New' || secondaryWeapon2 === 'New'"
                  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#weaponModal">
            Add new weapon
          </button>
          <BFormGroup label="Select Gadget 1">
            <BFormSelect v-model="gadget1" :options="gadgets"></BFormSelect>
          </BFormGroup>
          <BFormGroup label="Select Gadget 2">
            <BFormSelect v-model="gadget2" :options="gadgets"></BFormSelect>
          </BFormGroup>
          <button type="button" v-show="gadget1 === 'New'"
                  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#gadgetModal">
            Add new gadget
          </button>
        </BCard>
      </BCol>
      <BCol class="ms-3" lg="5">
        <BCard >
          <BFormGroup label="Picture">
            <FilePreview pic-height="250" pic-width="150" @fileChanged="setPicture"></FilePreview>
          </BFormGroup>
          <BFormGroup label="Name" label-for="nameInput">
            <BFormInput type="text" v-model="name" id="nameInput">
            </BFormInput>
          </BFormGroup>
          <BFormGroup label="Real Full Name" label-for="fullNameInput">
            <BFormInput type="text" v-model="realName" id="fullNameInput">
            </BFormInput>
          </BFormGroup>
          <BCardText class="mt-2" size="lg">Place of Birth</BCardText>
          <BFormGroup label="City" label-for="cityOfBirthInput">
            <BFormInput type="text" v-model="city" id="cityOfBirthInput">
            </BFormInput>
          </BFormGroup>
          <BFormGroup label="Country" label-for="countryOfBirthInput">
            <BFormInput type="text" v-model="country" id="countryOfBirthInput">
            </BFormInput>
          </BFormGroup>
          <BFormGroup label="Date of Birth" label-for="fateOfBirthInput">
            <BFormInput type="date" v-model="birthday" id="dateOfBirthInput">
            </BFormInput>
          </BFormGroup>
          <label class="">Select operator's health</label>
          <BFormRadioGroup v-model="chosenHealthAndSpeed">
            <BFormRadio value="1" size="sm">100 HP</BFormRadio>
            <BFormRadio value="2">110 HP</BFormRadio>
            <BFormRadio value="3" size="lg">120 HP</BFormRadio>
          </BFormRadioGroup>
          <label class="">Select operator's speed</label>
          <BFormRadioGroup v-model="chosenHealthAndSpeed" class="">
            <BFormRadio value="3" size="sm">Slow</BFormRadio>
            <BFormRadio value="2">Average</BFormRadio>
            <BFormRadio value="1" size="lg">Fast</BFormRadio>
          </BFormRadioGroup>
          <label class="">Select operator's difficulty</label>
          <BFormRadioGroup v-model="chosenDifficulty">
            <BFormRadio value="1" size="sm">Easy</BFormRadio>
            <BFormRadio value="2">Average</BFormRadio>
            <BFormRadio value="3" size="lg">Difficult</BFormRadio>
          </BFormRadioGroup>
        </BCard>
          <div class="mt-4 d-flex justify-content-end">
          <button type="button" class="btn btn-danger btn-lg mr-5">Cancel</button>
          <button type="button" class="btn btn-primary btn-lg" @click="saveOperator">Save</button>
          </div>
      </BCol>
    </BRow>
  </MainBackground>
</template>

<script>
import MainBackground from "../components/MainBackground";
import axios from "axios";
import {useRouter} from "vue-router";
import {ref, watch} from "vue";
import WeaponModal from "../components/WeaponModal";
import AddGadgetModal from "../components/AddGadgetModal";
import FilePreview from "../components/FilePreview";
import {ref as storageRef, getStorage, uploadBytes} from "firebase/storage";
export default {
  name: "NewOperator",
  components: {FilePreview, AddGadgetModal, WeaponModal, MainBackground},
  setup() {
    const router = useRouter()
    const picture = ref()
    const sides = ref(["Attacker", "Defender"])
    const primaryWeapon1 = ref()
    const secondaryWeapon1 = ref()
    const primaryWeapon2 = ref()
    const secondaryWeapon2 = ref()
    const gadgets = ref(['New'])
    const gadget1 = ref()
    const gadget2 = ref()
    const primaryWeapons = ref([])
    const secondaryWeapons = ref([])
    const attackingGadgets = ref([])
    const defensiveGadgets = ref([])
    const chosenHealthAndSpeed = ref()
    const chosenDifficulty = ref()
    const side = ref()
    const biography = ref()
    const specialUnit = ref()
    const uniqueAbility = ref()
    const name = ref()
    const realName = ref()
    const city = ref()
    const country = ref()
    const birthday = ref()

    const getWeapons = async () => {
      await axios.get(process.env.VUE_APP_BASE_URL + "weapons/get-all-names")
      .then(res => {
        res.data.namesAndTypes.forEach(el => {
          if(el.type === "Primary") {
            primaryWeapons.value.push(el.name)
          }
          else if(el.type === "Secondary") {
            secondaryWeapons.value.push(el.name)
          }
        })
        primaryWeapons.value.push("New")
        secondaryWeapons.value.push("New")
      })
      .catch(er => {
        alert(er.message)
      })
    }

    getWeapons()

    const getGadgets = async () => {
      await axios.get(process.env.VUE_APP_BASE_URL + "gadgets/get-all-names")
          .then(res => {
            res.data.namesAndTypes.forEach(el => {
              if(el.type === "Attacking") {
                attackingGadgets.value.push(el.name)
              }
              else if(el.type === "Defensive") {
                defensiveGadgets.value.push(el.name)
              }
            })
            attackingGadgets.value.push("New")
            defensiveGadgets.value.push("New")
          })
          .catch(er => {
            alert(er.message)
          })
    }

    getGadgets()

    watch(side, () => {
      if (side.value === "Defender") {
        gadgets.value = defensiveGadgets.value
      }
      else if (side.value === "Attacker") {
        gadgets.value = attackingGadgets.value
      }
      else {
        gadgets.value = ['New']
      }
    })

    const setPicture = (file) => {
      picture.value = file
    }

    const saveOperator = async () => {
      await axios.post(process.env.VUE_APP_BASE_URL + "operators/" + name.value, {
        side: side.value,
        specialUnit: specialUnit.value,
        healthPoints: chosenHealthAndSpeed.value,
        speedPoints: 4 - chosenHealthAndSpeed.value,
        difficultyPoints: chosenDifficulty.value,
        nationality: country.value,
        uniqueAbility: uniqueAbility.value,
        primaryWeapon1Name: primaryWeapon1.value,
        primaryWeapon2Name: primaryWeapon2.value,
        secondaryWeapon1Name: secondaryWeapon1.value,
        secondaryWeapon2Name: secondaryWeapon2.value,
        gadget1Name: gadget1.value,
        gadget2Name: gadget2.value,
        realFullName: realName.value,
        dateOfBirth: birthday.value.toString(),
        countryOfBirth: country.value,
        cityOfBirth: city.value,
        biography: biography.value
      })
      .then(async () => {
        const storage = getStorage()
        const picRef = storageRef(storage, "/operators/" + name.value + "/preview.png")
        await uploadBytes(picRef, picture.value)
        .then(async () => {
          await router.push({name: 'Operators'})
        })
        .catch(er => {
          alert(er.message)
        })
      })
      .catch(er => {
        alert(er.message)
      })
    }

    return {sides, primaryWeapons,
      primaryWeapon1, secondaryWeapon1, gadgets, gadget1,
      chosenDifficulty, chosenHealthAndSpeed, attackingGadgets,
    defensiveGadgets, secondaryWeapons, primaryWeapon2, secondaryWeapon2,
    gadget2, side, setPicture, biography, specialUnit, uniqueAbility, name,
    realName, city, country, birthday, saveOperator}
  }
}
</script>

<style scoped>

</style>