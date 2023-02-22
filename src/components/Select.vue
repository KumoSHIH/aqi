<script setup>
import axios from 'axios';
import { toRaw, onMounted, reactive, ref, computed } from 'vue';

const data = reactive([]);

const cityList = reactive([]);

// const json = ref([]);
let city = ref([]);


// newList.value.forEach((el) => {
//   console.log(el);
// })
// cityList.value = newList.map((el) => el.county === '高雄市')
// console.log(cityList);

onMounted(() => {
  getData();
})



// 取得 api 資料存放
let getData = async () => {
  const url = 'https://data.epa.gov.tw/api/v2/aqx_p_02';
  const key = '19843a99-912f-4804-9d4b-3fa43961f7a0';
  // let setData = await function(res) {
  //   data.value = res.data;
  //   // console.log(data);
  // }

  // await axios.get(`${url}?api_key=${key}`)
  //   .then((res) => {
  //     // console.log(res);
  //     setData(res);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })

  const res = await axios.get(`${url}?api_key=${key}`)
    .then((res) => {
      Object.assign(data, res.data)
      // city = toRaw(data.records)
    })  
    .catch((error) => {
      console.log(error);
    })
}

console.log(data);

const filterData = computed(() => {
  // return city
})


</script>

<template>
  <div>
    <select name="" id="">
      <option value="">123</option>
    </select>
    <p>{{ cityList }}</p>
    <p>{{ filterData }}</p>
  </div>
</template>

<style scoped lang="scss">

</style>