<template>
  <q-page>
    <q-card v-for="(post, i) in posts" :key="i" class="full-width">
      <div class="container">
        <h1 class="q-headline">{{ post.title }}</h1>
        <div class="author-line">Author: {{ post.user.name }}</div>
        <div class="author-line">On: {{ formatDate(post.date) }}</div>
        <div v-html="compile(post.content)" />
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { QSpinnerTail } from 'quasar';
import marked from 'marked';

export default {
  mounted() {
    this.$q.loading.show({ spinner: QSpinnerTail });
    this.$axios.get('/post/get').then(res => {
      this.posts = res.data;
      this.$q.loading.hide();
    }).catch(error => {
      this.$q.notify({ type: 'negative', message: error.response.data.error });
      this.$q.loading.hide();
    });
  },
  methods: {
    compile(raw) {
      return marked(raw, { sanitize: true });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
  data() {
    return {
      posts: [],
    };
  },
};
</script>

<style lang="stylus" scoped>
.container
  max-width 960px
  padding 2em
  margin auto

.author-line
  text-transform uppercase
  font-weight bold
  font-size .8em
  color gray
  letter-spacing 1px
</style>
