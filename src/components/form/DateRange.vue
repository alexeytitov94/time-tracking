<template>
  <div class="date-range">
    <DatePicker
      v-model="choseDate"
      type="date"
      range
      placeholder="Выберите дату"
      format="DD-MM-YYYY"
      value-type="DD-MM-YYYY"
    ></DatePicker>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  components: { DatePicker },
  data() {
    return {
      choseDate: ''
    }
  },
  props: ['value'],
  watch: {
    choseDate() {
      this.$emit('input', this.choseDate)
    },
  },
}
</script>

<style lang="scss">
.date-range {
  position: relative;
  margin-bottom: 20px;
}

.mx-datepicker-popup {
  box-shadow: none !important;
  border-radius: 5px !important;
  margin-top: 10px !important;
  border: 2px solid #f5f5f5 !important;
  transform: translateX(-5px);
}

.mx-datepicker-range {
  width: 100%;
}

.mx-input {
  height: 50px;
  box-shadow: none;
  border: 2px solid #f5f5f5;
}
</style>