<template>
  <div class="setting">
    <div class="header">
      <span class="title">Настройки проектов</span>
      <span class="button" @click="isCreateProject = !isCreateProject">Создать проект</span>
    </div>
    <div class="content">
      <div class="list-project" v-if="projects">
        <div
          v-for="(item, index) in projects"
          :key="index"
          class="item"
          @click="choseProject(item)"
        >
          <div class="title">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>

    <ModalPanel v-model="isCreateProject">
      <div class="create-project">
        <div class="header">
          <span class="title">Создание проекта</span>
        </div>
        <div class="content">
          <input type="text" v-model="newProject.title" placeholder="Название проекта">
          <input type="number" v-model="newProject.idCompany" placeholder="ID компании">

          <button class="btn btn-blue" @click="createNewProject">
            Создать проект
          </button>
        </div>
      </div>
    </ModalPanel>

    <ModalPanel v-model="isEditProject">
      <div class="create-project" v-if="project">
        <div class="header">
          <span class="title">Редактирование проекта</span>
        </div>
        <div class="content">
          <input type="text" v-model="project.title" placeholder="Название проекта">
          <input type="number" v-model="project.idCompany" placeholder="ID компании">

          <button class="btn btn-blue" @click="editProjectBase">
            Изменить проект
          </button>
        </div>
      </div>
    </ModalPanel>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import ModalPanel from './base/ModalPanel.vue';

export default {
  name: 'Setting',
  components: {
    ModalPanel,
  },
  data() {
    return {
      isCreateProject: false,
      isEditProject: false,
      newProject: {
        title: '',
        idCompany: '',
      },
      project: null,
    }
  },
  computed: {
    ...mapState('projects', ['projects']),
  },
  methods: {
    ...mapActions('projects', ['createProject', 'editProject']),
    createNewProject() {
      if (this.newProject.title != '' && this.newProject.idCompany != '') {
        this.createProject(this.newProject)
        this.isCreateProject = false
        this.newProject.title = ''
        this.newProject.idCompany = ''
      }
    },
    editProjectBase() {
      if (this.project.title != '' && this.project.idCompany != '') {
        this.editProject(this.project)
        this.isEditProject = false
        this.project = null
      }
    },
    choseProject(project) {
      this.isEditProject = true
      this.project = {
        id: project.idProject,
        title: project.title,
        idCompany: project.idCompany,
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.setting {
  background: #fff;
  padding: 20px;
  width: 450px;
  height: 100%;

  .content {
    .list-project {
      .item {
        display: flex;
        align-items: center;
        padding: 20px;
        border: 1px solid var(--support-separator-gray);
        border-radius: 5px;   
        margin-bottom: 10px;
        cursor: pointer;
        transition: .2s;

        &:hover {
          transform: translateY(-2px);
        }

        .title {
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
  }
}

.create-project {
  background: #fff;
  padding: 20px;
  width: 300px;
  height: 100%;

  .content {
    input {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .btn {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>