<template>
  <v-layout row>
    <v-flex xs2>
      <v-text-field
        :value="value" 
        v-on:blur="$emit('input-value',$event.target.value)"
        :label="$t(label)"
        box
      ></v-text-field>
    </v-flex>
    <v-flex xs2>
      <v-select 
        v-on:blur="$emit('input-unit',$event.target.value)"
        :label="$t('Unit')"
        :items="vocabularies['uncefact'].terms" 
        :value="getTerm('uncefact', unit)"
        box
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-tile-content two-line>
            <v-list-tile-title  v-html="`${getLocalizedTermLabel('uncefact', item['@id'])}`"></v-list-tile-title>
            <v-list-tile-sub-title  v-html="`${item['@id']}`"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-tile-content>
            <v-list-tile-title v-html="`${getLocalizedTermLabel('uncefact', item['@id'])}`"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </v-select>
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
import { vocabulary } from '../../mixins/vocabulary'
import { fieldproperties } from '../../mixins/fieldproperties'

export default {
  name: 'p-i-dimension',
  mixins: [vocabulary, fieldproperties],
  props: {
    unit: {
      type: String
    },
    value: {
      type: String
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>