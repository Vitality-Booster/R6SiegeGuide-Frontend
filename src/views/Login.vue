<template v-if="showLogin">
  <div id="logoBackground" class="Background" :style="{backgroundColor: '#20123C', backgroundImage: 'url(' + loginBackgroundPic + ')'}">
    <div id="loginBackground" class="pt-5">
      <div class="pt-5">
        <h1 id="header">Login</h1>
        <div class="pt-1 text-center" id="loginInputField">
          <div class="container">
            <div class="col pe-4">
              <div class="input-group inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
                <div class="input-group-text" :style="{background: 'transparent', border: 'transparent'}">
                  <BIconEnvelope class="inputBoxIcon" aria-hidden="true" />
                </div>
                <input :style="{borderRadius: '100px', margin: 'auto', alignSelf: 'center', opacity: '70%', border: 'transparent' }"
                       class="form-control" v-model="email" placeholder="Email" type="email">
              </div>
              <div class="input-group inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
                <div class="input-group-text" :style="{border: 'none', background: 'transparent'}">
                  <BIconLock class="inputBoxIcon" aria-hidden="true" />
                </div>
                <input :style="{borderRadius: '100px' }" class="form-control UserInfoButton" v-model="password" placeholder="Password" type="password">
              </div>
            </div>
          </div>
          <button class="btn" type="button" id="loginButton" @click="handleLogin" :style="{borderRadius: '100px', width: '120px'}">Log in</button>
        </div>
        <LoginRegisterLinks />
      </div>
    </div>
  </div>
</template>

<script>
import LoginRegisterLinks from "@/components/LoginRegisterLinks"
import {ref} from "vue";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {storage} from "../firebase/config";
import {ref as storageRef, getDownloadURL} from "firebase/storage";

export default {
  name: 'Login',
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const store = useStore();
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

    const handleLogin = async () => {
      try {
        await store.dispatch('login', {
          email: email.value,
          password: password.value
        })
        await router.push('/')
      } catch(err) {
        alert(err.message)
      }
    }

    return {email, password, handleLogin, error, store, loginBackgroundPic}
  },
  components: {
    LoginRegisterLinks,
  },
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

#loginBackground {
  background-color: #4f450642;
  min-height: 100vh;
  min-width: 100vw;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#logoBackground {
  /*background-image: url("../assets/loginPicture.jpg");*/
  min-height: 100vh;
  min-width: 100vw;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/*End of background styles*/

</style>