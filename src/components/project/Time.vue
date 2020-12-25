<template>
  <div class="time-wrapper">
    <div class="hour">
      <input type="text" v-model="hour" :disabled="!currentTime">
    </div>
    <div class="minutes">
      <input type="text" v-model="minutes" :disabled="!currentTime">
    </div>
    <div class="icon" @click="action">
      <span class="icon icon-stop" v-if="currentTime"></span>
      <span class="icon icon-play" v-else></span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Time',
  props: {
    time: {
      type: [Object, Number],
    },
    project: {
      type: Object,
    },
    field: {
      type: String,
    }
  },
  data() {
    return {
      currentTime: 0,
      interval: '',
    }
  },
  computed: {
    ...mapState(['user']),
    hour: {
      get() {
        return Math.floor(this.currentTime/60)
      },
      set(value) {
        this.currentTime = (value * 60) + Math.floor(this.currentTime%60)
      }
    },
    minutes: {
      get() {
        return Math.floor(this.currentTime%60)
      },
      set(value) {
        if (value > 60) {
          value = 60
        }
        this.currentTime = (Math.floor(this.currentTime/60) * 60) + (+value)
      }
    }
  },
  methods: {
    ...mapActions('projects', ['changeTime']),
    async action() {
      this.load = true
      await this.changeTime({
        idProject: this.project.idProject,
        idUser: this.user,
        time:  this.currentTime,
        idTime: this.time.id,
        field: this.field,
        type: this.currentTime ? 'close' : 'open'
      })

      if (this.currentTime) {
        clearInterval(this.interval)
        this.currentTime = 0  
      } else {
        this.currentTime = 1;
        this.interval = setInterval(() => {
          this.currentTime = this.currentTime + 1
        }, 60000)
      }
      this.load = false
    }
  },
  mounted() {
    if (this.time.time) {
      this.currentTime = this.time.time
    }

    this.interval = setInterval(() => {
      if (this.currentTime) {
        this.currentTime = this.currentTime + 1
      }
    }, 60000)
  }
}
</script>

<style lang="scss" scoped>
.time-wrapper {
  display: flex;
  height: 42px;
  padding: 3px;
  border: 1px solid #f5f5f5;
  border-radius: 5px;
  background: #fff;

  & > div {
    height: 100%;
    width: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    input {
      border: none;
      width: 100%;
      height: 100%;
      background: none;
      padding: 0;
      text-align: center;
      font-weight: 600;
      color: var(--support-light-black);

      &:disabled {
        font-weight: 500;
      }
    }

    &.hour {
      border-right: 1px solid #f5f5f5;
    }

    &.icon {
      background: #f6f6f6;
      border-radius: 3px;
      height: 34px;
      width: 34px;
      cursor: pointer;
      color: #a5a5a5;
      font-size: 12px;
      transition: .2s;

      .icon-play {
        color: var(--support-light-black);
      }

      .icon-stop {
        color: #e99999b0;
      }

      &:hover {
        background: #f0f0f0;
        color: var(--support-light-black);
      }
    }
  }
}
</style>
