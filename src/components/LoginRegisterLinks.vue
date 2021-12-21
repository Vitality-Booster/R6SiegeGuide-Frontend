<template>
  <div >
    <!-- If we are on Login page, then create a link to Register page and Main page -->
    <div class="otherLinks" v-if="!isRegister">
      <router-link class="page-link" to="/register" >Register</router-link>
      <br>
      <router-link class="page-link" to="/">Continue without login</router-link>
    </div>
    <!-- If we are on Register page, then create a link to Link page -->
    <div class="otherLinks" v-else>
      <router-link class="page-link" to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
//import Register from "@/views/Register";

export default {
  name: "LoginRegisterLinks",
  components: {
    //Login,
    //Register
  },
  props: {
    isRegister: {
      type: Boolean,
      default: false,
    }
  },
}
</script>

<style scoped>

.otherLinks {
  width: 20%;
  min-width: 225px;
  margin: auto;
  text-align: center;
  padding-top: 2px;
}


.page-link {
  display: inline-block;
  text-align: center;
  align-items: center;
  margin: auto;
  background: transparent;
  border: transparent;
  position: relative;
  color: wheat;
  transition: all 0.8s ease;
}

.page-link:after {
  display: block;
  content: "";
  position: absolute;
  height: 1px;
  background-color: wheat;
  width: 0;
  left: 50%;
  bottom: 2px;
  transform: translateX(-50%);
  transition: 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) all;
}

.page-link:hover:after {
  width: 90%;
}

</style>