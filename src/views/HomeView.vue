<script setup>
  import HelloWorld from '@/components/HelloWorld.vue';
  import Select from '@/components/Select.vue';
  import axios from 'axios';
  import { onMounted, reactive, ref } from 'vue';


  const data = [];
  const location = [];
  const filterText = ref('all');

  onMounted(() => {
    getData();
  })

  let getData = async () => {
    const url = 'https://data.epa.gov.tw/api/v2/aqx_p_02';
    const key = '19843a99-912f-4804-9d4b-3fa43961f7a0';

    const res = await axios.get(`${url}?api_key=${key}`)
      .then((res) => {
        Object.assign(data, res.data.records);

        data.forEach((el) => {
          if(location.indexOf(el.county) === -1) location.push(el.county)
        })
        
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // console.log(location);

</script>

<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Select :location="location" />
  </div>
</template>


