<script setup>
  import Select from '@/components/Select.vue';
  import Card from '@/components/Card.vue';
  import axios from 'axios';
  import { computed, onMounted, reactive, ref, watch } from 'vue';


  const data = []; // 全部資料
  const county = reactive([]); // 城市(要用響應性綁定)
  const filterText = ref('ALL'); // 篩選的城市字串
  let filterData = reactive([]); // 篩選的城市陣列

  watch(filterText, (newVal) => {
    const newArr = data.filter((el) => el.county === newVal);
    filterData = newArr;
  })

  onMounted(() => {
    getData();
  })

  // 取得 API 資料
  let getData = async () => {
    const url = 'https://data.epa.gov.tw/api/v2/aqx_p_02';
    const key = '19843a99-912f-4804-9d4b-3fa43961f7a0';

    const res = await axios.get(`${url}?api_key=${key}`)
      .then((res) => {
        Object.assign(data, res.data.records);
        Object.assign(filterData, res.data.records);
        // 存入所有城市資料
        data.forEach((el) => {
          if(county.indexOf(el.county) === -1) county.push(el.county)
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // 內元件(select) 向外傳遞的事件
  let filterHandler = (val) => {
    filterText.value = val
  }

  // 篩選城市
  let filterCounty = computed(() => {
    return data.filter((el) => filterText === 'ALL' ? data : el.county === filterText)
  })

</script>

<template>
  <div class="home">
    <Select
    :county="county" 
    @filterEvent="filterHandler"/>
    <div class="wrap">
      <h2>{{ filterText }}</h2>
      <div class="card-container">
        <Card 
          :filterData="filterData" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .home{
    margin: 50px 0;
  }
  .wrap {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    position: relative;
  }
  h2 {
    position: absolute;
    left: 0;
    top: 10px;
    width: 200px;
    flex-shrink: 0;
    font-size: 40px;
  }
  .card-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-left: 200px;
  }
</style>


