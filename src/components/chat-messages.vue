<template>
  <q-scroll-area
    class="q-pl-md scroll-size"
    :bar-style="barStyle"
    :thumb-style="thumbStyle"
  >
    <div v-for="user in messages" :key="user.id" class="q-py-sm">
      <q-chat-message
        class="q-px-md"
        :name="`<strong>${user.de}</strong>`"
        :text="[`${user.mensagem}`]"
        :sent="userName === user.de"
        :bg-color="userName === user.de ? 'primary' : 'positive'"
        text-color="white"
      />
    </div>
  </q-scroll-area>
</template>
<script>
export default {
  props: ['from', 'messages'],
  data () {
    return {
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
  }
}
</script>

<style>
.scroll-size {
  width: 100%;
  max-width: 1280px;
  height: 600px;
  max-height: 1000px;
}
</style>
