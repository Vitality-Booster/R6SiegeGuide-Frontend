<template>
  <div>
    <!-- If we are on Login page, then create a link to Register page and Main page -->
    <div class="otherLinks" v-if="!isRegister">
      <router-link class="link" to="/">Continue without login</router-link>
      <router-link class="link" to="/register">Register</router-link>
    </div>
    <!-- If we are on Register page, then create a link to Link page -->
    <div class="otherLinks" v-else>
      <router-link class="link" to="/login">Login</router-link>
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
.register-login-link {

}

.otherLinks {
  width: 100%;
  min-width: 225px;
  margin: auto;
  text-align: center;
  padding-top: 2%;
}

.link {
  color: wheat;
  padding: 0 10px;
  /*position: relative;*/
}

.link:after {
  content: '';
  position: absolute;
  left: 0;
  display: inline-block;
  height: 1em;
  width: 50%;
  border-bottom: 2px solid;
  margin-top: 10px;
  opacity: 0;
  -webkit-transition: opacity 1s, -webkit-transform 1s;
  transition: opacity 1s, transform 1s;
  -webkit-transform: scale(0,1);
  transform: scale(0,1);
}

.link:hover:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}
</style>