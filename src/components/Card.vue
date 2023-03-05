<script>
import { ref } from 'vue';

export default {
  props: {
    filterData: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const isCheck = ref(false);

    const addFavorite = () => {
      console.log('233');
      isCheck.value != isCheck.value
    }
    return {
      props,
      isCheck,
      addFavorite
    }
  },
}
</script>

<template>
  <div class="card" 
    v-for="item in props.filterData"
    :key="item.site">
    <div class="card-head">
      <h6>{{ item.sitename }}</h6>
      <div class="fav" @click="addFavorite">
        <font-awesome-icon icon="fa-regular fa-heart" v-show="!isCheck" />
        <font-awesome-icon icon="fa-solid fa-heart" v-show="isCheck" />
      </div>
    </div>
    <p>狀態: {{ item.status }}</p>
    <p>空氣品質指標(aqi): {{ item.aqi }}</p>
    <p>細懸浮微粒(pm2.5): {{ item['pm2.5'] }}</p>
    <p>發佈時間: {{ item.publishtime }}</p>
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
  .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h6 {
      font-size: 34px;
    }
    .fav {
      padding: 10px;
      cursor: pointer;
      font-size: 20px;
    }

  }
</style>
