<template>
  <div class="preloader">
    <div class="dots">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .dots {
    display: flex;

    .dot {
      width: 7px;
      height: 7px;
      background-color: #347afb;
      border-radius: 50%;
      transition: all 0.2s;
      animation: dot 1.5s infinite linear;
      opacity: 1;
      transform: scale(1);
      &:nth-child(2) {
        animation-delay: 0.3s;
      }
      &:nth-child(3) {
        animation-delay: 0.6s;
      }
      &:not(:last-child) {
        margin-right: 7px;
      }
    }

    @keyframes dot {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      13.33% {
        opacity: 0;
        transform: scale(0.5);
      }
      40% {
        opacity: 0;
        transform: scale(0.5);
      }
      53.33% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
}
</style>
