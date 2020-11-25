<template>
  <button
    class="button"
    :data-disabled="disabled"
    :data-variant="variant"
    :data-content-width="contentWidth"
    @click="onClick"
  >
    <span v-if="!loading && icon" class="icon" :class="icon"></span>
    <span :class="loading ? 'loading' : ''">
      {{ label }}
    </span>
    <Preloader v-if="loading"/>
  </button>
</template>

<script>
import Preloader from '@/components/base/Preloader'

export default {
  name: 'Button',
  components: { Preloader },
  props: {
    variant: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    contentWidth: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss">
.button {
  position: relative;
  font-family: Muller, sans-serif;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  line-height: 42px;
  height: 42px;
  font-weight: 500;
  font-size: 16px;
  color: #fff;
  border-radius: 5px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .loading {
    display: none;
  }

  .icon {
    font-size: 20px;
    margin-top: -2px;
    margin-right: 5px;

    &:before {
      color: #347afb;
    }
  }

  &[data-variant='primary'] {
    background-color: #347afb;
    border-color: #347afb;

    &:hover {
      background-color: #3f8aff;
    }

    .preloader .dot {
      background-color: #ffffff !important;
    }
  }

  &[data-variant='ash-blue'] {
    background-color: #9ab6ea;
  }

  &[data-variant='outline'] {
    color: #347afb;
    border-color: #347afb;
    background: none;
  }

  &[data-variant='soft-blue'] {
    background-color: #9ab6ea;
    border-color: #9ab6ea;
  }

  &[data-variant='red'] {
    background-color: #fb3434;
    border-color: #fb3434;

    .preloader .dot {
      background-color: #ffffff !important;
    }
  }

  &[data-disabled='true'] {
    pointer-events: none;
    background-color: #f8f8f8;
    border-color: #f8f8f8;
    color: #d4d4d4;
  }

  &[data-content-width='true'] {
    width: auto;
  }
}

/deep/.preloader {
  transform: scale(0.3);
  path {
    stroke: #fff;
  }
}
</style>
