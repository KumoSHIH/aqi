<script>
import HelloWorld from '@/components/HelloWorld.vue';
import Select from '@/components/Select.vue';
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';

export default {
  name: 'HomeView',
  components: {
    Select,
  },
  setup() {
    const data = reactive({});
    const cityList = reactive([]);
    
    onMounted(() => {
      const url = 'https://data.epa.gov.tw/api/v2/aqx_p_02';
      const key = '19843a99-912f-4804-9d4b-3fa43961f7a0';

      axios.get(`${url}?api_key=${key}`)
        .then((res) => {
          // console.log(res);
          data.value = res.data.records;
        })
        .catch((error) => {
          console.log(error);
        })
    })

    return {
      data
    }
  },
}
</script>

<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Select />
  </div>
</template>


