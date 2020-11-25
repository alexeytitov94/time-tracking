<template>
  <div class="input-text" :data-invalid="invalid">
    <label :for="id">{{ label }}</label>
    <input :id="id" v-model="inputValue" type="text" />
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      required: true,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.input-text {
  font-family: Muller, sans-serif;
  label {
    color: #a8a8a8;
    font-size: 14px;
    margin-bottom: 5px;
    display: block;
    margin-bottom: 5px;
    transition: all ease-in-out 0.2s;
  }
  input[type='text'] {
    font-family: inherit;
    width: 100%;
    height: 40px;
    border: 1px solid #e5e5e5;
    font-size: 16px;
    color: #3a3a3a;
    padding: 0 10px;
    line-height: 40px;
    border-radius: 5px;
    transition: all ease-in-out 0.2s;
    &:focus {
      outline: none;
    }
  }
  &[data-invalid='true'] {
    label {
      color: #fb3434;
    }
    input[type='text'] {
      border-color: #fb3434;
    }
  }
}
</style>
