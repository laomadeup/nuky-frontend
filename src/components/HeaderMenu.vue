<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-brand href="#">Kyun's Blog</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-for="(menu, index) in menus" :to="menu.path" :key="index" :active="menu.active"
                    @click="activeMenu(index)">
          {{menu.name}}
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
const menus = [
  { path: '/', name: 'Home', active: false },
  { path: '/articles', name: 'Articles', active: false },
  { path: '/github', name: 'Github', active: false },
  { path: '/about', name: 'About Me', active: false }]

export default {
  name: 'HeaderMenu',
  data: function () {
    return {
      menus: menus
    }
  },
  methods: {
    activeMenu: function (index) {
      for (let menu of this.$data.menus) {
        menu.active = false
      }
      this.$data.menus[index].active = true
    }
  },
  mounted: function () {
    for (let menu of this.$data.menus) {
      if (menu.path === this.$route.path) {
        menu.active = true
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.navbar
  margin-bottom 20px

@media (max-width: 1920px)
  .navbar
    padding-left 200px
    padding-right 200px

@media (max-width: 1500px)
  .navbar
    padding-left 100px
    padding-right 100px

@media (max-width: 1200px)
  .navbar
    padding-left 20px
    padding-right 20px

</style>
