import Vue from 'vue'
import App from "./App.vue";
import router from "./plugins/router";
import store from './store/store'
import './plugins/axios'
import "./assets/scss/my-app.scss";
import FlashMessage from '@smartweb/vue-flash-message';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faStar, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch)
library.add(faStar)
library.add(faTimes)


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(FlashMessage);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount("#app");