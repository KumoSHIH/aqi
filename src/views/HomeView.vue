<script setup>
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import { useStore } from 'vuex';
  import axios from 'axios';
  import Select from '@/components/Select.vue';
  import Card from '@/components/Card.vue';
  import Pagination from '@/components/Pagination.vue';


  const data = reactive([]); // 全部資料
  const county = reactive([]); // 城市
  const filterText = ref('ALL'); // 篩選的城市字串
  const num = ref(0); // 城市數量
  const store = useStore();

  onMounted(() => {
    getData();
  })

  // 取得 API 資料
  let getData = async () => {
    const url = 'https://data.epa.gov.tw/api/v2/aqx_p_432';
    const key = '19843a99-912f-4804-9d4b-3fa43961f7a0';

    const res = await axios.get(`${url}?api_key=${key}`)
    // console.log(res.data.records)

    Object.assign(data, res.data.records)

    res.data.records.forEach(item => {
      if (county.indexOf(item.county) === -1) {
        county.push(item.county)
      }
    })
  }

  // 內元件(select) 向外傳遞的事件
  let filterHandler = (val) => {
    filterText.value = val;
    store.commit('initNum')
  }

  // 篩選城市
  const filterData = computed(() => {
    return data.filter((item, index) => 
      filterText.value === 'ALL' 
      ? true 
      : filterText.value === item.county
    )
  })

  // 取得頁數
  const page = computed(() => {
    const arr = reactive([]);
    
    data.filter((item) => {
      if(filterText.value === 'ALL') num.value = data.length
      else if(filterText.value === item.county) {
        arr.push(item);
        num.value = arr.length
      }
    })

    return Math.ceil(num.value / 6)
  })

  // 當前頁碼
  const currentNum = computed(() => store.getters.num)

  // 初始化頁碼
  const initNum = computed(() => {
    store.commit('initNum')
  })
</script>

<template>
  <div class="home">
    <h1>空氣品質指標(AQI)</h1>
    <Select
      :county="county" 
      @filterEvent="filterHandler"/>
    <div class="wrap">
      <div class="content-left">
        <h2>{{ filterText }}</h2>
        <p>{{ num }} 個城市</p>
      </div>
      <div class="content-right">
        <div class="card-container">
          <Card 
            :filterData="filterData"
            :current="currentNum"/>
        </div>
        <Pagination 
          :page="page"
          />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '../assets/scss/_mixin.scss';
  body {
    overflow-x: hidden;
  }
  .home{
    margin: 50px 0;
  }
  h1 {
    font-size: 36px;
    font-weight: bold;
    padding-bottom: 50px;
    @include rwdmax(600) {
      padding-bottom: 30px;
    }
  }
  .wrap {
    max-width: 800px;
    width: 100%;
    margin: 20px auto 0;
    display: flex;
    justify-content: center;
    position: relative;
    @include rwdmax(600) {
      flex-direction: column;
    }
  }
  .content-left {
    position: absolute;
    left: 0;
    top: 10px;
    width: 200px;
    flex-shrink: 0;
    text-align: left;
    @include rwdmax(600) {
      position: static;
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
    }
  }
  .content-right {
    margin-left: 200px;
    width: 100%;
    @include rwdmax(600) {
      margin-left: 0;
    }
  }
  h2 {
    font-size: 40px;
    padding-bottom: 15px;
    @include rwdmax(600) {
      font-size: 30px;
    }
  }
  .card-container {
    display: flex;
    flex-wrap: wrap;
    @include rwdmax(600) {
      justify-content: center;
    }
  }
</style>


