<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-tile :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="black"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 400px" class="ml-0 pl-0">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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
      dialog: false,
      drawer: null,
      error: false,
      items: [
        { icon: 'dashboard', text: 'Dashboard' },
        { icon: 'fiber_new', text: 'Recent Uploads' },
        { icon: 'settings', text: 'Settings' }
      ],
      file: null
    }),
    components: {
      Files,
      
    },
    methods: {
      submitFile () {
        this.error = false
        let f = this.file
        

        //
        let form = new FormData()
        form.append('file', f)

        axios.post('http://localhost:8888/api/file', form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
          this.file = null
          this.dialog = false
          this.$forceUpdate()
        }, err => {
          this.error = true
        })
        .catch(err => {
          this.error = true
        })
      }
    }
  }
</script>