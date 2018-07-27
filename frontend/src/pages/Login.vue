<template>
  <q-page padding>
    <form @submit.prevent='login()'>
      <q-field icon='person'>
        <q-input v-model='username' float-label='Username' />
      </q-field>
      <q-field icon='vpn_key'>
        <q-input v-model='password' float-label='Password' type='password' />
      </q-field>
      <q-field>
        <q-btn color='primary' class="full-width" :loading="loading" type="submit">Login</q-btn>
      </q-field>
    </form>
  </q-page>
</template>

<script>
import auth from '../auth';

export default {
  methods: {
    login() {
      // Quasar allows us to add loading spinners to our buttons
      // so we bind the loading property to the attribute on q-btn.
      this.loading = true;

      // The login method returns a promise.
      auth.login(this.username, this.password).then(err => {
        this.loading = false;

        // If 'then' returns anything it means there's an error
        // and we can't log the user in.
        if (err) {
          // We use Quasar's notify plugin to display these neat
          // notifications.
          this.$q.notify({ type: 'negative', message: err });
          return;
        }

        // Otherwise we let the user know they've been logged in...
        this.$q.notify({ type: 'positive', message: 'You have been successfully logged in.' });

        // ...and redirect them to the index.
        this.$router.push('/');
      });
    },
  },
  data() {
    return {
      username: '',
      password: '',
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
