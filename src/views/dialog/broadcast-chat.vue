<template>
  <div class="q-pa-md">
    <q-card bordered square flat class="q-py-md card-container">
      <q-card-section class="row items-center q-gutter-md q-py-none">
        <q-icon name="fas fa-comments" size="30px" color="white" />
        <div class="text-bold text-body1 text-white">Canal Público</div>
      </q-card-section>
      <q-scroll-area
        class="q-pl-md scroll-size"
        :bar-style="barStyle"
        :thumb-style="thumbStyle"
      >
		<div v-for="user in getBroadcast" :key="user.id" class="q-py-sm">
          <q-chat-message
            class="q-px-md  text-weight-medium text-body2"
            :name="`<strong>${user.de}</strong>`"
            :text="Array.isArray(user.mensagem) ? user.mensagem : [`${user.mensagem}`]"
            :sent="getUserName === user.de"
            :bg-color="getUserName === user.de ? 'primary' : 'green-14'"
             text-color="white"/>
        </div>
      </q-scroll-area>
    </q-card>
    <q-card flat bordered square>
      <q-form @submit="enviarBroadcast({de: getUserName, id: gerarId(Math.floor(1 + Math.random() * msg.length)), mensagem: msg })">
        <q-card-section
          class="row items-center q-gutter-sm no-wrap q-px-md justify-end">
          <div class="col-sm-11 col-md-11 col-xs-10 q-pl-md">
            <q-input
              color="primary"
              rounded
              dense
              outlined
              v-model="msg"
              label="Digite uma mensagem"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="mail" />
              </template>
            </q-input>
          </div>
          <div>
            <q-btn
              round
              type="submit"
              color="primary"
              icon="send"
              text-color="white"
            />
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import utils from '../../mixins/utils.js'
export default {
  mixins: [utils],
  data () {
    return {
      msg: '',
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '3px',
        opacity: 0.75
      },

      barStyle: {
        right: '3px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '6px',
        opacity: 0.5
      }
    }
  },
  computed: {
    ...mapGetters(['getBroadcast', 'getUserName'])
  },
  methods: {
    ...mapActions(['enviarBroadcast', 'escutarBroadcast'])
  },
  mounted () {
    this.escutarBroadcast()
  }
}
</script>
<style scoped>
.scroll-size {
  width: 100%;
  max-width: 2560px;
  height: 550px;
  max-height: 1000px;
}
.card-container {
  height: 100%;
  min-height: 500px;
  max-height: 1000px;
}
</style>
