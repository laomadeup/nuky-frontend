<template>
  <div>
    <b-carousel controls indicators img-width="1920" img-height="500">
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="https://picsum.photos/1920/500/?image=52"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1920/500/?image=54">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide
        img-src="https://picsum.photos/1920/500/?image=58"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  layout: 'blog',
  data() {
    return {}
  }
}
</script>

<style lang="stylus"></style>
