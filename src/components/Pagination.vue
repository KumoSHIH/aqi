<script>
export default {
  props: {
    page: {
      type: Number,
      default: 0,
    },
    activePage: {
      type: Number,
      default: 0
    }
  },
  emit: ['pageHand'],
  setup(props) {
    return {
      props,
    }
  }
}
</script>

<template>
  <ul class="page-wrap" >
    <li class="page-box" 
      v-for="(item, index) in page" 
      :key="item"
      :class="{ active: index === activePage}"
      @click="$emit('pageHand', index)"
    >{{ index + 1 }}</li>
  </ul>
</template>

<style lang="scss" scoped>
  @import '../assets/scss/_mixin.scss';

  .page-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @include rwdmax(600) {
      width: 80%;
      margin: 30px auto 0;
    }
  }
  .page-box {
    padding: 6px 8px;
    margin: 0 2px 5px;
    border-radius: 5px;
    border: solid 1px rgba(0,0,0,0.2); 
    cursor: pointer;
    font-size: 14px;
    transition: .3s ease-in-out;
    &.active,
    &:hover {
      background-color: #f1f1f1;
    }
  }
</style>
