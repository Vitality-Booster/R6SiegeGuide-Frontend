import { createStore } from 'vuex'

// firebase imports

import {auth, storage} from '../firebase/config'
import {
    //createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithCustomToken
} from 'firebase/auth'

import axios from 'axios';
import {ref as storageRef, getDownloadURL, list} from "firebase/storage";
import jwtDecode from "jwt-decode";

const store = createStore({
    state: {
        user: null,
        authIsReady: false,
        successfulCheck: false,
        response: null,
        mainBackgroundPic: null,
        logoPic: null,
        loginBackgroundPic: null,
        picturesWereLoaded: false
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
            console.log('user state changed', state.user)
        },
        setAuthIsReady(state, payload) {
            state.authIsReady = payload
        },
        loadWebsitePictures(state) {
            console.log("The state of 'picturesWereLoaded' is: " + state.picturesWereLoaded)
            if (!state.picturesWereLoaded) {
                console.log("loading for pictures began working")
                const websitePicturesRef = storageRef(storage, "website")
                list(websitePicturesRef)
                    .then(res => {
                        res.items.forEach(pic => {
                            getDownloadURL(pic)
                                .then(url => {
                                    console.log("That's the url: " + url)
                                    switch (pic.name) {
                                        case "background.jpg":
                                            state.mainBackgroundPic = url
                                            break
                                        case "logo.png":
                                            state.logoPic = url
                                            break
                                        case "loginPicture.jpg":
                                            state.loginBackgroundPic = url
                                            console.log("(in switch) login background picture equals to: " + state.loginBackgroundPic)
                                            break
                                    }
                                })
                        })
                    })
                    .then(() => {
                        console.log("main background picture equals to: " + state.mainBackgroundPic)
                        console.log("login background picture equals to: " + state.loginBackgroundPic)
                        console.log("logo picture equals to: " + state.logoPic)
                    })
                    .catch(err => {
                        alert(err.message)
                    })
                console.log("main background picture equals to: " + state.mainBackgroundPic)
                console.log("login background picture equals to: " + state.loginBackgroundPic)
                console.log("logo picture equals to: " + state.logoPic)
                state.picturesWereLoaded = true;
            }
        },

    },
    actions: {
        async register(context, { email, password, username, fullName}) {

           // const response = await createUserWithEmailAndPassword(auth, email, password)
       await axios.post(process.env.VUE_APP_BASE_URL + `users/register`,
               {
                   // i don't pass password as it is already stored in Firebase
                   fullName: fullName,
                   email: email,
                   username: username,
                   password: password
               })
           .then(resp => {
               context.dispatch('signWithCustomToken', resp.data.token)
           })
           .catch(err => {
               alert(err.message)
           })
        },
        async login(context, { email, password}) {
            // await context.dispatch('checkToken')

            await signInWithEmailAndPassword(auth, email, password)
                .then(async () => {
                    await axios.post(process.env.VUE_APP_BASE_URL + "users/login",
                        {
                            email: email
                        })
                        .then(res => {
                            context.dispatch('signWithCustomToken', res.data.token)
                        })
                })
                .catch(err => {
                    alert(err.message)
                })
        },
        async logout(context) {
            console.log("logout action")

            await signOut(auth)
            context.commit('setUser', null)
        },
        async checkToken(context) {
            auth.currentUser.getIdToken(true)
                .then( async idToken => {
                    await axios.post(process.env.VUE_APP_BASE_URL + "users/verify-token", {
                        idToken: idToken
                    })
                        .then(() => {
                            context.state.successfulCheck = true;
                        })
                        .catch(er => {
                            alert(er.message)
                        })
                })
                .catch(er => {
                    alert(er.message)
                })
        },
        async signWithCustomToken(context, token) {
            signInWithCustomToken(auth, token)
                .then((userCredential) => {
                    // Signed in
                    context.commit('setUser', userCredential.user)
                    console.log("Additional info: " + userCredential.additionalUserInfo)
                    console.log("Additional info: " + userCredential.user)
                    // if (userCredential.user.admin) {
                    //
                    // }
                    // ...
                })
                .catch((er) => {
                    alert(er.message)
                });
        },
        async checkIfAdmin() {
            let admin;
            await auth.currentUser.getIdToken()
                .then(async res => {
                    const decoded = jwtDecode(res);
                    admin = await decoded.admin;
                    console.log("This is admin var type: " + admin.type)
                    console.log("This is admin var to String: " + admin.toString())
                })
            console.log("Final admin var equals to: " + admin)
            return admin
        }
    }
})

const unsub = onAuthStateChanged(auth, (user) => {
    store.commit('setAuthIsReady', true)
    if (auth.currentUser) {
        store.dispatch('checkToken')
            .then(() => {
                store.commit('setUser', user)
            })
            .catch((er) => {
                alert(er.message)
            })
    }
    unsub()
})

//export defaults
export default store