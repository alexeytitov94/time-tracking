<template>
  <div class="header">
    <div class="left">
      <div class="tab" :class="{active : type === 'me'}" @click="setType('me')">Мои проекты</div>
      <div class="tab" :class="{active : type === 'all'}" @click="setType('all')">Все проекты</div>
    </div>
    <div class="right">
      <button class="btn" @click="setIsHistory()">
        История
      </button>
      <button class="btn" v-if="isAdmin" @click="setIsAnalytics()">
        <span class="icon icon-analytics"></span>
        Аналитика
      </button>
      <button class="btn setting" @click="setIsSetting()">
        <span class="icon-settings-outline"></span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState(['isAdmin']),
    ...mapState('projects', ['type'])
  },
  methods: {
    ...mapMutations(['setIsSetting', 'setIsHistory', 'setIsAnalytics']),
    ...mapMutations('projects', ['setType'])
  },
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;

  .left {
    display: flex;
    height: 100%;
    align-items: center;

    .tab {
      cursor: pointer;
      display: flex;
      align-items: center;
      height: 40px;
      font-weight: 500;
      padding: 0 10px;
      transition: all .2s;
      border-bottom: 2px solid #ffffff;

      &:hover {
        color: var(--main-blue);
      }

      &.active {
        color: var(--main-blue);
        border-bottom: 2px solid var(--main-blue);
      }
    }
  }

  .right {
    display: flex;
    height: 100%;
    align-items: center;

    .btn {
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }

      &.setting {
        font-size: 17px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        width: 40px;
        padding: 0;
      }
    }
  }
}
</style>