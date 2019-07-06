<template>
  <v-flex>
    <v-card class="xs12">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="files"
        :search="search"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.mime }}</td>
          <td class="text-xs-left">{{ props.item.size }}</td>
          <td class="text-xs-left">{{ props.item.createdAt }}</td>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
        <v-btn
      fab
      bottom
      right
      color="cyan darken-1"
      dark
      fixed
      class="mb-3"
      large
      @click="file = null; dialog = !dialog"
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
          <v-layout row wrap align-center justify-center class="xs-text-center">
            <v-flex xs12 align-center justify-center class="xs-text-center">
              <p><file-select v-model="file"></file-select></p>
              <h3 class="ml-5 red--text" v-if="error">Error: a file already exists with that name.</h3>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="black" @click="file = null; error = false; dialog = false">Cancel</v-btn>
          <v-btn flat color="cyan darken-1" disabled v-if="file === null">Upload</v-btn>
          <v-btn flat color="cyan darken-1" @click="submitFile()" v-else>Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
    import FileSelect from './File.vue'

  export default {
    data () {
      return {
        search: '',
        headers: [
          { text: 'File Name', value: 'name' },
          { text: 'Type', value: 'type' },
          { text: 'Size', value: 'size' },
          { text: 'Uploaded On', value: 'createdAt' },
        ],
        files: [ ],
        dialog: false,
        error: false,
        file: null
      }
    },
    components: {
      FileSelect
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
          this.getData()
        }, err => {
          this.error = true
        })
        .catch(err => {
          this.error = true
        })
      },
      getData () {
        axios.get('http://localhost:8888/api/files')
        .then(response => {
          this.files = response.data.data.files
          for(let i = 0; i < this.files.length; i++) {
            this.files[i].size = this.convertSizeToHuman(this.files[i].size)
            this.files[i].createdAt = this.convertDateToHuman(this.files[i].createdAt)
          }
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err.response)
          this.files = []
        })
      },
      convertSizeToHuman (size) {
        let i = Math.floor( Math.log(size) / Math.log(1024) )
        return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
      },
      convertDateToHuman (date) {
        let m = moment(date)
        return m.format('MMMM Do YYYY, h:mm:ss a')
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>