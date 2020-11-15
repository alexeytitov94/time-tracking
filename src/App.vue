<template>
  <div id="app">
    <Header />
    <div class="content">
      <ListProject />
    </div>

    <ModalPanel v-model="isSetting">
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
      isSetting: false,
      isAnalytics: false,
      isProject: false,
    };
  },
};
</script>

<style>
#app {
  color: #2c3e50;
}
</style>
