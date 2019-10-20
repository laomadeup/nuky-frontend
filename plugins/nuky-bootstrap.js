import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub, faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { faCalendarAlt, faCommentDots } from '@fortawesome/free-solid-svg-icons'

library.add(faGithubSquare, faGithub, faCalendarAlt, faCommentDots)

Vue.component('fa-icon', FontAwesomeIcon)
