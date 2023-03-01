<script>
import { toRaw, onMounted, reactive, ref, computed } from 'vue';

export default {
  props: {
    location: {
      type: Array,
      default: () => [],
    }
  },
  setup(props) {
    return {
      props
    }
  }
}

</script>

<template>
  <div>
    <select name="" id="">
      <option value="">請選擇</option>
      <option v-for="item in props.location" :key="item" :value="item">{{ item }}</option>
    </select>
  </div>
</template>

<style scoped lang="scss">

</style>