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
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <BFormGroup label="Type">
                <BFormSelect :options="gadgetTypes"></BFormSelect>
              </BFormGroup>
            </div>
            <div class="mb-3">
              <BFormGroup label="Description">
                <textarea class="form-control"></textarea>
              </BFormGroup>
            </div>
            <div class="mb-3">
              <BFormGroup label="Picture">
                <input class="form-control" type="file" id="weaponPic">
              </BFormGroup>
            </div>

          </form>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "AddGadgetModal",
  setup() {
    const gadgetTypes = ref(['Attacking', 'Defensive'])

    return {gadgetTypes}
  }
}
</script>

<style scoped>

</style>