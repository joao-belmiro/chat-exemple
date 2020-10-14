<template>
  <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-dark">
      <q-toolbar>
        <q-btn
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
          color="white"
        />
        <q-toolbar-title
          >Seja Bem-Vindo {{ getUserName.toUpperCase() }}</q-toolbar-title
        >
        <q-btn
          @click="icon = true"
          round
          flat
          text-color="green-14"
          icon="fas fa-sign-out-alt"
          size="11px"
        >
          <q-tooltip>
            <div class="text-body2">Encerrar Sessão</div>
          </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="280"
      :breakpoint="500"
      content-class="Dark"
      bordered
    >
      <left-menu />
      <div class="fixed-bottom-left q-pa-md">
        <a href="https://github.com/joao-belmiro" target="#">
          <q-icon color="white" name="fab fa-github" size="1.8em">
            <q-tooltip>
              <div class="text-body2">Repositório do Autor</div>
            </q-tooltip>
          </q-icon>
        </a>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
    <q-dialog v-model="icon" persistent>
      <q-card class=" bg-grey-9">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">LOGOUT</div>
        </q-card-section>
        <q-card-section>
          <div class="row justify-center q-pb-md">
            <q-icon name="fas fa-sign-out-alt" size="80px" color="positive" />
          </div>
          <div class="text-body1 text-center text-weight-medium">
            Ao Sair Todos os seus Dados de Conversas e Contatos Serão Perdidos,
            Tem Certeza Disso ?
          </div>
        </q-card-section>
        <q-card-actions class="q-gutter-md q-pa-md" align="right">
          <q-btn
            outline
            text-color="positive"
            label="Cancelar"
            icon="close"
            v-close-popup
            no-caps
          />
          <q-btn
            color="negative"
            text-color="white"
            label="Sair"
            icon="fas fa-sign-out-alt"
            no-caps
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>
<script>
import leftMenu from '../components/left-menu.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  components: { leftMenu },
  data () {
    return {
      icon: false,
      drawer: true
    }
  },
  computed: {
    ...mapGetters(['getUserName'])
  },
  created () {
    this.$q.dark.set(true)
  }
}
</script>
<style scoped>
</style>
