<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <login />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import login from '@/views/login/login.vue'

export default defineComponent({
  name: 'Home',
  components: {
    login
  }
})
</script>
