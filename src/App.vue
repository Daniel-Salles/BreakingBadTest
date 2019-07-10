<template>
  <div id="app">
      <router-view name="header" />
      <div>
        <router-view />
      </div>
      <router-view name="footer" />
  <FlashMessage></FlashMessage>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>
<style>
</style>
