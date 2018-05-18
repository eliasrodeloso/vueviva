<template>
  <div class="sub-field-wrapper">
    <input autofocus @blur="blurHandler" required v-model="email" placeholder="Escribe tu Correo" v-bind:emailText="emailText" class="sub-field sub-email" type="email">
  </div>
</template>
<script>
import Tooltip from 'tooltip.js'

const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  name: 'EmailInput',
  data() {
    return {
      errorMessage: 'Debes escribir un correo válido',
      email: '',
      hasError: false
    }
  },
  model: {
    prop: 'emailText',
    event: 'change'
  },
  props: {
    emailText: {
      type: String,
      required: true
    }
  },
  watch: {
    email() {
      if (
        this.email !== '' &&
        !reEmail.test(String(this.email).toLowerCase())
      ) {
        this.hasError = true
      } else {
        this.hasError = false
        this.$emit('change', this.email)
      }
    },
    hasError() {
      if (this.hasError) {
        this.tooltip.show()
        this.$emit('onError', this.hasError)
      } else {
        this.tooltip.dispose()
        this.$emit('onError', this.hasError)
      }
    }
  },
  methods: {
    blurHandler() {
      if (this.hasError) {
        this.tooltip.show()
      } else {
        if (this.email === '') {
          this.hasError = true
          this.tooltip.show()
        } else {
          this.hasError = false
          this.tooltip.dispose()
        }
      }
    }
  },
  mounted() {
    // Create the tooltip instance
    let ref = this.$el
    this.tooltip = new Tooltip(ref, {
      title: this.errorMessage,
      placement: 'top',
      trigger: 'manual'
    })
  }
}
</script>
