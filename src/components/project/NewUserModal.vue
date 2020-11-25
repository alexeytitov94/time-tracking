<template>
  <div class="create-user">
    <div class="header">
      Вы в первый раз зашли в приложение. Пожалуйста, укажите вашу Фамилию и Имя.
    </div>
    <div class="content">
      <InputText
        id="middle-name"
        v-model="name"
        label="Фамилия и Имя"
      />

      <Button
        label="Отправить"
        :loading="loader"
        @click="save"
        variant="primary"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

import Button from '@/components/form/Button.vue';
import InputText from '@/components/form/InputText.vue';

export default {
  name: 'NewUserModal',
  components: {
    Button,
    InputText
  },
  data() {
    return {
      name: '',
      loader: false
    }
  },
  methods: {
    ...mapActions('projects', ['addNewUser']),
    ...mapMutations(['setIsNewUser']),
    async save() {
      this.loader = true
      await this.addNewUser(this.name)
      this.loader = false
      this.setIsNewUser()
    }
  }
}
</script>

<style lang="scss" scoped>
.create-user {
  padding: 20px;

  .header {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 30px;
  }

  .content {
    .input-text {
      margin-bottom: 20px;
    }

    .button {
      width: max-content;
      margin: 0 auto;
    }
  }
}
</style>