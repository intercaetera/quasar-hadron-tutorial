<template>
  <q-page padding>
    <form @submit.prevent='register()'>
      <q-field icon='person'>
        <q-input v-model='username' float-label='Username' />
      </q-field>
      <q-field icon='vpn_key'>
        <q-input v-model='password' float-label='Password' type='password' />
      </q-field>
      <q-field icon='vpn_key'>
        <q-input v-model='repeatPassword' float-label='Repeat password' type='password' />
      </q-field>
      <q-field>
        <q-btn color='primary' class="full-width" :loading="loading" type="submit">Register</q-btn>
      </q-field>
    </form>
  </q-page>
</template>

<script>
import auth from '../auth';

export default {
  methods: {
    register() {
      if (this.password !== this.repeatPassword) {
        this.$q.notify({ type: 'negative', message: 'Passwords do not match.' });
        return;
      }

      this.loading = true;

      auth.register(this.username, this.password).then(err => {
        this.loading = false;

        if (err) {
          this.$q.notify({ type: 'negative', message: err });
          return;
        }

        this.$q.notify({ type: 'positive', message: 'You have been successfully registered.' });
        this.$router.push('/');
      });
    },
  },
  data() {
    return {
      username: '',
      password: '',
      repeatPassword: '',
      loading: false,
      auth,
    };
  },
};
</script>

<style lang='stylus' scoped>
button
  margin-top 3em
</style>
