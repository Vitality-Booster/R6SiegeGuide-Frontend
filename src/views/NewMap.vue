<template>
  <MainBackground>
    <div class="d-flex align-items-center">
      <BContainer class="m-auto">
        <div class="mt-3">
          <h3 class="mt-3" style="color: white">Name</h3>
          <BFormInput type="text" v-model="name" id="specialUnitInput">
          </BFormInput>
          <h3 class="mt-3" style="color: white">Information</h3>
          <textarea class="form-control" v-model="info" id="biographyTextarea"></textarea>
          <BRow>
            <BCol md="6">
              <h3 class="mt-3" style="color: white">Location City</h3>
              <BFormInput type="text" v-model="city" id="specialUnitInput">
              </BFormInput>
            </BCol>
            <BCol md="6">
              <h3 class="mt-3" style="color: white">Location Country</h3>
              <BFormInput type="text" v-model="country" id="uniqueAbilityInput">
              </BFormInput>
            </BCol>
          </BRow>
          <h3 class="mt-3" style="color: white">Picture</h3>
          <FilePreview pic-height="250" pic-width="400" @fileChanged="setPicture"/>
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-lg btn-danger">Cancel</button>
            <button type="submit" class="btn btn-lg btn-primary" @click="saveMap">Save</button>
          </div>
        </div>
      </BContainer>
    </div>
  </MainBackground>
</template>

<script>
import MainBackground from "../components/MainBackground";
import FilePreview from "../components/FilePreview";
import {ref} from "vue";
import axios from "axios";
import {getStorage, ref as storageRef, uploadBytes} from "firebase/storage";
import {useRouter} from "vue-router";
export default {
  name: "NewMap",
  components: {FilePreview, MainBackground},
  setup() {
    const picture = ref()
    const router = useRouter()
    const country = ref()
    const city = ref()
    const info = ref()
    const name = ref()

    const setPicture = (file) => {
      picture.value = file
    }

    const saveMap = async() => {
      await axios.post(process.env.VUE_APP_BASE_URL + "maps/" + name.value, {
        info: info.value,
        locationCity: city.value,
        locationCountry: country.value
      })
        .then(async () => {
          const storage = getStorage()
          const picRef = storageRef(storage, "/maps/" + name.value + ".png")
          await uploadBytes(picRef, picture.value)
              .then(async () => {
                await router.push({name: 'Maps'})
              })
              .catch(er => {
                alert(er.message)
              })
        })
      .catch(er => {
        alert(er.message)
      })
    }

    return {country, city, info, setPicture, name, saveMap}
  }
}
</script>

<style scoped>

</style>