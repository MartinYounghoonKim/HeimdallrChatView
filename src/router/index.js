import Vue from 'vue'
import Router from 'vue-router'
import HeimdallrChat from '@/components/HeimdallrChat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HeimdallrChat',
      component: HeimdallrChat
    }
  ]
})
