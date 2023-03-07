<script>
import { ref } from 'vue';

export default {
  props: {
    page: {
      type: Number,
      default: 0,
    }
  },
  emit: ['currentPage'],
  setup(props, context) {
    const current = ref(0)

    let pageActive = (index) => {
      current.value = index
      // 向外層傳送事件 目前點擊頁碼
      // select 選擇後需要重置為 0 
      context.emit('currentPage', current.value)
    }
    return {
      props,
      current,
      pageActive
    }
  }
}
</script>

<template>
  <ul class="page-wrap" >
    <li class="page-box" 
      v-for="(item, index) in props.page" 
      :key="item"
      :class="{ active: index === current}"
      @click="pageActive(index)"
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