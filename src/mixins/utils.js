export default {
  methods: {
    nSucesso (mensagem) {
      this.$q.notify({
        type: 'positive',
        position: 'bottom-left',
        progress: true,
        timeout: 4000,
        textColor: 'white',
        message: mensagem,
        actions: [{ color: 'white', icon: 'close', size: 'sm', round: true }]
      })
    },
    gerarId (max) {
      const result = []
      const hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

      for (let n = 0; n < max; n++) {
        result.push(hexRef[Math.floor(Math.random() * 16)])
      }
      return result.join('')
    }
  }
}
