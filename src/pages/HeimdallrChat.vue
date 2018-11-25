<template>
  <div class="HeimdallrChat">
      <h1>Welcome to Heimdallr chat App</h1>
      <access-information @join="join"
                          @leave="leave"/>
      <chatting-list :chatHistory="chatHistory"/>
      <br>
      <chatting-form @submit="submit"/>
  </div>
</template>

<script>
import AccessInformation from '../components/AccessInformation'
import ChattingList from '../components/ChattingList'
import ChattingForm from '../components/ChattingForm'

export default {
  components: {
    AccessInformation,
    ChattingList,
    ChattingForm
  },
  name: 'HeimdallrChat',
  methods: {
    makeMessageFormat (type, text) {
      this.messageJson = {
        msgType: type,
        text: text,
        userId: this.nickname,
        date: new Date().toLocaleTimeString()
      }
      return this.messageJson
    },
    join ({ server, roomNumber }) {
      if (this.WS) {
        alert('Already connection opened')
        return
      }

      /* create socket */
      this.WS = new WebSocket(`ws://${server}/${roomNumber}`)
      this.WS.onopen = () => {
        var msg = this.makeMessageFormat('system', 'join')
        this.sendSocketMessage(JSON.stringify(msg))
      }

      /* onmessage event */
      this.WS.onmessage = (event) => {
        var msg = JSON.parse(event.data)
        this.chatHistory.push(`[ ${msg.date} ]( ${msg.userId} ) ${msg.text}\n`)
      }
    },
    leave (nickname) {
      if (this.WS) {
        var msg = this.makeMessageFormat('system', 'leave')
        this.chatHistory.push(`[ ${msg.date} ]( ${nickname} ) ${msg.text}\n`)

        this.sendSocketMessage(JSON.stringify(msg))
        this.WS.close()
        this.WS = null
      } else {
        alert('Already connection closed')
      }
    },
    sendSocketMessage (message) {
      const messageToString = JSON.stringify(message)
      this.WS.send(messageToString)
    },
    submit (message) {
      if (!this.WS) {
        alert('You must first connect to the room.')
      } else {
        var msg = this.makeMessageFormat('user', message)
        this.sendSocketMessage(JSON.stringify(msg))
      }
    }
  },

  data () {
    return {
      WS: '',
      messageJson: {
        msgType: '',
        text: '',
        userId: '',
        date: ''
      },
      liveMessage: '',
      chatHistory: [
        '[ 오후 9:15:23 ]( caleybot ) this is a sample text#1',
        '[ 오후 9:15:23 ]( caleybot ) this is a sample text#2'
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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

.HeimdallrChat {
  height: 100%;
}
</style>
