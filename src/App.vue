<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <img class="w-25 mt-5" src="./assets/logo.svg" />
  </div>
  <router-view></router-view>
</template>

<script>
export default ({
  name: 'App'
});
</script>