<template>
  <div id="logoBackground" class="Background" :style="{backgroundColor: '#20123C', backgroundImage: 'url(' + loginBackgroundPic + ')'}">
    <div  class="registerBackground pt-5">
      <div class="pt-5">
        <h1 id="header">Register</h1>
        <b-form class="pt-1 text-center" id="loginInputField">
          <b-container >
            <BCol class="pe-4">
            <b-input-group class="inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
              <b-input-group-text is-text :style="{background: 'transparent', border: 'transparent'}">
<!--                <b-icon-file-earmark-person class="inputBoxIcon" aria-hidden="true"></b-icon-file-earmark-person>-->
                <BIcon icon="file-earmark-person" class="inputBoxIcon" aria-hidden="true" />
              </b-input-group-text>
              <b-form-input :style="{borderRadius: '100px', margin: 'auto', alignSelf: 'center' }" class="UserInfoButton" v-model="fullName" placeholder="Full name" type="text"></b-form-input>
            </b-input-group>
            <b-input-group class="inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
              <b-input-group-text is-text :style="{border: 'none', background: 'transparent'}">
                <b-icon icon="person" class="inputBoxIcon" aria-hidden="true" :style="{opacity: '100%'}"></b-icon>
              </b-input-group-text>
              <b-form-input :style="{borderRadius: '100px' }" class="UserInfoButton" v-model="username" placeholder="Username" type="text"></b-form-input>
            </b-input-group>
            <b-input-group class="inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
              <b-input-group-text is-text :style="{border: 'none', background: 'transparent'}">
                <b-icon icon="envelope" class="inputBoxIcon" aria-hidden="true"></b-icon>
              </b-input-group-text>
              <b-form-input :style="{borderRadius: '100px' }" class="UserInfoButton" v-model="email" placeholder="Email" type="email"></b-form-input>
            </b-input-group>
            <b-input-group class="inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
              <b-input-group-text is-text :style="{border: 'none', background: 'transparent'}">
                <b-icon icon="lock" class="inputBoxIcon" aria-hidden="true"></b-icon>
              </b-input-group-text>
              <b-form-input :style="{borderRadius: '100px' }" class="UserInfoButton" v-model="password" placeholder="Password" type="password"></b-form-input>
            </b-input-group>
            <b-input-group class="inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
              <b-input-group-text is-text :style="{border: 'none', background: 'transparent'}">
                <b-icon icon="lock" class="inputBoxIcon" aria-hidden="true"></b-icon>
              </b-input-group-text>
              <b-form-input :style="{borderRadius: '100px' }" class="UserInfoButton" v-model="repeatPassword" placeholder="Repeat password" type="password"></b-form-input>
            </b-input-group>
            </BCol>
          </b-container>
          <br>
          <b-button id="loginButton" @click="registerUser" :style="{borderRadius: '100px', width: '120px'}">Register</b-button>
        </b-form>
        <LoginRegisterLinks :is-register="true">

        </LoginRegisterLinks>
      </div>
    </div>
  </div>
</template>

<script>
import LoginRegisterLinks from "@/components/LoginRegisterLinks";
// import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Register",
  components: {
    LoginRegisterLinks
  },
  setup () {
    const fullName = ref('')
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const repeatPassword = ref('')

    const store = useStore()
    const router = useRouter()

    const loginBackgroundPic = store.state.loginBackgroundPic

    // const backgroundImageRef = storageRef(storage, "website/loginPicture.jpg")
    // getDownloadURL(backgroundImageRef)
    //     .then(res => {
    //       document.getElementById("logoBackground").style.backgroundImage = "url(" + res + ")"
    //     })
    //     .catch(err => {
    //       alert(err.message)
    //     })

    const registerUser = async () => {
      if (password.value === repeatPassword.value) {
        try {
          await store.dispatch('register', {
            fullName: fullName.value,
            email: email.value,
            username: username.value,
            password: password.value
          })
          await router.push('/')
        } catch(err) {
          alert(err.message)
        }
      }
      else {
        alert("Password and Repeat password field should be the same")
      }
    }

    return {
      fullName,
      username,
      email,
      password,
      repeatPassword,
      registerUser,
      loginBackgroundPic
    }
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>

#header {
  text-align: center;
  color: wheat;
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

.registerBackground {
  background-color: #4f450642;
  width: 100vw;
  height: 100vh;
}

#logoBackground {
  opacity: 100%;
  width: 100vw;
  height: 100vh;
  background-attachment: fixed;
}

/*End of background styles*/

</style>