import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub, faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import {
  faCalendarAlt,
  faCommentDots,
  faFireAlt,
  faCaretDown,
  faCaretUp,
  faTags,
  faFolder,
  faFolderOpen,
  faStar,
  faBookOpen,
  faHeart,
  faHeartBroken,
  faFeatherAlt,
  faPaperPlane,
  faUserSecret
} from '@fortawesome/free-solid-svg-icons'
import {
  faClock,
  faCopyright,
  faEnvelope
} from '@fortawesome/free-regular-svg-icons'

library.add(
  faGithubSquare,
  faGithub,
  faClock,
  faCommentDots,
  faCopyright,
  faEnvelope,
  faCalendarAlt,
  faFireAlt,
  faCaretDown,
  faCaretUp,
  faTags,
  faFolder,
  faFolderOpen,
  faBookOpen,
  faStar,
  faHeart,
  faHeartBroken,
  faFeatherAlt,
  faPaperPlane,
  faUserSecret
)
config.autoAddCss = false
Vue.component('fa-icon', FontAwesomeIcon)
