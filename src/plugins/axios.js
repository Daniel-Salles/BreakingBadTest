import Vue from 'vue'
import axios from 'axios'
Vue.use({
    install(Vue) {
        Vue.prototype.$brba = axios.create({
            baseURL: 'https://www.breakingbadapi.com/api/',
            headers: {
                //"Authorization": ""
            }
        })
        Vue.prototype.$brba.interceptors.request.use(config => {
            return config
        }, error => Promise.reject(error))
        Vue.prototype.$brba.interceptors.response.use(res => {
            return res
        }, error => Promise.reject(error))
        Vue.prototype.$sambatech = axios.create({
            baseURL: 'https://frontendtestesamba.free.beeceptor.com/'
        });
    }
})