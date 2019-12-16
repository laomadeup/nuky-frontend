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
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';

.flex-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  border-top: 1px solid $gray-300;

  & > section {
    line-height: 100%;
    height: 100%;
    color: $gray-700;
    margin-top: 5px;
    text-align: center;
    padding: 0 10px;

    &:not(:first-child) {
      border-left: 1px solid $gray-500;
    }
  }

  a {
    color: $gray-700;

    &:hover {
      text-decoration: none;
      color: $primary;
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
