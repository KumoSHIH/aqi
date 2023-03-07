<script>
import { computed, ref } from 'vue';

export default {
  props: {
    filterData: {
      type: Array,
      default: () => []
    },
    current: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const isCheck = ref(false);
    // 分頁資料
    const currentData = computed(() => {
      return props.filterData.slice((props.current * 6), (props.current * 6 + 6))
    })

    // 狀態
    const status = ((val) => {
      switch(val) {
        case "良好" : return 'status-aqi1';
        case "普通" : return 'status-aqi2';
        case "對敏感族群不健康" : return 'status-aqi3';
        case "對所有族群不健康" : return 'status-aqi4';
        case "非常不健康" : return 'status-aqi5';
        case "危害" : return 'status-aqi6';
        default : return 'normal'
      }
    })

    // 加入關注城市
    const addFavorite = (item) => {
      console.log('233');
      isCheck.value != isCheck.value
    }
    return {
      props,
      isCheck,
      addFavorite,
      currentData,
      status
    }
  },
}
</script>

<template>
  <div class="card" 
    v-for="item in currentData"
    :key="item.site"
    :class="status(item.status)"
    >
    <div class="card-head">
      <h6>{{ item.sitename }}</h6>
      <!-- <div class="fav" @click="addFavorite(item)">
        <font-awesome-icon icon="fa-regular fa-heart"
        v-show="!isCheck"
        />
        <font-awesome-icon icon="fa-solid fa-heart" 
        v-show="isCheck"
        />
      </div> -->
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
    padding: 20px;
    box-shadow: 5px 5px 20px rgba(0,0,0,0.1);
    border-radius: 8px;
    &:nth-child(2n){
      margin-right: 0;
    }
    &.status-aqi1 {
      border: solid 3px #74bc7b;
    }
    &.status-aqi2 {
      border: solid 3px #3A98B9;
    }
    &.status-aqi3 {
      border: solid 3px #FFAACF;
    }
    &.status-aqi4 {
      border: solid 3px #F99417;
    }
    &.status-aqi5 {
      border: solid 3px #F94A29;
    }
    &.status-aqi6 {
      border: solid 3px #A31ACB;
    }
    p {
      padding: 5px 0;
      text-align: left;
      color: #2a2a2a;
      @include rwdmax(600) {
        font-size: 14px;
      }
    }
    @include rwdmax(760) {
      margin-right: 0;
    }
  }
  .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: solid 1px rgba(0,0,0,0.1);
    h6 {
      font-size: 30px;
      @include rwdmax(600) {
        font-size: 24px;
      }
    }
    .fav {
      padding: 10px;
      cursor: pointer;
      font-size: 20px;
    }
  }
</style>
