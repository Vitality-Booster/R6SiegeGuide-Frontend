<template>
  <div class="d-flex flex-column align-items-center">
    <input
        class="form-control"
        ref="fileInput"
        type="file"
        @input="pickFile">

    <div
        class="imagePreviewWrapper mt-2"
        :style="{ 'background-image': `url(${previewImage})`, width: `${picWidth}px`, height: `${picHeight}px`, display: 'block',
         cursor: 'pointer', backgroundSize: 'cover', backgroundPosition: 'center center'}"
        @click="selectImage">
    </div>
  </div>
</template>

<script>
export default {
  props: [
      // decide what to do with that
      'picHeight',
      'picWidth',
  ],
  data() {
    return {
      previewImage: null,
      height: 200
    };
  },
  methods: {
    selectImage () {
      this.$refs.fileInput.click()
    },
    pickFile () {
      let input = this.$refs.fileInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.previewImage = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('fileChanged', file[0])
      }
    }
  }
}
</script>


<style scoped>

</style>