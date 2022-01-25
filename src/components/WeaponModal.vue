<template>
  <div class="modal fade" id="weaponModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New Weapon Form</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Name</label>
              <input type="text" class="form-control" id="exampleInputEmail1"
                     aria-describedby="emailHelp" v-model="name" required :disabled="disable">
            </div>
            <div class="mb-3">
              <BFormGroup label="Type" label-for="secWeapon2">
                <BFormSelect id="secWeapon2" :options="weaponTypes" required v-model="type"></BFormSelect>
              </BFormGroup>
            </div>
            <div class="mb-3">
              <BFormGroup label="Damage">
                <input type="number" v-model="damage" required>
              </BFormGroup>
            </div>
            <div class="mb-3">
              <BFormGroup label="Magazine">
                <input type="number" v-model="magazine" required>
              </BFormGroup>
            </div>
            <div class="mb-3">
              <BFormGroup label="Picture">
                <FilePreview pic-height="150" pic-width="350" @fileChanged="setPicture"></FilePreview>
              </BFormGroup>
            </div>
          </form>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="saveWeapon">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import FilePreview from "./FilePreview";
import axios from "axios";
import {ref as storageRef, getStorage, uploadBytes} from "firebase/storage";

export default {
  name: "WeaponModal",
  components: {FilePreview},
  props: [
      'disable'
  ],
  setup() {
    const weaponTypes = ref(['Primary', 'Secondary', 'Unique'])
    const picture = ref()
    const name = ref()
    const type = ref()
    const damage = ref()
    const magazine = ref()
    const storage = getStorage()

    const setPicture = (file) => {
      picture.value = file
    }

    const saveWeapon = async () => {
      const newName = name.value.trim().replaceAll(" ", "_")
      await axios.post(process.env.VUE_APP_BASE_URL + "/weapons/" + newName, {
        type: type.value,
        damage: damage.value,
        magazine: magazine.value
      })
      .then(() => {
        const pictureRef = storageRef(storage, "/weapons/" + newName + ".png")
        uploadBytes(pictureRef, picture.value)
        .then(() => {
        })
        .catch(err => {
          alert(err.message)
        })
      })
      .catch(err => {
        alert(err.message)
      })
    }

    return {weaponTypes, picture, setPicture,
      saveWeapon, name, type, damage, magazine}
  }
}
</script>

<style scoped>

</style>