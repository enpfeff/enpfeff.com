<template>
  <v-toolbar app dark>
    <v-toolbar-side-icon @click.stop="updateToolbar"></v-toolbar-side-icon>
    <v-toolbar-title>{{name}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-for="i in items" :key="i.title">{{i.title}}</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
    name: 'enToolbar',
    props: ['items'],
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
