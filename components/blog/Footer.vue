<template>
  <footer class="flex-box mt-3 mb-3 pt-3">
    <section>
      <fa-icon :icon="['far', 'copyright']" />
      <span>2019</span>
      <span>Kyun's Blog</span>
    </section>
    <section>
      <fa-icon :icon="['far', 'envelope']" />
      <a href="mailto:admin@iamkyun.com">admin@iamkyun.com</a>
    </section>
    <section>
      <fa-icon :icon="['fab', 'github']" />
      <a tagert="_blank" href="https://github.com/iamkyun">iamKyun</a>
    </section>
    <section><span>粤ICP备15106619号</span></section>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
<style scoped lang="scss">
@import '~vuetify/src/styles/styles';

.flex-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  border-top: 1px solid map-get($grey, linghten-3);

  & > section {
    line-height: 100%;
    height: 100%;
    color: map-get($grey, darken-3);
    margin-top: 5px;
    text-align: center;
    padding: 0 10px;

    &:not(:first-child) {
      border-left: 1px solid map-get($grey, darken-1);
    }
  }

  a {
    color: map-get($grey, darken-3);

    &:hover {
      text-decoration: none;
      color: var(--v-primary-base);
    }
  }
}

@media (max-width: 768px) {
  .flex-box > section {
    flex: 0 0 100%;

    & > section:nth-child(even) {
      border-left: none;
    }
  }
}
</style>
