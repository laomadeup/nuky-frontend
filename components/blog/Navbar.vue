<template>
  <b-navbar
    id="app-nav"
    class="mb-4"
    toggleable="md"
    type="dark"
    variant="info"
  >
    <b-navbar-brand>Kyun's Blog</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item
          v-for="(menu, index) in menus"
          :key="index"
          class="mr-2"
          :to="{ name: menu.routerName }"
          :exact="menu.exact"
        >
          {{ menu.name }}
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input
            v-model="keyword"
            size="sm"
            class="mr-sm-2"
            :state="searchInputState"
            placeholder="Search"
          ></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" @click="searchByKeyword">
            Search
          </b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      keyword: '',
      searchInputState: null,
      menus: [
        { routerName: 'index', name: 'Home', exact: true },
        { routerName: 'about', name: 'About Me', exact: false }
      ]
    }
  },
  methods: {
    searchByKeyword() {
      if (this.keyword == null || this.keyword === '') {
        this.searchInputState = false
      } else {
        this.$router.push({
          name: 'search-keyword',
          params: {
            keyword: this.keyword
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@mixin nuky-navbar($var) {
  padding-left: $var;
  padding-right: $var;
}

#app-nav .nav-link.nuxt-link-active {
  color: white;
  font-weight: 500;
}

#app-nav.navbar {
  @include nuky-navbar(350px);

  @media (max-width: 1700px) {
    @include nuky-navbar(200px);
  }

  @media (max-width: 1500px) {
    @include nuky-navbar(100px);
  }

  @media (max-width: 1200px) {
    @include nuky-navbar(20px);
  }
}
</style>
