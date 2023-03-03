<script>
export default {
  props: {
    filterData: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    return {
      props,
    }
  },
}
</script>

<template>
  <div class="card" 
    v-for="item in props.filterData"
    :key="item.site">
    <h6>{{ item.site }}</h6>
    <p>pm25 {{ item.pm25 }}</p>
    <p>更新日期: {{ item.datacreationdate }}</p>
  </div>
</template>

<style scoped lang="scss">
  @import '../assets/scss/_mixin.scss';

  .card {
    max-width: 230px;
    width: 100%;
    margin-right: 20px;
    margin-bottom: 20px;
    padding: 30px 20px;
    box-shadow: 5px 5px 20px rgba(0,0,0,0.1);
    border-radius: 8px;
    &:nth-child(2n){
      margin-right: 0;
    }
    @include rwdmax(760) {
      margin-right: 0;
    }
  }
</style>
