<template>
  <v-navigation-drawer
    app
    temporary
    v-model="drawer"
    @input="updateDrawer"
    dark
  >
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Menu
          </v-list-tile-title>
        </v-list-tile>

        <v-list-tile v-for="i in items" :key="i.title">
          <v-list-tile-action>
            <v-icon>{{i.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{i.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
  </v-navigation-drawer>
</template>

<script>
export default {
    name: 'enDrawer',
    props: ['items'],
    data: () => ({ drawer: false }),
    mounted() {
        this.$root.$on('updateDrawer', data => this.drawer = data);
    },
    methods: {
        updateDrawer(e) {
            this.drawer = e;
            this.$root.$emit('updateDrawer', this.drawer);
        }
    }
};
</script>
