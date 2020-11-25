<template>
 <transition name="modal-fade">
    <div v-show="value" class="modal-stockwell">
      <div class="overlay" @click="closeModalOverlay"></div>
      <div class="modal-wrapper">
        <div v-if="close" class="close" @click="closeModal">
          <span class="icon-close"></span>
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    close: {
      type: Boolean,
      default: false,
    },
    closeOnOverlay: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    value() {
      if (this.value) {
        document.body.classList.add('open-modal')
      } else {
        document.body.classList.remove('open-modal')
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit('input', !this.value)
    },
    closeModalOverlay() {
      if (!this.closeOnOverlay) {
        this.closeModal()
      }
    }
  },
}
</script>

<style lang="scss">
.modal-stockwell {
  position: fixed;
  z-index: 1300;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-family: Muller, sans-serif;
  overflow: auto;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: #0c0c0c75;
  }

  .modal-wrapper {
    overflow: auto;
    position: relative;
    background: #fff;
    padding: 16px;
    box-shadow: none;
    border-radius: 10px;
    z-index: 1080;
    width: 33vw;
    max-height: 80%;

    @media (max-width: 1200px) {
      width: 50vw;
    }

    @media (max-width: 992px) {
      width: calc(100vw - 30px) !important;
    }

    > span.title {
      display: block;
      @media (max-width: 992px) {
        text-align: center;
      }
    }

    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 25px;
      cursor: pointer;

      span {
        &:before {
          color: #000;
        }
      }
    }
  }
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
