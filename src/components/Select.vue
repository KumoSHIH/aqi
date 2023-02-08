<script>
import axios from 'axios';
import { onMounted, reactive } from 'vue';


export default {
  name: 'Select',
  setup() {
    const data = reactive([]);
    const cityList = reactive([]);

    let newList = [];
    data.forEach((el) => {
      // console.log(el);
      newList.push(el)
    });
    console.log(newList);

    onMounted(() => {
      const url = 'https://data.epa.gov.tw/api/v2/aqx_p_02';
      const key = '19843a99-912f-4804-9d4b-3fa43961f7a0';

      axios.get(`${url}?api_key=${key}`)
        .then((res) => {
          // console.log(res);
          data.value = res.data.records;
          console.log(data.value);
        })
        .catch((error) => {
          console.log(error);
        })
    })
    return {
      cityList
    }
  }
}
</script>

<template>
  <div>
    <select name="" id="">
      <option value="">123</option>
    </select>
    <p>{{ cityList }}</p>
  </div>
</template>

<style scoped lang="scss">

</style>