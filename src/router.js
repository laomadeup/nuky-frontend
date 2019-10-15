import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import About from './views/About'
import Articles from './views/Articles'
import Github from './views/Github'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles
    },
    {
      path: '/github',
      name: 'github',
      component: Github
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
