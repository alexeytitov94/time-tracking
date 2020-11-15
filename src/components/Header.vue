<template>
  <div class="header">
    <div class="left">
      <button class="btn btn-outline">Мои проекты</button>
      <button class="btn btn-outline">Все проекты</button>
    </div>
    <div class="right">
      <button class="btn btn-outline">Аналитика</button>
      <button class="btn btn-outline">Настройка</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 45px;
    background: red;
}
</style>