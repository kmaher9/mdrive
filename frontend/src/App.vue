<template>
  <v-app>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="black"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 400px" class="ml-0 pl-0">
        <span style="font-family: monospace">MDrive.</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout justify-center align-center>
          <Files/>
        </v-layout>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  import Files from './components/Files.vue'

  export default {
    data: () => ({
      
      drawer: null,
     
      items: [
        { icon: 'dashboard', text: 'Dashboard' },
        { icon: 'fiber_new', text: 'Recent Uploads' },
        { icon: 'settings', text: 'Settings' }
      ],
     
    }),
    components: {
      Files,
      
    },
    methods: {
      
    }
  }
</script>