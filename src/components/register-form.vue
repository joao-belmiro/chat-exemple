<template>
  <div class="full-width column wrap justify-center items-start content-center q-pl-md">
    <h4 class="text-center">Insira um Nome Começar a Conversar</h4>
    <q-form @submit="register" class="row justify-center items-center q-col-gutter-md" style="width:100%; max-width: 600px">
    <div class="col-md-6 col-md-6 col-xs-12">
          <q-input
            dense
            outlined
            v-model="name"
            label="Nome"
            required
          />
    </div>
     <div>
        <q-btn
          type="submit"
          color="primary"
          text-color="white"
          label="Registrar"
          icon="send"
        />
     </div>
    </q-form>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import utils from '../mixins/utils.js'
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
import axios from 'axios'
export default {
  mixins: [utils],
  data () {
    return {
      name: '',
      stomp: null,
      connected: null
    }
  },
  computed: {
    ...mapState(['message', 'socket'])
  },
  methods: {
    ...mapMutations(['setSocket', 'setUserName', 'setMensagemChat']),
    ...mapActions(['escutarMensagemPrivada']),
    register () {
      axios.get(`http://localhost:8082/registro/${this.name}`).then(response => {
        if (response.status === 200) {
          this.setUserName(this.name)
          this.escutarMensagemPrivada()
        }
      })
    }
  },
  created () {
    const socket = new SockJS('http://localhost:8082/chat')
    this.stomp = Stomp.over(socket)
    this.stomp.connect({}, function (frame) {
    })
    this.setSocket(this.stomp)
  }
}
</script>

<style>
.alinhar {
    height: 100%;
    position: relative;
    vertical-align: middle;
}
.container {
  width: 100%;
  height: 600px;
  max-width: 2560px;
}
</style>
