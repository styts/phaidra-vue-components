<template>
  <v-layout row>
    <v-flex xs8>
      <v-autocomplete
        :value="getTerm(value)"
        :required="required"
        v-on:input="handleInput($event)"
        :rules="required ? [ v => !!v || 'Required'] : []"
        :items="orgunits"
        :loading="loading"
        :filter="autocompleteFilter"
        hide-no-data
        :label="$t(label)"
        box
        return-object
        clearable
        :disabled="disabled"
        :messages="path"
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-tile-content two-line>
            <v-list-tile-title  v-html="`${getLocalizedTermLabel(item)}`"></v-list-tile-title>
            <v-list-tile-sub-title  v-html="`${item['@id']}`"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-tile-content>
            <v-list-tile-title v-html="`${getLocalizedTermLabel(item)}`"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </v-autocomplete>
    </v-flex>
    <v-flex xs1 v-if="actions.length">
      <v-menu open-on-hover bottom offset-y>
        <v-btn slot="activator" icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(action, i) in actions" :key="i" @click="$emit(action.event, $event)">
            <v-list-tile-title>{{ action.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script>
import { fieldproperties } from '../../mixins/fieldproperties'

export default {
  name: 'p-i-association',
  mixins: [fieldproperties],
  methods: {
    autocompleteFilter: function (item, queryText) {
      const lab = item['skos:prefLabel'][this.$i18n.locale] ? item['skos:prefLabel'][this.$i18n.locale].toLowerCase() : item['skos:prefLabel']['eng'].toLowerCase()
      const query = queryText.toLowerCase()
      return lab.indexOf(query) > -1
    },
    getTerm: function (v) {
      for (let u of this.orgunits) {
        if (u['@id'] === v){
          return u
        }
      }
    },
    getLocalizedTermLabel: function (item) {
      return item['skos:prefLabel'][this.$i18n.locale] ? item['skos:prefLabel'][this.$i18n.locale] : item['skos:prefLabel']['eng']
    },
    addToOrgunits: function (units, parent) {
      for (let u of units) {
        this.orgunits.push(u)
        u.parent = parent
        if (u['subunits']) {
          if (u.subunits.length > 0) {
            this.addToOrgunits(u.subunits, u)
          }
        }
      }
    },
    handleInput: function (unit) {
      this.path = ''
      let parentpath = []
      this.getParentPath(unit, parentpath)
      for (let u of parentpath.reverse()) {
        this.path = this.path + u['skos:prefLabel'][this.$i18n.locale] + ' > '
      }
      this.path = this.path + unit['skos:prefLabel'][this.$i18n.locale]
      this.$emit('input', unit)
    },
    getParentPath: function (unit, parentpath) {
      if (unit['parent']) {
        parentpath.push(unit.parent)
        this.getParentPath(unit.parent, parentpath)
      }
    },
    loadOrgUnits: function () {
      var self = this
      this.loading = true
      var url = self.$store.state.settings.instance.api + '/directory/org_get_units'
      var promise = fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'X-XSRF-TOKEN': this.$store.state.user.token
        }
      })
      .then(function (response) { return response.json() })
      .then(function (json) {
        if (json.alerts && json.alerts.length > 0) {
          self.$store.commit('setAlerts', json.alerts)
        }
        self.loading = false
        self.templatedialog = false
        self.addToOrgunits(json.units, null)
      })
      .catch(function (error) {
        console.log(error)
      })
      return promise
    }
  },
  props: {
    value: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      orgunits: [],
      path: ''
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      let self = this
      this.loadOrgUnits().then(function () { 
        if (self.value) {
          let term = self.getTerm(self.value)
          // emit input to set skos:prefLabel in parent
          self.handleInput(term)
        }
      })
    })
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>
