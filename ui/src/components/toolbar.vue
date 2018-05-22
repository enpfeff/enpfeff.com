<template>
  <v-toolbar app>
    <v-toolbar-side-icon @click.stop="updateToolbar"></v-toolbar-side-icon>
    <v-toolbar-title>{{name}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>About</v-btn>
      <v-btn flat>Resume</v-btn>
      <v-btn flat>Blog</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
    name: 'enToolbar',
    props: [],
    data() {
        return {
            name: 'Ian Pfeffer'
        };
    },
    mounted() {
        this.$root.$on('updateDrawer', data => this.drawer = data);
    },
    methods: {
        updateToolbar(event) {
            this.drawer = !this.drawer;
            this.$root.$emit('updateDrawer', this.drawer);
        }
    }
};
</script>
