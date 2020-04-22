<template>
  <div>
    <h3>dashboard page</h3>
  </div>
</template>

<script>
export default {
  layout: 'Admin',
  head() {
    return {
      title: 'dashboard',
      meta: [
        {
          hid: 'dashboard',
          name: 'dashboard',
          content: 'dashboard',
        },
      ],
    }
  },
}
</script>
