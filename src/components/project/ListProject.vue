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
      <div class="item" v-for="(item, index) in listProject" :key="index">
        <div class="block block-1 title">
          <span>{{ item.title }}</span>
        </div>
        <div class="block block-2">
          <Time :time="item.techsupport" :project="item" field="techsupport" />
        </div>
        <div class="block block-2">
          <Time :time="item.project" :project="item" field="project" />
        </div>
        <div class="block block-2">
          <Time :time="item.communication" :project="item" field="communication" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Time from './Time.vue';

export default {
  name: 'ListProject',
  components: {
    Time,
  },
  computed: {
    ...mapState('projects', ['type', 'projects', 'projectUsers']),
    listProject() {
      if (this.projects) {
        if (this.type == 'me') { 
          return this.projects.filter(item => item.active)
        } else {
          return this.projects
        }
      } else {
        return null
      }
    }
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
        width: 34%;
      }

      &-2 {
        width: 22%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      // &-3 {
      //   width: 10%;
      // }
    }
  }

  .header {
    margin-bottom: 5px;

    .block {
      font-size: 14px;
      color: var(--support-dark-gray);
      display: flex;
      justify-content: center;
    }
  }

  .body {
    .item {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      padding: 10px 0;
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
