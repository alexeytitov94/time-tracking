<template>
  <div class="history">
    <div class="header">
      <div>
        <span class="title">История добавления</span>
        <p>
          Наведите на карточку, чтобы удалить время из затраченного
        </p>
      </div>
    </div>
    <div class="list" v-if="historyUser">
      <div class="item" v-for="(item, index) in historyUser" :key="index">
        <div class="left">
          <span class="date">{{ item.date }}</span>
          <span class="title">{{ item.project.title }}</span>
        </div>
        <div class="time" :class="[item.type.title]">
          <span class="title">{{ item.type.rus }}</span>
          <span class="time">{{ item.time }}</span>
        </div>
        <div class="delete" @click="deleteHistory(item.id)">
          <span class="icon-trash"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'History',
  computed: {
    ...mapState('projects', ['historyUser']),
  },
  methods: {
    ...mapActions('projects', [
      'getHistory',
      'deleteHistory',
    ]),
  },
  mounted() {
    this.getHistory()
  }
}
</script>

<style lang="scss" scoped>
.history {
  background: #fff;
  padding: 20px;
  width: 450px;
  height: 100%;

  .list {
    .item {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 2px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all .2s;

      .left {
        display: flex;
        flex-direction: column;

        .date {
          margin-bottom: 2px;
          font-size: 13px;
          color: #bfbfbf;
        }

        .title {
          font-weight: 600;
          font-size: 18px;
          margin-top: 5px;
        }
      }

      & > .time {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 140px;
        padding: 10px;
        border-radius: 2px;

        .title {
          font-size: 12px;
          margin-bottom: 2px;
          opacity: .7;
        }

        .time {
          font-size: 16px;
          font-weight: 500;
        }

        &.techsupport {
          background: #fef2d8;
          color: #dc9a10;
        }

        &.project {
          background: #deefff;
          color: #27649e;
        }

        &.communication {
          background: #ffe0de;
          color: #a93c35;
        }
      }

      &:hover {
        .delete {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .delete {
        position: absolute;
        background: linear-gradient(270deg, #FFFFFF 37.1%, rgba(255, 255, 255, 0) 84.68%);
        border-radius: 5px;
        width: 65px;
        top: 0;
        right: 0;
        font-size: 20px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: .3s;
        transform: translateX(10px);

        &:hover {
          color: var(--additional-error);
          opacity: 0.7;
        }
      }
    }
  }
}
</style>