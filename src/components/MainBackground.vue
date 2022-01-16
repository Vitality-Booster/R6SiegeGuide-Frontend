<template>
  <div class="mainBackground" id="mainBackgroundId" :style="{backgroundImage: 'url(' + mainBackgroundPic + ')'}">
    <NavigationBar />
    <slot />
  </div>
</template>

<script>
// @ is an alias to /src
import { useStore } from 'vuex'
import {computed, ref} from "vue";
import NavigationBar from './NavigationBar'

export default {
  name: 'MainBackground',
  setup() {
    const store = useStore()
    const mainBackgroundPic = store.state.mainBackgroundPic
    const error = ref(null)

    // Getting reference to the image from firebase storage
    // It contains the data about the image, but it doesn't contain the image url that could be used on the website
    // const backgroundImage = storageRef(storage, 'website/background.jpg')
    // // This method gets the url of an image to which a reference "backgroundImage" refers to
    // getDownloadURL(backgroundImage)
    //     .then(res => {
    //       document.getElementById('mainBackgroundId').style.backgroundImage = "url(" + res + ")"
    //     })
    //     .catch(err => {
    //       alert(err.message)
    //     })

    const handleLogout = async () => {
      try {
        await store.dispatch('logout')
      } catch (err) {
        alert(err.message)
      }
    }

    return { store, error, handleLogout, mainBackgroundPic,
      authIsReady: computed(() => store.state.authIsReady),
      user: computed(() => store.state.user),
    }
  },
  components: {
    //HelloWorld,
    NavigationBar
  }

}
</script>

<style >

.mainBackground {
  background-position: center;
  object-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  min-width: 100vw;
}

</style>