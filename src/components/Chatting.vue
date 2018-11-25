<template>
  <li class="chatting">{{ history }}</li>
</template>
<script>
export default {
  name: 'Chatting',
  props: {
    history: {
      type: String
    }
  }
}
</script>
<style scoped>
  .chatting {
    text-align: left;
  }
</style>
