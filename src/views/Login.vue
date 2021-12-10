<template v-if="showLogin">
  <div id="logoBackground" class="Background" style="background-color: #20123C">
    <div id="mainBackground">
      <div v-if="error">
        {{error}}
      </div>
      <div class="pt-5">
        <h1 id="header">Login</h1>
<!--        <BCol>-->
<!--          <BRow>-->
<!--            <BButton>Some button</BButton>-->
<!--          </BRow>-->
<!--        </BCol>-->
        <div class="pt-1 text-center" id="loginInputField">
<!--          <BContainer id="loginContainer">-->
          <BContainer class="">
            <BCol class="pe-4">
              <BInputGroup class="inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
                <BInputGroupText is-text :style="{background: 'transparent', border: 'transparent'}">
                  <b-icon icon="envelope" class="inputBoxIcon" aria-hidden="true" />
                </BInputGroupText>
                <BFormInput :style="{borderRadius: '100px', margin: 'auto', alignSelf: 'center' }" class="UserInfoButton" v-model="email" placeholder="Email" type="email"></BFormInput>
              </BInputGroup>
              <BInputGroup class="inputBox" :style="{width: '25%', minWidth: '225px', margin: 'auto'}">
                <BInputGroupText is-text :style="{border: 'none', background: 'transparent'}">
                  <b-icon icon="lock" class="inputBoxIcon" aria-hidden="true" />
                </BInputGroupText>
                <BFormInput :style="{borderRadius: '100px' }" class="UserInfoButton" v-model="password" placeholder="Password" type="password"></BFormInput>
              </BInputGroup>
            </BCol>
          </BContainer>
          <BButton id="loginButton" @click="handleLogin" :style="{borderRadius: '100px', width: '120px'}">Log in</BButton>
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

export default {
  name: 'Login',
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const store = useStore()
    const router = useRouter()

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

    return {email, password, handleLogin, error, store}
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

#loginContainer {
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
  /*height: 100%;*/
  /*width: 100%;*/
  min-height: 100vh;
  min-width: 100vw;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#logoBackground {
  background-image: url("../assets/loginPicture.jpg");

  /*opacity: 50%;*/
  /*height: 100%;*/
  /*width: 100%;*/
  min-height: 100vh;
  min-width: 100vw;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#mainContext {
  padding-top: 9%;
}

/*End of background styles*/

</style>