<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { AqiService } from '@/services/aqi.service';

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  setup() {
    const data = reactive({});
    
    onMounted(() => {
      const url = 'https://data.epa.gov.tw/api/v2/aqx_p_02';
      const key = '19843a99-912f-4804-9d4b-3fa43961f7a0';

      axios.get(`${url}?api_key=${key}`)
        .then((res) => {
          // console.log(res);
          data.value = res;
          console.log(data);
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
