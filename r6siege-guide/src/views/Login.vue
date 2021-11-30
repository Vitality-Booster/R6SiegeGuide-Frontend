<template v-if="showLogin">

  <div id="logoBackground" class="Background" style="background-color: #20123C">
    <div id="mainBackground">
      <div id="mainContext">
        <h1 id="header">Login</h1>
        <b-form id="loginInputField">
          <b-container id="loginContainer">
            <b-input-group class="inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
              <b-input-group-text is-text :style="{background: 'transparent', border: 'transparent'}">
                <b-icon icon="envelope" class="inputBoxIcon" aria-hidden="true"></b-icon>
              </b-input-group-text>
              <b-form-input :style="{borderRadius: '100px', margin: 'auto', alignSelf: 'center' }" class="UserInfoButton" v-model="userEmail" placeholder="Email" type="email"></b-form-input>
            </b-input-group>
            <b-input-group class="inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
              <b-input-group-text is-text :style="{border: 'none', background: 'transparent'}">
                <b-icon icon="lock" class="inputBoxIcon" aria-hidden="true"></b-icon>
              </b-input-group-text>
              <b-form-input :style="{borderRadius: '100px' }" class="UserInfoButton" v-model="userPassword" placeholder="Password" type="password"></b-form-input>
            </b-input-group>
          </b-container>
          <b-button id="loginButton" @click="loginUser()" :style="{borderRadius: '100px', width: '120px'}">Log in</b-button>
        </b-form>
        <LoginRegisterLinks>

        </LoginRegisterLinks>
      </div>
    </div>
  </div>
</template>

<script>
 // import LoginRegisterTemplate from "@/components/LoginRegisterTemplate";
import LoginRegisterLinks from "@/components/LoginRegisterLinks";
import axios from 'axios';

export default {
  name: 'Login',
  data () {
    return {
      userEmail : '',
      userPassword : ''
    }
  },
  props: {
    msg: String,
    showLogin: Boolean
  },
  components: {
    // LoginRegisterTemplate,
    LoginRegisterLinks
  },
  methods: {
    async loginUser() {
      await axios.post("http://127.0.0.1:8080/login", this.$data).then(response => (
          console.log(response)
      ))
    }
  }
}
</script>

<style scoped>

#header {
  text-align: center;
  color: wheat;
}

#loginContainer {
  align-self: center;
  text-align: center;
  /*margin: auto;*/
  margin-left: 12%;
}

.inputBox {
  margin-right: 50px;
  padding-top: 25px;
}

.UserInfoButton, .inputBoxIcon {
  opacity: 70%;
  border: transparent;
}

.inputBoxIcon {
  color: white;
}

.inputBox {
  margin-right: 50px;

}

#loginInputField {
  text-align: center;
  padding-top: 1%;
}

#loginButton {
  background-color: black;
  color: bisque;
  z-index: 1000;
  margin-top: 25px;
}

/*Background styles*/
.Background {
  background-position: center;
  object-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#mainBackground {
  /*background-color: #20123C;*/
  background-color: #171917;
  opacity: 75%;
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
  padding-top: 9%;
}

/*End of background styles*/

</style>