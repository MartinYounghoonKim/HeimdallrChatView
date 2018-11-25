<template>
  <div>
    <b-form-input id="input1"
                  v-model="liveMessage"
                  placeholder="Chat Message Here : Enter"
                  @keyup.enter.native="submit"/>
  </div>
</template>
<script>
export default {
  name: 'ChattingForm',
  data () {
    return {
      liveMessage: ''
    }
  },
  methods: {
    submit () {
      this.$emit('submit', this.liveMessage)
      this.liveMessage = ''
    }
  }
}
</script>
<style>

</style>
