<template>
  <v-app>
    <en-drawer :items="items"></en-drawer>
    <en-toolbar :items="items"></en-toolbar>
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
    data: () => ({
        items: [{
            title: 'About',
            icon: 'assignment_ind'
        }, {
            title: 'Resume',
            icon: 'insert_drive_file'
        }, {
            title: 'Contact',
            icon: 'contact_mail'
        }]
    })
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
