import {mount} from "@vue/test-utils";
import NavigationBar from "../../src/components/NavigationBar";
import {createStore} from "vuex";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../src/firebase/config";

const store = createStore({
    state: {
        user: null,
        logoPic: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setLogoPic(state, payload) {
            state.logoPic = payload
        }
    },
    actions: {
        async login(context, {email, password}) {
            await signInWithEmailAndPassword(auth, email, password)
                .then(async () => {
                    context.commit('setUser', auth.currentUser)
                })
                .catch(err => {
                    alert(err.message)
                })
        },
    }
})

describe('testing Navigation bar', function () {
    it('should show Login text', function () {
        const wrapper = mount(NavigationBar, {
            global: {
                provide: {
                    store: store
                },
            },
        });

        const login = wrapper.find('[data-test="login"]')

        expect(wrapper.find('[data-test="logout"]').exists()).toBe(false)
        expect(wrapper.find('[data-test="userIcon"]').exists()).toBe(false)
        expect(login.exists()).toBe(true)
    });
    it('should show Logo picture', function () {
        // the test fails because the method that gets the picture in the setup is completed after the component is mounted

        const wrapper = mount(NavigationBar, {
            global: {
                provide: {
                    store: store
                },
            },
        });

        expect(wrapper.find("img").exists()).toBe(true)
    });
    it('should show Logout text and User icon', async () => {

        const wrapper = mount(NavigationBar, {
            global: {
                provide: {
                    store: store
                },
            },
        });

        await store.dispatch('login', {email: "admin@gmail.com", password: "password"})

        expect(wrapper.find('[data-test="logout"]').exists()).toBe(true)
        expect(wrapper.find('[data-test="userIcon"]').exists()).toBe(true)
        expect(wrapper.find('[data-test="login"]').exists()).toBe(false)
    });
});