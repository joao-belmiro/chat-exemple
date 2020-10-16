import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userName: '',
    socket: null,
    conectado: null,
    chatAtual: null,
    broadcast: [],
    openChats: [],
    contatos: []
  },
  getters: {
    getConectado (state) {
      return state.conectado
    },
    getSocket (state) {
      return state.socket
    },
    getContatos (state) {
      return state.contatos
    },
    getOpenChats (state) {
      return state.openChats
    },
    getBroadcast (state) {
      return state.broadcast
    },
    getUserName (state) {
      return state.userName
    }
  },
  mutations: {
    setConectado (state, conectado) {
      state.conectado = conectado
    },
    setSocket (state, socketConnection) {
      state.socket = socketConnection
    },
    setContatos (state, contatos) {
      state.contatos = contatos
    },
    setUserName (state, name) {
      state.userName = name
    },
    setBroacast (state, message) {
      const c = state.broadcast.length
      if (c === 0) {
        state.broadcast.push(message)
      } else if (state.broadcast[c - 1].de === message.de) {
        const m = state.broadcast[c - 1].mensagem
        Array.isArray(m) ? state.broadcast[c - 1].mensagem = [...m, message.mensagem] : state.broadcast[c - 1].mensagem = [m, message.mensagem]
      } else if (state.broadcast[c - 1].de !== message.de) {
        state.broadcast.push(message)
      }
    },
    setOpenChats (state, chat) {
      const index = state.openChats.findIndex(c => c.nome === chat.nome)
      const ac = state.openChats.length
      if (index === -1 && state.userName !== chat.nome) state.openChats.push({ id: ac + 1, nome: chat.nome, mensagens: [] })
    },
    rmvChat (state, contact) {
      state.openChats = state.openChats.filter(chat => chat.id !== contact.id)
      if (router.currentRoute.name !== 'broadcast') router.push({ path: '/broadcast' })
    },
    setMensagem (state, mensagem) {
      const index = state.openChats.findIndex(c => c.nome === mensagem.destino)
      state.openChats[index].mensagens.push({ de: mensagem.de, id: mensagem.id, mensagem: mensagem.mensagem })
    },
    setMensagemChat (state, mensagem) {
      const addInital = function (msg) {
        state.openChats.unshift({ id: msg.idRemetente, nome: msg.enviou, mensagens: [] })
        state.openChats[0].mensagens.push({ de: msg.enviou, id: msg.id, mensagem: msg.mensagem })
      }
      if (state.openChats.length === 0) {
        addInital(mensagem)
      } else {
        const index = state.openChats.findIndex(chat => chat.nome === mensagem.enviou)
        index === -1 && state.openChats.length !== 0 ? addInital(mensagem) : state.openChats[index].mensagens.push({ de: mensagem.enviou, id: mensagem.id, mensagem: mensagem.mensagem })
      }
    },
    setChatAtual (state, chat) {
      state.chatAtual = chat
      console.log(state.chatAtual)
    }
  },
  actions: {
    enviarBroadcast ({ state, commit }, mensagem) {
      state.socket.emit('broadcast', mensagem)
      commit('setBroacast', mensagem)
    },
    escutarBroadcast ({ state, commit }) {
      state.socket.on('broadcast', function (data) {
        console.log(data)
        commit('setBroacast', data)
      })
    },
    buscarContatos ({ state }, nome) {
      state.socket.emit('listar', nome)
    },
    escutarBuscaContatos ({ state, commit }) {
      state.socket.on('listar', function (data) {
        commit('setContatos', data)
      })
    },
    mensagemPrivada ({ state, commit }, mensagem) {
      console.log(mensagem)
      state.socket.send(`/app/chat/${mensagem.destino}`, JSON.stringify({ id: mensagem.id, mensagem: mensagem.mensagem, enviou: mensagem.de }), {})
      commit('setMensagem', mensagem)
    },
    escutarMensagemPrivada ({ state, commit }) {
      state.socket.subscribe(`/topic/mensagem/${state.userName}`, function (data) {
        commit('setMensagemChat', JSON.parse(data.body))
      })
    }
  },
  modules: {
  }
})
