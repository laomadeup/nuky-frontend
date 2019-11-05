<template>
  <footer>
    <div class="wrap">
      <div class="foot-center">
        <span &nbsp;class="foot-info">
          <fa-icon :icon="['far', 'copyright']" />
          <span class="foot-year">2019</span>
          <span class="foot-title">Kyun's Blog</span>
        </span>
        <span class="foot-border"></span>
        <span class="foot-contact">
          <fa-icon class="text-warning" :icon="['far', 'envelope']" />
          <a href="mailto:admin@iamkyun.com">admin@iamkyun.com</a>
        </span>
        <span class="foot-border"></span>
        <span class="foot-contact">
          <fa-icon class="text-secondary" :icon="['fab', 'github']" />
          <a tagert="_blank" href="https://github.com/iamkyun">iamKyun</a>
        </span>
        <span class="foot-border"></span>
        <span class="foot-number">粤ICP备15106619号</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="stylus">
.foot-center
  margin 20px auto;
  width 645px;

.foot-border
  border-right 1px solid #666666;
  margin 0 8px;

.foot-year
  font-weight 700;
  height 20px;
  line-height 20px;


.foot-title
  font-weight 700;
  font-style italic;
  height 20px;
  line-height 20px;

.foot-contact a:hover
  color #008ec2;

.foot-number
  color #666666;
</style>
