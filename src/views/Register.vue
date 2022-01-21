<template>
  <div>
    <Spinner v-if="loadingComponents < 1"></Spinner>
  <div v-show="loadingComponents >= 1"
       :style="{backgroundColor: '#20123C', backgroundImage: 'url(' + loginBackgroundPic + ')',
       opacity: '100%', width: '100vw', height: '100vh', backgroundAttachment: 'fixed',
       backgroundPosition: 'center', objectPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}">
    <div class="pt-5" style="background-color: #4f450642; width: 100vw; height: 100vh;">
      <div class="pt-5">
        <h1 class="ml-3" style="text-align: center; color: wheat;">Register</h1>
        <div class="form pt-1 text-center" style="text-align: center; padding-top: 1%;">
          <div class="container" >
            <div class="col pe-4">
            <div class="input-group pt-4"
                 :style="{width: '25%', minWidth: '225px', margin: 'auto', color: 'white'}">
              <div class="input-group-text" :style="{background: 'transparent', border: 'transparent'}">
                <BIconFileEarmarkPerson style="opacity: 70%; border: transparent; color: white;"
                                         aria-hidden="true" />
              </div>
              <input class="form-control" :style="{borderRadius: '100px', opacity: '70%', border: 'transparent' }" v-model="fullName" placeholder="Full name" type="text">
            </div>
            <div class="input-group pt-4"
                 :style="{width: '25%', minWidth: '225px', margin: 'auto', color: 'white'}">
              <div class="input-group-text" :style="{border: 'none', background: 'transparent'}">
                <BIconPerson icon="person" style="opacity: 70%; border: transparent; color: white;" aria-hidden="true" :style="{opacity: '100%'}"></BIconPerson>
              </div>
              <input :style="{borderRadius: '100px', opacity: '70%', border: 'transparent' }" class="form-control" v-model="username" placeholder="Username" type="text">
            </div>
            <b-input-group class="pt-4"
                           :style="{width: '25%', minWidth: '225px', margin: 'auto', color: 'white'}">
              <b-input-group-text is-text :style="{border: 'none', background: 'transparent'}">
                <b-icon icon="envelope" style="opacity: 70%; border: transparent; color: white;" aria-hidden="true"></b-icon>
              </b-input-group-text>
              <b-form-input :style="{borderRadius: '100px', opacity: '70%', border: 'transparent' }" v-model="email" placeholder="Email" type="email"></b-form-input>
            </b-input-group>
            <b-input-group class="pt-4"
                           :style="{width: '25%', minWidth: '225px', margin: 'auto', color: 'white'}">
              <b-input-group-text is-text :style="{border: 'none', background: 'transparent'}">
                <b-icon icon="lock" style="opacity: 70%; border: transparent; color: white;" aria-hidden="true"></b-icon>
              </b-input-group-text>
              <b-form-input :style="{borderRadius: '100px', opacity: '70%', border: 'transparent' }" v-model="password" placeholder="Password" type="password"></b-form-input>
            </b-input-group>
            <b-input-group class="pt-4"
                           :style="{width: '25%', minWidth: '225px', margin: 'auto', color: 'white'}">
              <b-input-group-text is-text :style="{border: 'none', background: 'transparent'}">
                <b-icon icon="lock" style="opacity: 70%; border: transparent; color: white;" aria-hidden="true"></b-icon>
              </b-input-group-text>
              <b-form-input :style="{borderRadius: '100px', opacity: '70%', border: 'transparent' }" v-model="repeatPassword" placeholder="Repeat password" type="password"></b-form-input>
            </b-input-group>
            </div>
          </div>
          <b-button class="mt-4 ml-3" @click="registerUser"
                    :style="{borderRadius: '100px', width: '120px',
                    backgroundColor: 'black', color: 'bisque'}">Register</b-button>
        </div>
        <LoginRegisterLinks class="ml-3" :is-register="true"/>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import LoginRegisterLinks from "@/components/LoginRegisterLinks";
import {computed, ref} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {storage} from "../firebase/config";
import {ref as storageRef, getDownloadURL} from "firebase/storage";
import Spinner from "../components/Spinner";

export default {
  name: "Register",
  components: {
    Spinner,
    LoginRegisterLinks
  },
  setup () {
    const store = useStore()
    store.commit('resetLoadingComponents')
    const loadingComponents = computed(() => store.state.loadingComponents)
    const router = useRouter()
    const fullName = ref('')
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const repeatPassword = ref('')
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
          .finally(() => {
            store.commit('addLoadingComponent', 1);
          })
    }
    else {
      loginBackgroundPic.value = store.state.loginBackgroundPic
      store.commit('addLoadingComponent', 1);
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
      loginBackgroundPic,
      loadingComponents
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>