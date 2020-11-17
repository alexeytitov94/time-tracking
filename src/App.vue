<template>
  <div id="app">
    <Header />
    <div class="content">
      <ListProject />
    </div>

    <ModalPanel v-model="isSettingBool">
      <Setting />
    </ModalPanel>
    
    <ModalPanel v-model="isAnalytics">
      <Analytics />
    </ModalPanel>

    <ModalPanel v-model="isProject">
      <Project />
    </ModalPanel>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import ModalPanel from './components/base/ModalPanel.vue';
import Header from './components/Header.vue';

import Setting from './components/Setting.vue';
import Analytics from './components/Analytics.vue';
import Project from './components/Project.vue';

import ListProject from './components/project/ListProject.vue';

export default {
  name: 'App',
  components: {
    ModalPanel,
    Header,
    Setting,
    Analytics,
    Project,
    ListProject,
  },
  data() {
    return {
      isAnalytics: false,
      isProject: false,
    };
  },
  computed: {
    ...mapState(['isSetting', 'user']),
    isSettingBool: {
      get() {
        return this.isSetting
      },
      set() {
        this.setIsSetting()
      }
    }
  },
  methods: {
    ...mapMutations(['setIsSetting', 'setUser']),
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
