import { createStore } from 'vuex'

// firebase imports

import {auth} from '../firebase/config'
import {
    //createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithCustomToken
} from 'firebase/auth'

import axios from 'axios';
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
        picturesWereLoaded: false,
        admin: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setAuthIsReady(state, payload) {
            state.authIsReady = payload
        },
        setMainBackgroundPic(state, payload) {
            state.mainBackgroundPic = payload
        },
        setLoginBackgroundPic(state, payload) {
            state.loginBackgroundPic = payload
        },
        setLogoPic(state, payload) {
            state.logoPic = payload
        },
        setAdmin(state, payload) {
            state.admin = payload
        }
    },
    actions: {
        async register(context, {email, password, username, fullName}) {

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
        async login(context, {email, password}) {
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

            await signOut(auth)
            context.commit('setUser', null)
        },
        async checkToken(context) {
            auth.currentUser.getIdToken(true)
                .then(async idToken => {
                    await axios.post(process.env.VUE_APP_BASE_URL + "users/verify-token", {
                        idToken: idToken
                    })
                        .then(async res => {
                            await context.dispatch('signWithCustomToken', res.data.token)
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
                    context.commit('setUser', userCredential.user)
                })
                .catch((er) => {
                    alert(er.message)
                });
        },
        async checkIfAdmin(context) {
            const interval = setInterval(async () => {
                if (auth.currentUser) {
                    let admin;
                    await auth.currentUser.getIdToken()
                        .then(async res => {
                            const decoded = jwtDecode(res);
                            admin = decoded.admin;
                            context.commit('setAdmin', admin);
                            clearInterval(interval)
                        })
                    return admin
                }
            }, 1000)
        }
    }
})

const unsub = onAuthStateChanged(auth, (user) => {
    store.commit('setAuthIsReady', true)
    if (auth.currentUser) {
        store.dispatch('checkToken')
            .then(() => {
                store.commit('setUser', user)
                store.dispatch('checkIfAdmin')
            })
            .catch((er) => {
                alert(er.message)
            })
    }
    unsub()
})

//export defaults
export default store