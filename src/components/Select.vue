<script>
import { ref } from 'vue';

export default {
  props: {
    county: {
      type: Array,
      default: () => [],
    }
  },
  // 往父組件傳遞事件(選擇的城市)
  emit: ['filterEvent'],
  setup(props) {
    const selectCounty = ref(''); // 存取選擇的城市
    return {
      props,
      selectCounty
    }
  }
}
</script>

<template>
  <div>
    <select name="" id="" 
      v-model="selectCounty"
      @change="$emit('filterEvent', selectCounty)">
      <option value="" disabled>請選擇</option>
      <option v-for="item in county" :key="item" :value="item">{{ item }}</option>
    </select>
    <hr>
  </div>
</template>

<style scoped lang="scss">
  select {
    max-width: 200px;
    width: 100%;
    padding: 10px; 
    border: solid 1px rgba(0,0,0,0.3);
    border-radius: 5px;
  }
</style>