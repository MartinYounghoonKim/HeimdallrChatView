<template>
  <div class="chatting-list" ref="chattingList">
    <ul>
      <chatting v-for="history in chatHistory"
                v-bind:key="history"
                :history="history"/>
    </ul>
  </div>
</template>
<script>
import Chatting from './Chatting'
export default {
  name: 'ChattingList',
  props: {
    chatHistory: {
      type: Array
    }
  },
  mounted () {
    this.scrollToEnd()
  },
  updated () {
    this.scrollToEnd()
  },
  methods: {
    scrollToEnd () {
      const container = this.$refs.chattingList
      const scrollHeight = container.scrollHeight
      container.scrollTop = scrollHeight
    }
  },
  components: {
    Chatting
  }
}
</script>
<style scoped>
  .chatting-list {
    width: auto;
    max-height: 550px;
    overflow: scroll;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
