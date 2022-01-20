<template>
  <div
      :style="{backgroundColor: '#20123C', backgroundImage: 'url(' + loginBackgroundPic + ')',
       opacity: '100%', width: '100vw', height: '100vh', backgroundAttachment: 'fixed',
       backgroundPosition: 'center', objectPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}">
    <div id="loginBackground" class="pt-5">
      <div class="pt-5">
        <h1 style="text-align: center; color: wheat;">Login</h1>
        <div class="pt-1 text-center" style="text-align: center; padding-top: 1%;">
          <div class="container">
            <div class="col pr-4">
              <div class="input-group pt-4"
                   :style="{width: '25%', minWidth: '225px', margin: 'auto', color: 'white'}">
                <div class="input-group-text" :style="{background: 'transparent', border: 'transparent'}">
                  <BIconEnvelope aria-hidden="true"
                                 style="color: white; opacity: 70%; border: transparent;" />
                </div>
                <input :style="{borderRadius: '100px', opacity: '70%', border: 'transparent' }"
                       class="form-control" v-model="email" placeholder="Email" type="email">
              </div>
              <div class="input-group pt-4"
                   :style="{width: '25%', minWidth: '225px', margin: 'auto', color: 'white'}">
                <div class="input-group-text" :style="{border: 'none', background: 'transparent'}">
                  <BIconLock aria-hidden="true"
                             style="color: white; opacity: 70%; border: transparent;" />
                </div>
                <input :style="{borderRadius: '100px', opacity: '70%', border: 'transparent' }" class="form-control" v-model="password" placeholder="Password" type="password">
              </div>
            </div>
          </div>
          <BButton class="mt-4" type="button" @click="handleLogin"
                  :style="{borderRadius: '100px', width: '120px', backgroundColor: 'black', color: 'bisque'}">Log in</BButton>
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