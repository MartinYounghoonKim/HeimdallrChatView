<template>
  <b-container class="bv-example-row bv-example-row-flex-cols">
      <b-card bg-variant="light">
         <b-form-group horizontal
                       breakpoint="lg"
                       label="Access information"
                       label-size="lg"
                       label-class="font-weight-bold pt-0"
                       class="mb-0">
            <b-form-group horizontal
                          label="server:"
                          label-class="text-sm-right"
                          label-for="server">
               <b-form-input v-model="server"></b-form-input>
            </b-form-group>
            <b-form-group horizontal
                          label="room number:"
                          label-class="text-sm-right"
                          label-for="roomNumber">
               <b-form-input v-model="roomNumber"></b-form-input>
            </b-form-group>
            <b-form-group horizontal
                          label="nickname:"
                          label-class="text-sm-right"
                          label-for="nickname">
               <b-form-input v-model="nickname"></b-form-input>
            </b-form-group>
         </b-form-group>
      </b-card>
      <b-card>
         <div style="float: right;">
            <b-button @click="join">JOIN</b-button>
            <b-button @click="leave">LEAVE</b-button>
         </div>
      </b-card>
  </b-container>
</template>
<script>
export default {
  name: 'AccessInformation',
  data () {
    return {
      server: '127.0.0.1:8000',
      roomNumber: '1212',
      nickname: 'caleybot'
    }
  },
  methods: {
    join () {
      const {server, roomNumber} = this
      this.$emit('join', {server, roomNumber})
    },
    leave () {
      const {nickname} = this
      this.$emit('leave', nickname)
    }
  }
}
</script>
<style>

</style>
