<script>

export default {
  props: {
    location: {
      type: Array,
      default: () => [],
    }
  },
  emit: ['filterEvent'],
  setup(props) {
    return {
      props
    }
  }
}

</script>

<template>
  <div>
    <select name="" id="" @change="$emit('filterEvent')">
      <option value="">請選擇</option>
      <option v-for="item in location" :key="item" :value="item">{{ item }}</option>
    </select>
  </div>
</template>

<style scoped lang="scss">

</style>