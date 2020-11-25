<template>
  <div class="setting">
    <div class="header">
      <div>
        <span class="title">Настройки проектов</span>
        <p v-if="!isAdmin">
          Кликните на проект, чтобы добавить его в свои проекты
        </p>
      </div>
      <span
        class="button"
        v-if="isAdmin"
        @click="isCreateProject = !isCreateProject"
      >Создать проект</span>
    </div>
    <div class="content">
      <div class="list-project" v-if="projects">
        <div
          v-for="(item, index) in projects"
          :key="index"
          class="item"
          :class="{ active : item.active }"
        >
          <div @click="choseProject(item)" class="wrapper">
            <span class="active" v-if="item.active">Мой проект</span>
            <div class="title">
              {{ item.title }}
            </div>
          </div>
          <div class="delete" v-if="isAdmin" @click="deleteProjectItem(item)">
            <span class="icon-trash"></span>
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
          <input type="text" v-model="newProject.linkProject" placeholder="Ссылка на проект">

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
          <input type="text" v-model="project.linkProject" placeholder="Ссылка на проект">
          <div
            class="checkbox"
            :class="{ active : project.active }"
            @click="project.active = !project.active"
          >
            <span
            class="icon"
            :class="[project.active ? 'icon-checkbox' : 'icon-checkbox-outline']"></span>
            <span>Мой проект</span>
          </div>

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
        linkProject: '',
      },
      project: null,
    }
  },
  computed: {
    ...mapState(['isAdmin']),
    ...mapState('projects', ['projects']),
  },
  methods: {
    ...mapActions('projects', [
      'createProject',
      'editProject',
      'toggleActiveProject',
      'deleteProject'
    ]),
    createNewProject() {
      if (this.newProject.title != '' && this.newProject.linkProject != '') {
        this.createProject(this.newProject)
        this.isCreateProject = false
        this.newProject.title = ''
        this.newProject.linkProject = ''
      }
    },
    editProjectBase() {
      if (this.project.title != '' && this.project.linkProject != '') {
        this.editProject(this.project)
        this.isEditProject = false
        this.project = null
      }
    },
    choseProject(project) {
      if (this.isAdmin) {
        this.isEditProject = true
        this.project = {
          idProject: project.idProject,
          title: project.title,
          linkProject: project.linkProject,
          active: project.active,
        }
      } else {
        project.active = !project.active
        this.toggleActiveProject(project)
      }
    },
    deleteProjectItem(item) {
      this.deleteProject(item)
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
        position: relative;
        display: flex;
        align-items: center;
        border-bottom: 2px solid #f5f5f5;
        margin-bottom: 10px;
        cursor: pointer;
        transition: .2s;

        & > .wrapper {
          height: 100%;
          width: 100%;
          padding: 25px 20px;

          .active {
            display: block;
            font-size: 11px;
            background: var(--main-blue);
            color: #fff;
            padding: 5px 10px;
            width: max-content;
            border-radius: 2px;
            margin-bottom: 5px;
          }
        }

        &.active {
          & > .wrapper {
            padding: 15px 20px;
          }
        }

        &:hover {
          .delete {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .title {
          font-size: 19px;
          font-weight: 500;
        }

        .delete {
          position: absolute;
          top: 0;
          right: 20px;
          font-size: 20px;
          height: 100%;
          display: flex;
          align-items: center;
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