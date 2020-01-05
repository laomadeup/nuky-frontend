<template>
  <header>
    <v-sheet tile color="grey lighten-3">
      <section class="app-banner ma-auto grey--text text--darken-1">
        <h3
          class="font-weight-medium banner-title px-5 px-sm-10 px-md-10 px-lg-0"
        >
          <nuxt-link
            class="banner-title-text"
            tag="span"
            :to="{ name: 'index' }"
          >
            Kyun's Blog
          </nuxt-link>
        </h3>
      </section>
    </v-sheet>
  </header>
</template>

<script>
export default { name: 'Banner' }
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/main';

.app-banner {
  max-width: 1200px;
}

/* xs */
.banner-title {
  height: 3rem;
  line-height: 3rem;

  .banner-title-text {
    cursor: pointer;
    font-size: 1rem;
  }
}

@media #{map-get($display-breakpoints, 'sm-and-up')} {
  .banner-title {
    height: 3rem;
    line-height: 3rem;

    .banner-title-text {
      font-size: 1.2rem;
    }
  }
}

@media #{map-get($display-breakpoints, 'md-and-up')} {
  .banner-title {
    height: 4rem;
    line-height: 4rem;

    .banner-title-text {
      font-size: 1.4rem;
    }
  }
}

@media #{map-get($display-breakpoints, 'lg-and-up')} {
  .banner-title {
    height: 6rem;
    line-height: 6rem;

    .banner-title-text {
      font-size: 1.8rem;
    }
  }
}

@media #{map-get($display-breakpoints, 'xl-only')} {
  .banner-title {
    height: 8rem;
    line-height: 8rem;

    .banner-title-text {
      font-size: 2.2rem;
    }
  }
}
</style>
