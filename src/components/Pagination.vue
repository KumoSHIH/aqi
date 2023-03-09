<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    page: {
      type: Number,
      default: 0,
    }
  },
  setup(props) {
    const store = useStore();
    // 當前頁碼
    const currentPage = computed(() => store.getters.num)
    // 切換頁碼
    const handPage = (index) => {
      store.commit('activeNum', index)
    }
    return {
      props,
      handPage,
      currentPage
    }
  }
}
</script>

<template>
  <ul class="page-wrap" >
    <li class="page-box" 
      v-for="(item, index) in props.page" 
      :key="item"
      :class="{ active: index === currentPage}"
      @click="handPage(index)"
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