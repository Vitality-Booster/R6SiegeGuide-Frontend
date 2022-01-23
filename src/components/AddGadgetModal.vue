<template>
  <div class="modal fade" id="gadgetModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New Gadget Form</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Name</label>
              <input type="text" class="form-control" id="exampleInputEmail1"
                     aria-describedby="emailHelp" v-model="name" required>
            </div>
            <div class="mb-3">
              <BFormGroup label="Type">
                <BFormSelect :options="gadgetTypes" v-model="type"></BFormSelect>
              </BFormGroup>
            </div>
            <div class="mb-3">
              <BFormGroup label="Description">
                <textarea class="form-control" v-model="description"></textarea>
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
          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="saveGadget">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import FilePreview from "./FilePreview";
import {getStorage, ref as storageRef, uploadBytes} from "firebase/storage";
import axios from "axios";

export default {
  name: "AddGadgetModal",
  components: {FilePreview},
  setup() {
    const gadgetTypes = ref(['Attacking', 'Defensive'])
    const picture = ref()
    const name = ref()
    const type = ref()
    const description = ref()
    const storage = getStorage()

    const setPicture = (file) => {
      picture.value = file
      console.log(file)
    }

    const saveGadget = async () => {
      const newName = name.value.trim().replaceAll(" ", "_")
      await axios.post(process.env.VUE_APP_BASE_URL + "gadgets/" + newName, {
        type: type.value,
        description: description.value
      })
          .then(async () => {
            const pictureRef = storageRef(storage, "/gadgets/" + newName + ".png")
            await uploadBytes(pictureRef, picture.value)
                .then(() => {
                  console.log("Uploaded a picture!")
                })
                .catch(err => {
                  alert(err.message)
                })
          })
          .catch(err => {
            alert(err.message)
          })
    }

    return {gadgetTypes, setPicture, saveGadget, name, type, description}
  }
}
</script>

<style scoped>

</style>