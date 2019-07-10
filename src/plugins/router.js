import Vue from "vue";
import Router from "vue-router";
import Navbar from "../components/Navbar.vue"
import Persons from "../components/Persons.vue"
import Episodes from "../components/Episodes.vue"
import Contact from "../components/Contact.vue"

Vue.use(Router);

export default new Router({
    routes: [{
        path: "/",
        name: "persons",
        components: { header: Navbar, default: Persons }
    }, {
        path: "/episodes",
        name: "episodes",
        components: { header: Navbar, default: Episodes }
    }, {
        path: "/suggestions",
        name: "suggestions",
        components: { header: Navbar, default: Contact }
    }],
    scrollBehavior: to => {
        if (to.hash) {
            return { selector: to.hash };
        } else {
            return { x: 0, y: 0 };
        }
    }
});