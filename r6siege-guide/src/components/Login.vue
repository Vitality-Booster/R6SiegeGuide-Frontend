<template>
  <div>
    <h1 style="color: wheat; text-align: center">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String
  }
}
</script>

<style scoped>

.Background {
  background-image: url("../assets/loginPicture.jpg");
  background-position: left;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 80%;
}

</style>