<template>
  <div class="sub">
    <h4>Avísame cuándo esté listo</h4>
    <form validate class="sub-form">
      <div class="sub-email-wrapper">
        <input class="sub-email" type="email" name="email">
      </div>
      <button class="sub-submit" type="submit">Avísame</button>
    </form>
    <h6 class="small">Prometemos no enviarte SPAM</h6>
  </div>
</template>

<script>
export default {
  name: 'Subscribe'
}
</script>
