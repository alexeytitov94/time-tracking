<template>
  <div class="time">
    <div class="field">
      <input type="text" value="0">

      <vue-picker v-model="time">
        <vue-picker-option value="1">Час.</vue-picker-option>
        <vue-picker-option value="2">Мин.</vue-picker-option>
      </vue-picker>
    </div>
    <span class="icon icon-stop-circle-outline"></span>
  </div>
</template>

<script>
import { VuePicker, VuePickerOption } from '@invisiburu/vue-picker'
import '@invisiburu/vue-picker/dist/vue-picker.min.css'

export default {
  name: 'Time',
  components: {
    VuePicker,
    VuePickerOption,
  },
  data() {
    return {
      time: '1',
    }
  },
}
</script>

<style lang="scss" scoped>
.time {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 10px;

  .field {
    display: flex;
    background: #fff;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    margin-right: 10px;

    input {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      font-weight: 600;
      padding: 0 10px;
    }
  }

  .icon {
    cursor: pointer;
    font-size: 25px;
    transition: all .2s;

    &.icon-play-circle-outline {
      &:hover {
        color: #168409;
      }
    }

    &.icon-stop-circle-outline {
      &:hover {
        color: #ae0505;
      }
    }
  }
}
</style>
