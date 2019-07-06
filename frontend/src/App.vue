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
    <v-btn
      fab
      bottom
      right
      color="cyan darken-1"
      dark
      fixed
      class="mb-3"
      large
      @click="dialog = !dialog"
    >
      <v-icon>cloud_upload</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="cyan darken-1 py-4 white--text title"
        >
          Upload a New File
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-center>
              <p><file-select v-model="file"></file-select></p>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="black" @click="file = null; dialog = false">Cancel</v-btn>
          <v-btn flat color="cyan darken-1" disabled v-if="file === null">Upload</v-btn>
          <v-btn flat color="cyan darken-1" @click="submitFile()" v-else>Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  import Files from './components/Files.vue'
  import FileSelect from './components/File.vue'
  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { icon: 'dashboard', text: 'Dashboard' },
        { icon: 'fiber_new', text: 'Recent Uploads' },
        { icon: 'settings', text: 'Settings' }
      ],
      file: null
    }),
    components: {
      Files,
      FileSelect
    },
    methods: {
      submitFile () {
        let f = this.file
        this.file = null

        //
        let form = new FormData()
        form.append('file', f)

        axios.post('http://localhost:8888/api/file', form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
          // eslint-disable-next-line
          console.log(response)
        }, err => {
          // eslint-disable-next-line
          console.log('error ' + err.resonse)
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err.resonse)
        })
      }
    }
  }
</script>