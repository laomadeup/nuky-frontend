<template>
  <b-navbar
    id="app-nav"
    toggleable="md"
    type="dark"
    variant="info"
    class="mb-4"
  >
    <b-navbar-brand :to="{ name: 'index' }">Kyun's Blog</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item
          v-for="(menu, index) in menus"
          :key="index"
          class="mr-2"
          :to="{ name: menu.routerName }"
        >
          {{ menu.name }}
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="Search"
          ></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">
            Search
          </b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'HeaderNav',
  data() {
    return {
      menus: [
        { routerName: 'articles', name: 'Articles' },
        { routerName: 'photos', name: 'Photos' },
        { routerName: 'about', name: 'About Me' }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
.navbar
  padding-left 350px
  padding-right 350px

#app-nav .nav-link.nuxt-link-active
  color #ffffff
  font-weight 500

@media (max-width: 1700px)
  .navbar
    padding-left 200px
    padding-right 200px

@media (max-width: 1500px)
  .navbar
    padding-left 150px
    padding-right 150px

@media (max-width: 1500px)
  .navbar
    padding-left 50px
    padding-right 50px

@media (max-width: 1200px)
  .navbar
    padding-left 20px
    padding-right 20px
</style>
