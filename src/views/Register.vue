<template>
  <div id="logoBackground" class="Background" :style="{backgroundColor: '#20123C', backgroundImage: 'url(' + loginBackgroundPic + ')'}">
    <div  class="registerBackground pt-5">
      <div class="pt-5">
        <h1 id="header">Register</h1>
        <div class="form pt-1 text-center" id="loginInputField">
          <div class="container" >
            <div class="col pe-4">
            <div class="input-group inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
              <div class="input-group-text" :style="{background: 'transparent', border: 'transparent'}">
<!--                <b-icon-file-earmark-person class="inputBoxIcon" aria-hidden="true"></b-icon-file-earmark-person>-->
                <BIconFileEarmarkPerson class="inputBoxIcon" aria-hidden="true" />
              </div>
              <input class="form-control UserInfoButton" :style="{borderRadius: '100px', margin: 'auto', alignSelf: 'center' }" v-model="fullName" placeholder="Full name" type="text">
            </div>
            <div class="input-group inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
              <div class="input-group-text" :style="{border: 'none', background: 'transparent'}">
                <BIconPerson icon="person" class="inputBoxIcon" aria-hidden="true" :style="{opacity: '100%'}"></BIconPerson>
              </div>
              <input :style="{borderRadius: '100px' }" class="form-control UserInfoButton" v-model="username" placeholder="Username" type="text">
            </div>
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
            </div>
          </div>
          <br>
          <b-button id="loginButton" @click="registerUser" :style="{borderRadius: '100px', width: '120px'}">Register</b-button>
        </div>
        <LoginRegisterLinks :is-register="true">

        </LoginRegisterLinks>
      </div>
    </div>
  </div>
</template>

<script>
import LoginRegisterLinks from "@/components/LoginRegisterLinks";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {storage} from "../firebase/config";
import {ref as storageRef, getDownloadURL} from "firebase/storage";

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

    const loginBackgroundPic = ref('')

    if (store.state.loginBackgroundPic == null) {
      const picRef = storageRef(storage, "website/loginPicture.jpg")
      getDownloadURL(picRef)
          .then(res => {
            loginBackgroundPic.value = res
            store.commit('setLoginBackgroundPic', res)
          })
          .catch(er => {
            alert(er.message)
          })
    }
    else {
      loginBackgroundPic.value = store.state.loginBackgroundPic
    }

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