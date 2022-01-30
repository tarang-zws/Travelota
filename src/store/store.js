import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state:{
        adults:2,
        childrens:0,
        selectedItem:'',
        rating:'',
    },
    mutations: {
        changedCity(state, selectedItem)
        {
            state.selectedItem = selectedItem

        },
        changed(state, adults)
        {
            state.adults = adults

        },
        changedChildren(state, childrens)
        {
            state.childrens = childrens

        },
        resultFilter(state, rating)
        {
            console.log("here in mutation");
            state.rating = rating

        }
    },
    getters: {
        city: state => state.selectedItem,
        flavor: state => state.adults,
        childrens: state => state.childrens,
        rating: state => state.rating
    }
})

