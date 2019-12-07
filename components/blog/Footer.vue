<template>
  <footer class="flex-box mt-3 mb-3 pt-3">
    <section>
      <fa-icon :icon="['far', 'copyright']" />
      <span>2019</span>
      <span>Kyun's Blog</span>
    </section>
    <section>
      <fa-icon class="text-warning" :icon="['far', 'envelope']" />
      <a href="mailto:admin@iamkyun.com">admin@iamkyun.com</a>
    </section>
    <section>
      <fa-icon class="text-secondary" :icon="['fab', 'github']" />
      <a tagert="_blank" href="https://github.com/iamkyun">iamKyun</a>
    </section>
    <section>粤ICP备15106619号</section>
    <div id="bottomMark"></div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
<style scoped lang="scss">
@import '~assets/style/common/public';

.flex-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  border-top: 1px solid $gray-300;
}

.flex-box > section {
  margin-top: 5px;
  text-align: center;
  padding: 0 10px;
}

.flex-box > section:not(:first-child) {
  border-left: 1px solid $gray-300;
}

@media (max-width: 768px) {
  .flex-box > section {
    flex: 0 0 100%;
  }

  .flex-box > section:nth-child(even) {
    border-left: none;
  }
}
</style>
