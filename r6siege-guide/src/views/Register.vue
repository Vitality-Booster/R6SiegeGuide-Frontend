<template>
  <div id="logoBackground" class="Background" style="background-color: #20123C">
    <div id="mainBackground">
      <div id="mainContext">
        <h1 id="header">Register</h1>
        <b-form id="loginInputField">
          <b-container id="loginContainer">
            <b-input-group class="inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
              <b-input-group-text is-text :style="{background: 'transparent', border: 'transparent'}">
                <b-icon-file-earmark-person class="inputBoxIcon" aria-hidden="true"></b-icon-file-earmark-person>
              </b-input-group-text>
              <b-form-input :style="{borderRadius: '100px', margin: 'auto', alignSelf: 'center' }" class="UserInfoButton" name="FullName" placeholder="Full name" type="text"></b-form-input>
            </b-input-group>
            <b-input-group class="inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
              <b-input-group-text is-text :style="{border: 'none', background: 'transparent'}">
                <b-icon icon="person" class="inputBoxIcon" aria-hidden="true" :style="{opacity: '100%'}"></b-icon>
              </b-input-group-text>
              <b-form-input :style="{borderRadius: '100px' }" class="UserInfoButton" name="Username" placeholder="Username" type="text"></b-form-input>
            </b-input-group>
            <b-input-group class="inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
              <b-input-group-text is-text :style="{border: 'none', background: 'transparent'}">
                <b-icon icon="envelope" class="inputBoxIcon" aria-hidden="true"></b-icon>
              </b-input-group-text>
              <b-form-input :style="{borderRadius: '100px' }" class="UserInfoButton" name="Email" placeholder="Email" type="email"></b-form-input>
            </b-input-group>
            <b-input-group class="inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
              <b-input-group-text is-text :style="{border: 'none', background: 'transparent'}">
                <b-icon icon="lock" class="inputBoxIcon" aria-hidden="true"></b-icon>
              </b-input-group-text>
              <b-form-input :style="{borderRadius: '100px' }" class="UserInfoButton" name="Password" placeholder="Password" type="password"></b-form-input>
            </b-input-group>
            <b-input-group class="inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
              <b-input-group-text is-text :style="{border: 'none', background: 'transparent'}">
                <b-icon icon="lock" class="inputBoxIcon" aria-hidden="true"></b-icon>
              </b-input-group-text>
              <b-form-input :style="{borderRadius: '100px' }" class="UserInfoButton" name="RepeatPassword" placeholder="Repeat password" type="password"></b-form-input>
            </b-input-group>
          </b-container>
          <br>
          <b-button id="loginButton" :style="{borderRadius: '100px', width: '120px'}">Register</b-button>
        </b-form>
        <LoginRegisterLinks :is-register="true">

        </LoginRegisterLinks>
      </div>
    </div>
  </div>
</template>

<script>
import LoginRegisterLinks from "@/components/LoginRegisterLinks";

export default {
  name: "Register",
  components: {
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
  padding-top: 25px;
}

.UserInfoButton, .inputBoxIcon {
  opacity: 70%;
  border: transparent;
}

.inputBoxIcon {
  color: white;
}

#loginInputField {
  text-align: center;
  padding-top: 1%;
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
  /*background-color: #20123C;*/
  background-color: #171917;
  opacity: 75%;
  width: 100vw;
  height: 100vh;
  z-index: -10;
}

#logoBackground {
  background-image: url("../assets/loginPicture.jpg");
  opacity: 100%;
  width: 100vw;
  height: 100vh;
  background-attachment: fixed;
}

#mainContext {
  padding-top: 9%;
}

/*End of background styles*/

</style>