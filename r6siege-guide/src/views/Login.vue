<template v-if="showLogin">

  <div id="logoBackground" class="Background" style="background-color: #20123C">
    <div id="mainBackground">
      <div id="mainContext">
        <h1 id="header">Login</h1>
        <b-form id="loginInputField">
          <b-container id="loginContainer">
            <b-input-group class="inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
              <b-input-group-text is-text :style="{background: 'transparent', border: 'transparent'}">
                <b-icon icon="envelope" aria-hidden="true"></b-icon>
              </b-input-group-text>
              <b-form-input :style="{borderRadius: '100px', margin: 'auto', alignSelf: 'center' }" class="UserInfoButton" name="Email" placeholder="Email" type="email"></b-form-input>
            </b-input-group>
            <br>
            <b-input-group class="inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
              <b-input-group-text is-text :style="{border: 'none', background: 'transparent'}">
                <b-icon icon="lock" aria-hidden="true"></b-icon>
              </b-input-group-text>
              <b-form-input :style="{borderRadius: '100px' }" class="UserInfoButton" name="Password" placeholder="Password" type="password"></b-form-input>
            </b-input-group>
          </b-container>
          <br>
          <b-button id="loginButton" :style="{borderRadius: '100px'}">Log in</b-button>
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

export default {
  name: 'Login',

  props: {
    msg: String,
    showLogin: Boolean
  },
  components: {
    // LoginRegisterTemplate,
    LoginRegisterLinks
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
}

.UserInfoButton {
  opacity: 40%;
}

#loginInputField {
  text-align: center;
  margin-top: 50px;
}

#loginButton {
  background-color: black;
  color: bisque;
  z-index: 1000;
}

/*Background styles*/
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

/*End of background styles*/

</style>