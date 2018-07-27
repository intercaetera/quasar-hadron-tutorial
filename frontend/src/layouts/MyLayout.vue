<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary">
        <q-btn flat to="/">
          <q-icon name="home" />
          <q-tooltip>Home</q-tooltip>
        </q-btn>

        <q-btn flat to="/publish" v-if="auth.loggedIn()">
          <q-icon name="edit" />
          <q-tooltip>Publish</q-tooltip>
        </q-btn>

        <q-toolbar-title>
          Particle Stack
          <span v-if="auth.loggedIn()" slot="subtitle">{{ username() }}</span>
        </q-toolbar-title>

        <q-btn flat to='/login' v-if="!auth.loggedIn()">
          <q-icon name="input" />
          <q-tooltip>Log In</q-tooltip>
        </q-btn>

        <q-btn flat to='/register' v-if="!auth.loggedIn()">
          <q-icon name="person_add" />
          <q-tooltip>Sign Up</q-tooltip>
        </q-btn>

        <q-btn flat to='/' v-if="auth.loggedIn()" @click='logout()'>
          <q-icon name="power_settings_new" />
          <q-tooltip>Log Out</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import auth from '../auth';

export default {
  name: 'MyLayout',
  data() {
    return {
      auth,
    };
  },
  mounted() {
    const token = localStorage.getItem('Authorization');
    if (token) {
      auth.authorize(token);
    }
  },
  methods: {
    logout() {
      auth.logout();
      this.$q.notify({ type: 'info', message: 'You have been successfully logged out.' });
    },
    username() {
      return auth.getUser()
        ? auth.getUser().name
        : null;
    },
  },
};
</script>

<style>
</style>
