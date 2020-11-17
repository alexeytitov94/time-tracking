<template>
  <div class="list-project">
    <div class="header">
      <div class="block block-1"></div>
      <div class="block block-2">
        Техподдержка
      </div>
      <div class="block block-2">
        Проект
      </div>
      <div class="block block-2">
        Коммуникация
      </div>
      <div class="block block-3"></div>
    </div>

    <div class="body">
      <div class="item">
        <div class="block block-1 title">
          <span> ГТС </span>
        </div>
        <div class="block block-2">
          <Time />
        </div>
        <div class="block block-2">
          <Time />
        </div>
        <div class="block block-2">
          <Time />
        </div>
        <div class="block block-3 analytics">
          <span class="icon-analytics"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Time from './Time.vue';

export default {
  name: 'ListProject',
  components: {
    Time,
  },
}
</script>

<style lang="scss" scoped>
.list-project {
  width: 100%;

  .header,
  .body .item {
    display: flex;
    flex-wrap: nowrap;

    .block {
      height: 100%;
      display: flex;
      align-items: center;

      &-1 {
        width: 30%;
      }

      &-2 {
        width: 20%;
      }

      &-3 {
        width: 10%;
      }
    }
  }

  .header {
    margin-bottom: 20px;
  }

  .body {
    .item {
      height: 50px;
      display: flex;
      align-items: center;
      background: #e9e9e92b;
      border-radius: 5px;
      padding: 5px 15px;
      margin-bottom: 10px;
    }

    .title {
      font-size: 18px;
      font-weight: 600;
      border-right: 1px solid #f8f8f8;
    }

    .analytics {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>
