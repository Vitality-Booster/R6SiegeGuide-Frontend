import { createStore } from 'vuex'

// firebase imports

import { auth } from '../firebase/config'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import axios from 'axios';

const store = createStore({
    state: {
        user: null,
        authIsReady: false
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
            const response = await createUserWithEmailAndPassword(auth, email, password)
           if (response) {
               await axios.post(process.env.VUE_APP_BASE_URL + `users/register`,
                   {
                       // i don't pass password as it is already stored in Firebase
                       fullName: fullName,
                       email: email,
                       username: username
                   })
               const user = response.user
               user.admin = false
               user.username = username
               context.commit('setUser', user)
           } else {
               throw new Error("Could not complete signup")
           }
        },
        async login(context, { email, password}) {
           console.log("login action")

            const response = await signInWithEmailAndPassword(auth, email, password)
            if (response) {
                const user = response.user
                await axios.post(process.env.VUE_APP_BASE_URL + "users/login",
                    {
                        email: email,
                    })
                    .then(res => {
                        user.username = res.username;
                        user.admin = res.admin
                    })
                context.commit('setUser', user)
            } else {
                throw new Error("Could not complete signup")
            }
        },
        async logout(context) {
            console.log("logout action")

            await signOut(auth)
            context.commit('setUser', null)
        }

    }
})

const unsub = onAuthStateChanged(auth, (user) => {
    store.commit('setAuthIsReady', true)
    store.commit('setUser', user)
    unsub()
})

//export defaults
export default store