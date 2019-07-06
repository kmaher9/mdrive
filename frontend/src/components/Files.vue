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
  </v-flex>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'

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
        files: [ ]
      }
    },
    methods: {
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