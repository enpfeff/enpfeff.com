<template>
  <v-app>
    <en-drawer></en-drawer>
    <en-toolbar></en-toolbar>
    <v-content>
        <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import enToolbar from '@/components/toolbar';
import enDrawer from '@/components/drawer';
export default {
    name: 'App',
    components: {
        enToolbar,
        enDrawer
    },
    data: () => ({})
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
