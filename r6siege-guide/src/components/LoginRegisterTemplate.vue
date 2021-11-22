<template>
  <div id="logoBackground" class="Background" style="background-color: #20123C">
    <div id="mainBackground">
      <div id="mainContext">

      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/views/Login";
import Register from "@/views/Register";

export default {
  name: "LoginRegisterTemplate",
  // components: {Register, Login},
  data() {
    return {
      isRegister: false
    }
  },
  comments: {
    Login,
    Register
  },
  methods: {
    moveToRegister() {
      this.isRegister = true;
    }
  }
}
</script>

<style scoped>

.Background {
  background-position: center;
  object-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#mainBackground {
  background-color: #20123C;
  opacity: 50%;
  width: 100vw;
  height: 100vh;
  z-index: -10;
}

#logoBackground {
  background-image: url("../assets/loginPicture.jpg");

  /*opacity: 50%;*/
  width: 100vw;
  height: 100vh;
  background-attachment: fixed;
}

#mainContext {
  padding-top: 10%;
}



</style>