<template>
  <transition name="modal-transition">
    <div class="wrapper-modal" v-if="value">
      <div class="content">
        <div class="close" @click="close">
          <span class="icon-close"></span>
        </div>
        <slot></slot>
      </div>
      <div class="overlay" @click="close"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalPanel',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('onClose')
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-modal {
  position: fixed;
  z-index: 1100;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  & > .content {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: auto;
    transition: all 0.3s;
    z-index: 101;
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
    .close {
      position: absolute;
      display: flex;
      align-items: center;
      top: 15px;
      left: -65px;
      background: #2a1c46;
      width: 65px;
      padding: 5px 15px;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
      cursor: pointer;
      @media only screen and (max-width: 768px) {
        display: none;
      }
      .icon-close {
        font-size: 30px;
        &:before {
          color: #fff;
        }
      }
    }
  }
  & > .overlay {
    position: fixed;
    z-index: 100;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    backface-visibility: hidden;
    background: rgba(0,0,0,.3);
  }
}
.modal-transition-enter-active,
.modal-transition-leave-active {
  transition: all 0.25s;
  .content {
    transition: all 0.25s;
    right: 0;
    transform: translateX(-0%);
    @media only screen and (max-width: 768px) {
      transform: translateY(-0%);
    }
  }
  .overlay {
    transition: all 0.25s;
  }
}
.modal-transition-enter,
.modal-transition-leave-to {
  transition: all 0.25s;
  .content {
    transition: all 0.25s;
    transform: translateX(100%);
    opacity: 0;
    @media only screen and (max-width: 768px) {
      transform: translateY(100%);
    }
  }
  .overlay {
    transition: all 0.25s;
    background: transparent;
  }
}
</style>