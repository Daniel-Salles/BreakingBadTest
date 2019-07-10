import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        search_on: false,
        search_text: null,
        page_persons: [],
        page_episodes: []
    }
})