import {mount} from "@vue/test-utils";
import Operators from "../../src/views/Operators";
import {createStore} from "vuex";
import OperatorBox from "../../src/components/OperatorBox";

describe('test for Operators component', function () {
    it('should not show OperatorBox element', function () {
        const store = createStore({
            state: {
                admin: false
            }
        })

        const wrapper = mount(Operators, {
            global: {
                provide: {
                    store: store
                }
            }
        })

        expect(wrapper.findComponent(OperatorBox).exists()).toBe(false)
    });
    it('should show OperatorBox element', function () {
        const store = createStore({
            state: {
                admin: true
            }
        })

        const wrapper = mount(Operators, {
            global: {
                provide: {
                    store: store
                }
            }
        })

        expect(wrapper.findComponent(OperatorBox).exists()).toBe(true)
    });

});