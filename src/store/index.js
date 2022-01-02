import { createStore } from 'vuex'

// firebase imports

import { auth } from '../firebase/config'
import {
    //createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithCustomToken
} from 'firebase/auth'

import axios from 'axios';

const store = createStore({
    state: {
        user: null,
        authIsReady: false,
        successfulCheck: false,
        response: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
            console.log('user state changed', state.user)
        },
        setAuthIsReady(state, payload) {
            state.authIsReady = payload
        }
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

            const response = await signInWithEmailAndPassword(auth, email, password)
            if (response) {
                //const user = response.user
                console.log(response)
                await axios.post(process.env.VUE_APP_BASE_URL + "users/getToken",
                    {
                        email: email,
                        password: password
                    })
                    .then(res => {
                        console.log("This is token that im passing: " + res.data.token)
                        context.dispatch('signWithCustomToken', res.data.token)
                    })
                    .catch(er => {
                        alert(er)
                    })
            }

            //     await axios.post(process.env.VUE_APP_BASE_URL + "users/login",
            //         {
            //             email: email,
            //         })
            //         .then(res => {
            //             user.username = res.username;
            //             user.admin = res.admin
            //         })
            //     context.commit('setUser', user)
            // } else {
            //     throw new Error("Could not complete signup")
            // }
        },
        async logout(context) {
            console.log("logout action")

            await signOut(auth)
            context.commit('setUser', null)
        },
        async checkToken(context) {
            auth.currentUser.getIdToken(true)
                .then( async idToken => {
                    await axios.post(process.env.VUE_APP_BASE_URL + "users/verifyToken", {
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
        }
    }
})

const unsub = onAuthStateChanged(auth, (user) => {
    store.commit('setAuthIsReady', true)
    store.dispatch('checkToken')
        .then(() => {
            store.commit('setUser', user)
        })
        .catch((er) => {
            alert(er.message)
        })

    unsub()
})

//export defaults
export default store