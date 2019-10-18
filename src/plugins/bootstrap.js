import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub, faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faGithubSquare, faGithub, faCalendarAlt)

Vue.use(BootstrapVue)
Vue.component('fa-icon', FontAwesomeIcon)
