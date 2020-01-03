<template>
  <div>
    <h3>home page</h3>
  </div>
</template>

<script>
export default {
  layout: 'Admin',
  head() {
    return {
      title: 'home',
      meta: [
        {
          hid: 'home',
          name: 'home',
          content: 'home'
        }
      ]
    }
  }
}
</script>
