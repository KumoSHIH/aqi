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
  // let filterData = reactive([]); // 篩選的城市
  const num = ref(0); // 城市數量
  const focusData = reactive([]); // 關注的城市
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

    addFocus()
  }

  // 新增關注屬性
  let addFocus = () => {
    data.forEach((item) => item['isFocus'] = false)
  }

  // 內元件(select) 向外傳遞的事件
  let filterHandler = (val) => {
    filterText.value = val;
    store.commit('INIT_NUM')
  }

  // 篩選城市
  const filterData = computed(() => {
    return data.filter((item, index) => 
      filterText.value === 'ALL' 
      ? true 
      : filterText.value === item.county
    )
  })

  // 篩選城市的當前頁碼
  const currentNum = computed(() => store.getters.num)

  // 關注城市的當前頁碼
  const focusCurrentNum = computed(() => store.getters.focusNum)

  // 初始化頁碼
  const initNum = computed(() => store.commit('INIT_NUM'))

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

  // 取得關注城市頁數
  const focusPage = computed(() => Math.ceil(focusData.length / 3))

  // 篩選城市的分頁資料
  const selectFilterData = computed(() => {
    // 固定六筆資料，傳入當前頁碼抓取六筆
    let arr =
      data.filter((item) => 
        filterText.value === 'ALL'
        ? true
        : filterText.value === item.county
      );
  
    return arr.slice((currentNum.value * 6), (currentNum.value * 6 + 6))
  })

  // 關注城市的分頁資料
  const focusFilterData = computed(() => {
    // 固定三筆資料，傳入當前頁碼抓取三筆
    return focusData.slice((focusCurrentNum.value * 3), (focusCurrentNum.value * 3 + 3))
  })

  // store page
  const selectActive = computed(() => {
    store.getters.num
  })

  const focusActive = computed(() => {
    store.getters.focusNum
  })

  const selectPageHandler = (index) => {
    store.commit('SELECT_ACTIVE_NUM', index)
  }

  const focusPageHandler = (index) => {
    store.commit('FOCUS_ACTIVE_NUM', index)
  }

  // 加入關注
  const addFocusHandler = (card) => {
    focusData.push(card)
  }

  // 移除關注
  const removeHandler = (card) => {
    let idx = focusData.findIndex((item) => {
      return item.sitename === card.sitename
    })
    focusData.splice(idx, 1)

    if(focusData.length % 3 === 0) {
      document.querySelector('.page-box.active').click()
    }
  }
</script>

<template>
  <div class="home">
    <h1>空氣品質指標(AQI)</h1>
    <Select
      :county="county" 
      @filterEvent="filterHandler"/>
    <div class="wrap">
      <div class="content-left">
        <h2>關注的城市</h2>
        <p>{{ focusData.length }} 個城市</p>
      </div>
      <div class="content-right">
        <div class="card-container">
          <Card
            v-for="item in focusFilterData"
            :key="item.site"
            :cardData="item"
            :status="item.status"
            @addFocus="addFocusHandler"
            @removeFocus="removeHandler"
          />
        </div>
        <Pagination 
          :page="focusPage"
          :activePage="focusActive"
          @pageHand="focusPageHandler"
          />
      </div>
    </div>
    <div class="wrap">
      <div class="content-left">
        <h2>{{ filterText }}</h2>
        <p>{{ num }} 個城市</p>
      </div>
      <div class="content-right">
        <div class="card-container">
          <Card
            v-for="item in selectFilterData"
            :key="item.site"
            :cardData="item"
            :status="item.status"
            @addFocus="addFocusHandler"
            @removeFocus="removeHandler"
          />
        </div>
        <Pagination 
          :page="page"
          :activePage="selectActive"
          @pageHand="selectPageHandler"
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
    max-width: 1080px;
    width: 90%;
    margin: 20px auto 0;
    display: flex;
    justify-content: center;
    position: relative;
    @include rwdmax(600) {
      flex-direction: column;
      align-items: center;
    }
  }
  .content-left {
    max-width: 200px;
    width: 100%;
    flex-shrink: 0;
    text-align: left;
    @include rwdmax(600) {
      text-align: center;
      margin-bottom: 10px;
    }
  }
  .content-right {
    width: 100%;
  }
  h2 {
    font-size: 36px;
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


