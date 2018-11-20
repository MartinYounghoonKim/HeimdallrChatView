<template>
  <div class="HeimdallrChat">
    <h1>{{ greet }}</h1>
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

    <div class="scroll">
      <ul>
        <li v-for="history in chatHistory" v-bind:key="history">{{ history }}</li>
      </ul>
    </div>

    <br>

    <b-form-input id="input1" v-model="message" placeholder="Chat Message Here : Enter" @keyup.enter.native="submit"></b-form-input>
  </div>
</template>

<script>

export default {
  name: 'HeimdallrChat',
  mounted () {
    this.scrollToEnd()
  },
  updated () {
    this.scrollToEnd()
  },
  methods: {
    scrollToEnd () {
      var container = document.querySelector('.scroll')
      var scrollHeight = container.scrollHeight
      container.scrollTop = scrollHeight
    },
    join () {
      if (this.WS) {
        alert('Already connection opened')
        return
      }

      this.WS = new WebSocket('ws://' + this.server + '/' + this.roomNumber)
      this.WS.onopen = () => {
        var msg = { msgType: 'system', text: 'join', userId: this.nickname, date: Date.now() }
        this.WS.send(JSON.stringify(msg))
      }

      this.WS.onmessage = (event) => {
        var msg = JSON.parse(event.data)
        var time = new Date(msg.date)
        this.chatHistory.push(`[ ${time.toLocaleTimeString()} ]( ${msg.userId} ) ${msg.text}\n`)
      }
    },

    leave () {
      if (this.WS) {
        var msg = {
          msgType: 'system',
          userId: this.nickname,
          date: Date.now(),
          text: 'leave'
        }

        var time = new Date(msg.date)
        this.chatHistory.push(`[ ${time.toLocaleTimeString()} ]( ${this.nickname} ) ${msg.text}\n`)

        this.WS.send(JSON.stringify(msg))
        this.WS.close()
        this.WS = null
      } else {
        alert('Already connection closed')
      }
    },

    submit (event) {
      if (event.which === 13) {
        var msg = { msgType: 'user', text: this.message, userId: this.nickname, date: Date.now() }
        this.message = ''
        this.WS.send(JSON.stringify(msg))
      }
    }
  },

  data () {
    return {
      WS: '',
      server: '127.0.0.1:8000',
      roomNumber: '1212',
      nickname: 'caleybot',
      message: '',
      chatHistory: ['[ 오후 9:15:23 ]( caleybot ) this is a sample text#1', '[ 오후 9:15:23 ]( caleybot ) this is a sample text#2'],
      greet: 'Welcome to Heimdallr chat App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: bolder;
}

ul {
  list-style:none;
  margin:0;
  padding:0;
}

li {
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  border : 0;
  float: left;
  width: 100%;
}

.scroll{
  width: auto;
  max-height: 550px;
  overflow: scroll;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
