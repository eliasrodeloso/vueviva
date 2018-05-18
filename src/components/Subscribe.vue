<template>
  <div class="sub">
    <h4 @click="showForm = !showForm">Unete a la lista de espera</h4>
    <transition name="fade">
      <form v-show="showForm" novalidate @submit="handleSubmit" class="sub-form" target="_blank">
        <EmailInput v-model="user.email" @onError="onErrorHandler" />
        <div class="sub-field-wrapper">
          <input v-model="user.fname" placeholder="Escribe tu Nombre" type="text" class="sub-field sub-fname">
        </div>
        <div class="sub-field-wrapper">
          <input v-model="user.lname" placeholder="Escribe tu Apellido" type="text" class=" sub-field sub-lname">
        </div>
        <button class="sub-submit" :disabled="!isValidForm" type="submit"> <span v-show="!loading" class="button-text"> Avísame </span> <BallScaleMultipleLoader v-show="loading"/></button>
      </form>
    </transition>
    <h6 v-show="showForm" class="small">Prometemos no enviarte SPAM</h6>
  </div>
</template>

<script>
import axios from 'axios'
import EmailInput from './commons/input/InputEmail.vue'

let client = axios.create({
  baseURL: 'https://vivatecnomc.herokuapp.com/api'
})

export default {
  name: 'Subscribe',
  data() {
    return {
      user: {
        email: '',
        fname: '',
        lname: ''
      },
      showForm: false,
      isValidForm: false,
      loading: false
    }
  },
  methods: {
    handleSubmit(evt) {
      evt.preventDefault()
      if (this.isValidForm) {
        this.loading = true
        let fields = {
          email_address: this.user.email,
          status: 'subscribed',
          merge_fields: {
            FNAME: this.user.fname,
            LNAME: this.user.lname
          }
        }
        client
          .post('/lists/members', fields)
          .then(response => {
            if (response.status === 200) {
              if (response.data.status === 'subscribed') {
                this.$el.querySelectorAll('.button-text')[0].innerText =
                  '¡Listo!'
                this.loading = false
              } else {
                this.$el.querySelectorAll('.button-text')[0].innerText = 'Upss!'
                this.loading = false
              }
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    onErrorHandler(hasError) {
      this.isValidForm = !hasError
    }
  },
  components: {
    EmailInput
  }
}
</script>
