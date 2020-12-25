<template>
  <div id="app">
    <div v-if="!noAccess">
      <Header />
      <div class="content">
        <ListProject />
      </div>

      <ModalPanel v-model="isSettingBool">
        <Setting />
      </ModalPanel>

      <ModalPanel v-model="isAnalyticsBool">
        <Analytics />
      </ModalPanel>

      <ModalPanel v-model="isHistoryBool">
        <History v-if="isHistoryBool" />
      </ModalPanel>

      <Modal v-model="isNewUserBool" :closeOnOverlay="true">
        <NewUserModal />
      </Modal>
    </div>
    <div class="no-access" v-else>
        <h1>Доступ запрещен</h1>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import ModalPanel from './components/base/ModalPanel.vue';
import Modal from './components/base/Modal.vue';
import Header from './components/Header.vue';

import Setting from './components/Setting.vue';
import Analytics from './components/Analytics.vue';
import History from './components/History.vue';
import NewUserModal from './components/project/NewUserModal.vue';

import ListProject from './components/project/ListProject.vue';

export default {
  name: 'App',
  components: {
    ModalPanel,
    Header,
    Setting,
    Analytics,
    ListProject,
    History,
    Modal,
    NewUserModal
  },
  data() {
    return {
      noAccess: false,
    }
  },
  computed: {
    ...mapState(['isSetting', 'isHistory', 'isAnalytics', 'isNewUser', 'user']),
    isSettingBool: {
      get() {
        return this.isSetting
      },
      set() {
        this.setIsSetting()
      }
    },
    isHistoryBool: {
      get() {
        return this.isHistory
      },
      set() {
        this.setIsHistory()
      }
    },
    isAnalyticsBool: {
      get() {
        return this.isAnalytics
      },
      set() {
        this.setIsAnalytics()
      }
    },
    isNewUserBool: {
      get() {
        return this.isNewUser
      },
      set() {
        this.setIsNewUser()
      }
    }
  },
  methods: {
    ...mapMutations(['setIsSetting', 'setIsHistory', 'setIsAnalytics', 'setIsNewUser', 'setUser']),
    ...mapActions('projects', ['getProjects'])
  },
  mounted() {
    if (window.userId) {
      this.setUser(window.userId)
      this.getProjects()
    } else {
      this.noAccess = true
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  color: #2c3e50;

  .content {
    max-width: 900px;
    margin: 20px auto 30px;
  }
}

.no-access {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  text-align: center;

  h1 {
    margin-top: 100px;
  }
}
</style>
