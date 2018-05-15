<template>
  <div id="app">
    <header class="header">
      <h2 class="main-heading">¡Estamos preparando la mejor experiencia de compra sólo para ti!</h2>
    </header>
    <section class="info">
      <p class="info-text">Estamos trabajando muy duro para ofrecerte la mejor experiencia con nuestra nueva tienda. Amarás Vivatecno tanto cómo nosotros.</p>
    </section>
    <subscribe />
  </div>
</template>

<script>
import Subscribe from './components/Subscribe.vue'

export default {
  name: 'App',
  components: {
    subscribe: Subscribe
  }
}
</script>

<style src="./sass/theme.sass" lang="sass"></style>
