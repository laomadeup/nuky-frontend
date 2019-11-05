import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub, faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'

library.add(faGithubSquare, faGithub, faClock, faCommentDots)

Vue.component('fa-icon', FontAwesomeIcon)
