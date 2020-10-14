<template>
  <div>
    <q-item
      clickable
      v-ripple
      tag="a"
      to="/broadcast"
      active-class="my-menu-link"
    >
      <q-item-section avatar>
        <q-icon name="fa fa-users" size="18px" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-bold">Users</q-item-label>
        <q-item-label caption>Todos Usuários</q-item-label>
      </q-item-section>
    </q-item>
 <q-expansion-item
    expand-separator
    icon="fas fa-user-plus"
    label="Novo Contato"
    caption="Pesquise um Contato"
    header-class="text-green-14"
  >
    <q-card class="bg-dark">
      <q-card-section class="q-py-sm">
        <q-input
          color="green-14"
          borderless
          dense
          v-model="nome"
          label="Digite um Nome"
        >
          <template v-slot:append>
            <q-btn dense round @click="buscarContatos(nome)" outline text-color="positive" icon="search"/>
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="q-px-none q-pa-none">
        <q-list separator>
          <template v-for="user in getContatos" >
            <q-item v-bind:key="user.id">
              <q-item-section avatar style="min-width: 40px !important">
                <q-icon name="far fa-user-circle" size="30px" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-bold text-white">{{
                  user.nome
                }}</q-item-label>
                <q-item-label caption>{{ user.id }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  class="no-shadow"
                  @click="setOpenChats(user)"
                  color="green-14"
                  dense
                  outline
                  round
                  icon="check"
                />
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-card-section>
    </q-card>
  </q-expansion-item>
    <q-list separator>
      <template v-for="user in getOpenChats">
        <q-slide-item @right="rmvChat(user)" color="grey-7" v-bind:key="user.id" right-color="negative">
        <template v-slot:right>
          <div class="row items-center q-col-gutter-md">
          <div class="text-white text-bold">Remover</div>
          <q-icon name="close" />
          </div>
        </template>
        <q-item
          class="dark"
          clickable
          v-ripple
          tag="a"
          :to="`/chat/${user.id}`"
          active-class="my-menu-link"
          @click="setChatAtual(user)"
        >
          <q-item-section avatar >
            <q-icon name="far fa-user-circle" size="30px" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-bold text-white"
              > {{ user.nome }}</q-item-label>
            <q-item-label caption>{{ user.id }}</q-item-label>
          </q-item-section>
        </q-item>
        </q-slide-item>
      </template>
    </q-list>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      nome: ''
    }
  },
  computed: {
    ...mapGetters(['getOpenChats', 'getContatos'])
  },
  methods: {
    ...mapActions(['buscarContatos', 'escutarBuscaContatos', 'escutarMensagemPrivada']),
    ...mapMutations(['setOpenChats', 'rmvChat', 'setChatAtual'])
  },
  mounted () {
    this.escutarBuscaContatos()
    this.escutarMensagemPrivada()
  }
}
</script>

<style scoped>
.q-item__label {
  text-align: left;
}
.my-menu-link {
  color: rgb(43, 55, 226);
}
</style>
