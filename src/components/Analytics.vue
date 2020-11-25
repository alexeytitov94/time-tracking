<template>
  <div class="analytics">
    <div class="header">
      <div>
        <span class="title">Аналитика</span>
      </div>
      <span
        class="button"
        v-show="analytics"
        @click="clear"
      >Очистить</span>
    </div>
    <div class="content" v-if="!analytics && !isAnalytics">
      <div class="chose">
        <div
          class="user"
          @click="isChoseUser = !isChoseUser"
          :class="{active: choseUser}"
        >
          {{ choseUser ? choseUser.name : 'Сотрудник' }}
        </div>
        <div
          class="project"
          :class="{active: choseProject}"
          @click="isChoseProject = !isChoseProject"
        >
           {{ choseProject ? choseProject.title : 'Проект' }}
        </div>
      </div>
      <div class="date" v-if="choseProject || choseUser">
        <DateRange v-model="choseDate" />
      </div>
      <p class="information" v-if="!choseDate.length">
        <template v-if="!choseProject && !choseUser">
          Выберите проект или сотрудника
        </template>
        <template v-if="!choseDate.length && choseProject || choseUser">
          Выберите период
        </template>
      </p>
      <Button
        label="Сформировать"
        v-if="choseDate.length"
        @click="formiration"
        variant="primary"
      />
    </div>

    <div class="analytics-wrapper" v-if="analytics">
      <div class="statistic">
        <div class="item techsupport">
          <span class="title">Техподдержка</span>
          <span>10 часов</span>
        </div>
        <div class="item project">
          <span class="title">Проект</span>
          <span>10 часов</span>
        </div>
        <div class="item communication">
          <span class="title">Коммуникация</span>
          <span>10 часов</span>
        </div>
      </div>
      <div class="graph"></div>
    </div>

    <div class="loader" v-if="isAnalytics">
      <Preloader />
    </div>

    <!-- chose-project-->
    <ModalPanel v-model="isChoseProject">
      <div class="chose-projects" v-if="isChoseProject">
        <div class="header">
          <div>
            <span class="title">Выбор проекта</span>
          </div>
        </div>
        <div class="list">
          <div class="item" v-for="(item, index) in projects" :key="index" @click="choseProjectModal(item)">
            {{ item.title }}
          </div>
        </div>
      </div>
    </ModalPanel>
    <!-- ./chose-project-->

    <!-- chose-user-->
    <ModalPanel v-model="isChoseUser">
      <div class="chose-users" v-if="isChoseUser">
        <div class="header">
          <div>
            <span class="title">Выбор сотрудника</span>
          </div>
        </div>
        <div class="list">
           <div class="item" v-for="(item, index) in users" :key="index" @click="choseUsersModal(item)">
            {{ item.name }}
          </div>
        </div>
      </div>
    </ModalPanel>
    <!-- ./chose-user-->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import ModalPanel from './base/ModalPanel.vue'
import DateRange from './form/DateRange.vue'
import Button from '@/components/form/Button.vue';
import Preloader from '@/components/base/Preloader'

export default {
  name: 'Analytics',
  components: {
    ModalPanel,
    DateRange,
    Button,
    Preloader
  },
  data() {
    return {
      isChoseProject: false,
      isChoseUser: false,
      choseProject: null,
      choseUser: null,
      choseDate: [],
    }
  },
  computed: {
    ...mapState('projects', ['projects', 'users', 'isAnalytics', 'analytics']),
  },
  methods: {
    ...mapActions('projects', ['formirationAnalytics']),
    ...mapMutations('projects', ['setAnalytics']),
    formiration() {
      this.formirationAnalytics({
        type: this.choseProject ? 'project' : 'user',
        data: this.choseProject ? this.choseProject : this.choseUser,
        choseDate: this.choseDate
      })
    },
    choseProjectModal(item) {
      this.choseProject = item
      this.choseUser = null
      this.isChoseProject = false
    },
    choseUsersModal(item) {
      this.choseUser = item
      this.choseProject = null
      this.isChoseUser = false
    },
    clear() {
      this.choseProject = null
      this.choseProject = null
      this.choseDate = []
      this.setAnalytics(null)
    }
  }
}
</script>

<style lang="scss" scoped>
.analytics {
  background: #fff;
  padding: 20px;
  width: 550px;
  height: 100%;

  .content {
    .chose {
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      border: 2px solid #f5f5f5;
      border-radius: 5px;

      & > div {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 2px solid #f5f5f5;
        padding: 5px 0;
        cursor: pointer;
        transition: all .2s;
        border-radius: 2px;

        &.active {
          background: var(--main-blue);
          color: #fff;
        }

        &:hover {
          background: #f5f5f5;
          color: #2c3e50;
        }

        &:last-child {
          border-right: 0;
        }
      }
    }
  }

  .statistic {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      width: 100%;
      margin-right: 10px;
      border-radius: 5px;
      cursor: pointer;

      span {
        font-weight: 500;

        &.title {
          font-size: 14px;
          margin-bottom: 2px;
          opacity: .7;
          font-weight: 400;
        }
      }

      &:last-child {
        margin-right: 0;
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
  }

  .information {
    text-align: center;
    opacity: .5;
    font-size: 15px;
    margin-bottom: 20px;
  }

  .button {
    margin: 0 auto 30px;
    width: max-content;
  }

  .chose-users,
  .chose-projects {
    width: 300px;
    background: #fff;
    padding: 20px;
    height: 100%;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;

      .title {
        font-size: 20px;
        font-weight: 500;
      }
    }

    .list {
      .item {
        position: relative;
        display: flex;
        align-items: center;
        border-bottom: 2px solid #f5f5f5;
        padding: 20px 10px;
        cursor: pointer;
        transition: .2s;

        &:hover {
          background: #f5f5f5;
        }
      }
    }
  }

  .loader {
    padding: 20px;
    height: 50px;

    .dot {
      width: 9px;
      height: 9px;

      &:not(:last-child) {
        margin-right: 9px;
      }
    }
  }

}
</style>