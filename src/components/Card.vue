<script>
import { computed, ref } from 'vue';

export default {
  props: {
    cardData: {
      type: Object,
      default: (() => {})
    },
    status: {
      type: String,
      default: '良好'
    },
  },
  emit: ['addFocus', 'removeFocus'],
  setup(props) {
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

    return {
      props,
      status
    }
  },
}
</script>

<template>
  <div class="card"
    :class="status(props.status)"
    >
    <div class="card-head">
      <div class="name">
        <h6>{{ cardData.sitename }}</h6>
        <p class="fz-14">{{ cardData.county }}</p>
      </div>
      <div class="fav">
        <font-awesome-icon icon="fa-regular fa-heart"
          v-if="!cardData.isFocus"
          @click="$emit('addFocus', cardData), cardData.isFocus = true"
          />
        <font-awesome-icon icon="fa-solid fa-heart"
          v-else
          @click="$emit('removeFocus', cardData), cardData.isFocus = false"
          />
      </div>
    </div>
    <p>狀態: {{ cardData.status }}</p>
    <p>空氣品質指標(aqi): {{ cardData.aqi }}</p>
    <p>細懸浮微粒(pm2.5): {{ cardData['pm2.5'] }}</p>
    <p>發佈時間: {{ cardData.publishtime }}</p>
  </div>
</template>

<style scoped lang="scss">
  @import '../assets/scss/_mixin.scss';
  @import '../assets/scss/_variable.scss';

  .card {
    max-width: 230px;
    width: 100%;
    margin-right: 20px;
    margin-bottom: 20px;
    padding: 20px;
    box-shadow: 5px 5px 20px rgba(0,0,0,0.1);
    border-radius: 8px;
    &:nth-child(3n){
      margin-right: 0;
    }
    &.status-aqi1 {
      border: solid 3px $color-status1;
    }
    &.status-aqi2 {
      border: solid 3px $color-status2;
    }
    &.status-aqi3 {
      border: solid 3px $color-status3;
    }
    &.status-aqi4 {
      border: solid 3px $color-status4;
    }
    &.status-aqi5 {
      border: solid 3px $color-status5;
    }
    &.status-aqi6 {
      border: solid 3px $color-status6;
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
    .name {
      h6 {
        font-size: 30px;
        @include rwdmax(600) {
          font-size: 24px;
        }
      }
      p {
        margin-left: 2px;
      }
    }
    
    .fav {
      padding: 10px;
      cursor: pointer;
      font-size: 24px;
    }
  }
</style>
