<template>
  <div id="app">
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
    this.setUser(1)
    this.getProjects()
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
</style>
