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
import { mapMutations, mapState } from 'vuex'
import io from 'socket.io-client'
import utils from '../mixins/utils.js'
export default {
  mixins: [utils],
  data () {
    return {
      name: '',
      client: io.connect('ws://localhost:8083')
    }
  },
  computed: {
    ...mapState(['message', 'socket'])
  },
  methods: {
    ...mapMutations(['setSocket', 'setUserName']),
    register () {
      this.client.emit('registro', this.name)
      this.setUserName(this.name)
      this.$router.push({ path: '/broadcast' })
    }
  },
  mounted () {
    this.client.on('connection', (data) => {
      this.nSucesso(data)
    })
  },
  created () {
    this.setSocket(this.client)
    console.log(this.socket)
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
