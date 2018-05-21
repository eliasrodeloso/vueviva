<template>
  <div id="app">
    <header class="header">
      <h2 class="main-heading">¡Estaremos de vuelta pronto!</h2>
    </header>
    <section class="info">
      <p class="info-text">Estamos trabajando para ofrecerte la mejor experiencia con nuestra nueva tienda. Amarás <span class="company-name">Vivatecno</span> tanto cómo nosotros.</p>
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
  },
  metaInfo: {
    title: 'Bienvenido | Vivatecno',
    link: [
      {
        rel: 'favicon',
        href: require('@/assets/img/favicon.ico'),
        type: 'image/x-icon'
      }
    ]
  },
  mounted() {
    setTimeout(() => {
      document.querySelectorAll('.loading-backdrop')[0].classList.add('animate')
    }, 2500)
    setTimeout(() => {
      document.querySelectorAll('.loading-backdrop')[0].classList.add('hide')
    }, 3500)
  }
}
</script>

<style src="./sass/theme.sass" lang="sass"></style>
