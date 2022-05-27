
import Vue from "vue";
const bus=new Vue();

export default bus;
export let state =Vue.observable( {
    name: '张三',
    age: 38
})
export let mutations = {
    changeName(name) {
        state.name = name
    },
    setAge(age) {
        state.age = age
    }
}
