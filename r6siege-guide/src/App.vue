<template id="app">
  <div>

  <div id="logoBackground" class="Background" style="background-color: #20123C">
    <div id="mainBackground">
<!--      <img alt="Vue logo" src="./assets/logo.png">-->
      <br>
      <br>
      <br>
      <Login msg="Login page"/>

  <br>
    <b-form id="loginInputField">
      <b-container id="loginContainer">
      <b-form-input :style="{borderRadius: '30px'}" class="UserInfoButton" name="Email" placeholder="Email" type="email"></b-form-input>
      <br>
      <b-form-input :style="{borderRadius: '30px'}" class="UserInfoButton" name="Password" placeholder="Password" type="password"></b-form-input>
      </b-container>
      <br>
      <b-button id="loginButton" :style="{'color':'yellow'}">Log in</b-button>
    </b-form>
  </div>
  </div>
  </div>
</template>

<script>
import Login from './components/Login.vue'

export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style>
#app {
  text-align: center;

  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}

#loginContainer {
  width: 20%;
}

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
  background-image: url("./assets/loginPicture.jpg");
  /*opacity: 50%;*/
  width: 100vw;
  height: 100vh;
  background-attachment: fixed;
}

.UserInfoButton {
  opacity: 40%;
}

#loginInputField {
  text-align: center;

}

#loginButton {
  background-color: black;
  color: bisque;
  z-index: 1000;
}
</style>
