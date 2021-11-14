<template id="app">
  <div>

  <div id="logoBackground" class="Background" style="background-color: #20123C">
    <div id="mainBackground">
      <div id="mainContext">
      <Login msg="Login"/>

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
        <div id="otherLinks">
          <a class="link" href="components/Login.vue" :style="{textAlign: 'left'}">Continue without login</a>
          <a class="link" href="components/HelloWorld.vue" :style="{textAlign: 'right'}">Register</a>
        </div>
      </div>
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
  /*text-align: center;*/

  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}

#loginContainer {
  align-self: center;
  text-align: center;
  /*margin: auto;*/
  margin-left: 12%;
}

.Background {
  background-position: center;
  object-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.inputBox {
  margin-right: 50px;
}

#mainBackground {
  background-color: #20123C;
  opacity: 50%;
  width: 100vw;
  height: 100vh;
  z-index: -10;
}

#mainContext {
  padding-top: 10%;
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
  margin-top: 50px;
}

#loginButton {
  background-color: black;
  color: bisque;
  z-index: 1000;
}

#otherLinks {
  width: 100%;
  min-width: 225px;
  /*margin: auto;*/
  /*text-align: center;*/
}

.link {
  color: wheat;
}
</style>
