<script setup>
  import Select from '@/components/Select.vue';
  import Card from '@/components/Card.vue';
  import axios from 'axios';
  import { computed, onMounted, reactive, ref, watch } from 'vue';


  const data = reactive([]); // 全部資料
  const county = reactive([]); // 城市
  const filterText = ref('ALL'); // 篩選的城市字串

  // watch(filterText, (newVal) => {
  //   const newArr = data.filter((el) => el.county === newVal);
  //   filterData = newArr;
  // })

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
    filterText.value = val
  }

  // 篩選城市
  const filterData = computed(() => {
    return data.filter(item => 
      filterText.value === 'ALL' 
      ? true 
      : filterText.value === item.county
    )
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


