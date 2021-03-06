<template>
  <div id="app">
    <v-app>
      <v-container justify-center grid-list-lg>
        <v-layout column>

          <v-flex xs4>
            <v-alert v-for="(alert, i) in alerts" :type="(alert.type === 'danger' ? 'error' : alert.type)" :value="true" transition="slide-y-transition" :key="i">
              <v-layout row><v-flex class="pa-3">{{alert.msg}}</v-flex><v-spacer></v-spacer><v-btn icon @click.native="dismiss(alert)"><v-icon>close</v-icon></v-btn></v-layout>
            </v-alert>
          </v-flex>

          <v-layout row>  
            <v-flex xs2>
              <v-text-field v-model="solrbaseurl" :label="'solr'"></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-text-field v-model="phaidrabaseurl" :label="'phaidra'"></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-text-field v-model="apibaseurl" :label="'phaidra-api'"></v-text-field>
            </v-flex>
            <template v-if="token">
              <v-flex xs6>
                <h3 class="font-weight-light pt-4">Logged in [{{ token }}]</h3>
              </v-flex>
              <v-flex xs1>
                <v-btn raised single-line color="primary lighten-2" class="mt-3" @click="logout()">Logout</v-btn>
              </v-flex>
            </template>
            <template v-else>
              <v-flex xs2> 
                <v-text-field v-model="credentials.username" :label="'username'" ></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field 
                  v-model="credentials.password" 
                  :label="'password'" 
                  :append-icon="psvis ? 'visibility' : 'visibility_off'"
                  @click:append="toggleVisibility"
                  :type="psvis ? 'password' : 'text'"
                ></v-text-field>
              </v-flex>
              <v-flex xs1>
                <v-btn raised single-line color="primary lighten-2" class="mt-3" @click="login()">Login</v-btn>
              </v-flex>
            </template>
          </v-layout> 

          <v-layout row> 
            <v-flex xs2>
              <v-navigation-drawer permanent>
                <v-toolbar flat>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-title class="title">{{ $t('Examples') }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-toolbar>
                <v-divider></v-divider>
                <v-list>
                  <v-item-group v-model="window" class="shrink mr-4" mandatory tag="v-flex">
                    <v-item>
                      <div slot-scope="{ active, toggle }">
                        <v-list-tile @click="toggle">
                          <v-list-tile-content>
                            <v-list-tile-title>{{ $t('Display') }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </div>
                    </v-item>
                    <v-item>
                      <div slot-scope="{ active, toggle }">
                        <v-list-tile @click="toggle">
                          <v-list-tile-content>
                            <v-list-tile-title>{{ $t('Edit') }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </div>
                    </v-item>
                    <v-item>
                      <div slot-scope="{ active, toggle }">
                        <v-list-tile @click="toggle">
                          <v-list-tile-content>
                            <v-list-tile-title>{{ $t('Submit') }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </div>
                    </v-item>
                    <v-item>
                      <div slot-scope="{ active, toggle }">
                        <v-list-tile @click="toggle">
                          <v-list-tile-content>
                            <v-list-tile-title>{{ $t('Search') }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </div>
                    </v-item>
                    <v-item>
                      <div slot-scope="{ active, toggle }">
                        <v-list-tile @click="toggle">
                          <v-list-tile-content>
                            <v-list-tile-title>{{ $t('Manage') }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </div>
                    </v-item>
                  </v-item-group>
                </v-list>
              </v-navigation-drawer>
            </v-flex>

            <v-flex>
              <v-window v-model="window">
                <v-window-item>
                  <v-flex>
                    <v-card>
                      <v-toolbar flat>
                        <v-toolbar-title>Display</v-toolbar-title>
                        <v-divider class="mx-3" inset vertical></v-divider>
                        <v-text-field v-model="pid" :placeholder="'o:123456789'"></v-text-field>
                        <v-spacer></v-spacer>
                        <v-btn raised single-line class="right" color="primary lighten-2" @click="loadDisplay()">Load</v-btn>
                      </v-toolbar>
                      <v-card-text>
                        <v-layout row>
                          <p-d-jsonld 
                            :jsonld="displayjsonld"
                            :pid="pid"
                          ></p-d-jsonld>
                        </v-layout>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-window-item>
                <v-window-item>
                  <v-flex>
                    <v-card>
                      <v-toolbar flat>
                        <v-toolbar-title>Edit</v-toolbar-title>
                        <v-divider class="mx-3" inset vertical></v-divider>
                        <v-text-field v-model="pid" :placeholder="'o:123456789'"></v-text-field>
                        <v-spacer></v-spacer>
                        <v-btn raised single-line class="right" color="primary lighten-2" @click="loadEdit()">Load</v-btn>
                      </v-toolbar>
                      <v-card-text>
                        <p-i-form 
                          :form="editform"
                          :targetpid="this.pid"
                          v-on:object-saved="objectSaved($event)"
                          v-on:load-form="form = $event"
                        ></p-i-form>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-window-item>
                <v-window-item>
                  <v-flex>
                    <v-card>
                      <v-toolbar flat>
                        <v-toolbar-title>Submit</v-toolbar-title>
                        <v-divider class="mx-3" inset vertical></v-divider>
                        <v-select
                          :items="contentmodels"
                          v-model="contentmodel"
                          label="Object type"
                          single-line
                          v-on:change="resetForm($event)"
                        ></v-select>
                        <v-spacer></v-spacer>
                      </v-toolbar>
                      <v-card-text>
                        <p-i-form
                          :form="form"
                          v-on:object-created="objectCreated($event)"
                          v-on:load-form="form = $event"
                          v-on:form-input-p-select="handleSelect($event)"
                          v-on:add-phaidrasubject-section="addPhaidrasubjectSection($event)"
                        ></p-i-form>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-window-item>
                <v-window-item>
                  <v-flex>
                    <v-card>
                      <v-toolbar flat>
                        <v-toolbar-title>{{ $t('Search') }}</v-toolbar-title>
                        <v-divider class="mx-3" inset vertical></v-divider>
                        <v-text-field :placeholder="'Collection, e.g. ' + sampleCollection" v-model="collection"></v-text-field>
                        <v-spacer></v-spacer>
                        <v-btn raised single-line class="right" color="primary lighten-2" @click="loadSearch()">Load Collection</v-btn>
                      </v-toolbar>
                      <v-card-text>
                        <p-search :collection="collection"></p-search>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-window-item>
                <v-window-item>
                  <v-flex>
                    <v-card>
                      <v-toolbar flat>
                        <v-toolbar-title>{{ $t('Manage') }}</v-toolbar-title>
                        <v-divider class="mx-3" inset vertical></v-divider>
                        <v-text-field v-model="pid" :placeholder="'o:123456789'"></v-text-field>
                        <v-spacer></v-spacer>
                        <v-btn raised single-line class="right" color="primary lighten-2" @click="loadManagement(pid)">Load</v-btn>
                      </v-toolbar>
                      <v-card-text>
                        <v-flex>{{ $t('Manage') }} {{piddoc.cmodel}} {{ pid }}</v-flex>
                        <p-m-sort :pid="pid" :cmodel="loadedcmodel" :members="members" @input="members=$event" @order-saved="orderSaved($event)"></p-m-sort>
                        <p-m-rights :pid="pid"></p-m-rights>
                        <p-m-relationships :pid="pid"></p-m-relationships>
                        <p-m-files :pid="pid"></p-m-files>
                        <p-m-delete :pid="pid" :cmodel="loadedcmodel" :members="members"></p-m-delete>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-window-item>
              </v-window>
            </v-flex>

          </v-layout>
          <v-footer color="white">
            <v-layout row>
              <v-spacer></v-spacer>
              <v-flex offset-xs9 xs2>
                <v-select
                  v-model="lang"
                  :items="languages"
                  :label="$t('Language')"
                  @change="$i18n.locale=$event"
                  prepend-icon="language"
                  single-line
                ></v-select>
              </v-flex>
              <v-flex xs1 class="mt-4">v {{version}}</v-flex>
            </v-layout>
          </v-footer>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import qs from 'qs'
import PIForm from '@/components/input/PIForm'
import PDJsonld from '@/components/display/PDJsonld'
import PMDelete from '@/components/management/PMDelete'
import PMSort from '@/components/management/PMSort'
import PMRights from '@/components/management/PMRights'
import PMRelationships from '@/components/management/PMRelationships'
import PMFiles from '@/components/management/PMFiles'
import PSearch from '@/components/search/PSearch'
import {version} from '../package.json'
import fields from '@/utils/fields'
import jsonLd from '@/utils/json-ld'

export default {
  name: 'app',
  components: {
    PIForm,
    PDJsonld,
    PSearch,
    PMDelete,
    PMSort,
    PMRights,
    PMRelationships,
    PMFiles
  },
  computed: {
    loadedcmodel: function() {
      return 'cmodel' in this.piddoc ? this.piddoc.cmodel : 'unknown'
    },
    token: function() {
      return this.$store.state.user.token
    },
    alerts: function () {
      return this.$store.state.alerts.alerts
    },
    vocabularies: function () {
      return this.$store.state.vocabulary.vocabularies
    },
    instance: function() {
      return this.$store.state.settings.instance
    }
  },
  data () {
    return {
      window: 3,
      lang: 'deu',
      languages: [
        { text: 'english', value: 'eng' },
        { text: 'deutsch', value: 'deu' }
      ],
      displayjsonld: {},
      editform: {},
      form: {
        sections: []
      },
      members: [],
      pid: '',
      piddoc: {},
      collection: '',
      sampleCollection: 'o:541829',
      solrbaseurl: 'https://app01.cc.univie.ac.at:8983/solr/phaidra_sandbox',
      phaidrabaseurl: 'phaidra-sandbox.univie.ac.at',
      apibaseurl: 'https://services.phaidra-sandbox.univie.ac.at/api',
      credentials: {
        username: '',
        password: ''
      },
      version: version,
      contentmodel: 'https://pid.phaidra.org/vocabulary/8MY0-BQDQ',
      contentmodels: [
        { 
          text: 'Data', 
          value: 'https://pid.phaidra.org/vocabulary/7AVS-Y482',
        }, 
        { 
          text: 'Picture', 
          value: 'https://pid.phaidra.org/vocabulary/44TN-P1S0' 
        }, 
        { 
          text: 'Audio', 
          value: 'https://pid.phaidra.org/vocabulary/8YB5-1M0J' 
        }, 
        { 
          text: 'Video', 
          value: 'https://pid.phaidra.org/vocabulary/B0Y6-GYT8' 
        }, 
        { 
          text: 'Document',
          value: 'https://pid.phaidra.org/vocabulary/69ZZ-2KGX' 
        }, 
        { 
          text: 'Container',
          value: 'https://pid.phaidra.org/vocabulary/8MY0-BQDQ' 
        }
      ],
      psvis: true
    }
  },
  methods: {
    getResourceTypeFromMimeType: function (mime) {
      switch (mime) {
      case 'image/jpeg':
      case 'image/tiff':
      case 'image/gif':
      case 'image/png':
      case 'image/x-ms-bmp':
        // picture
        return 'https://pid.phaidra.org/vocabulary/44TN-P1S0'
        
      case 'audio/wav':
      case 'audio/mpeg':
      case 'audio/flac':
      case 'audio/ogg':
        // audio
        return 'https://pid.phaidra.org/vocabulary/8YB5-1M0J'
        
      case 'application/pdf':
        // document
        return 'https://pid.phaidra.org/vocabulary/69ZZ-2KGX'
        
      case 'video/mpeg':
      case 'video/avi':
      case 'video/mp4':
      case 'video/quicktime':
      case 'video/x-matroska':
        // video
        return 'https://pid.phaidra.org/vocabulary/B0Y6-GYT8'
        
        // eg application/x-iso9660-image
      default:
        // data
        return 'https://pid.phaidra.org/vocabulary/7AVS-Y482'
      }
    },
    handleSelect: function (val) {
      var i
      var j
      var k
      if (val.predicate === 'ebucore:hasMimeType') {
        for (i = 0; i < this.form.sections.length; i++) {
          if(this.form.sections[i].fields){
            var mime
            for (j = 0; j < this.form.sections[i].fields.length; j++) {
              if (this.form.sections[i].fields[j].predicate === 'ebucore:hasMimeType') {
                mime = this.form.sections[i].fields[j].value
              }
            }
            if (mime) {
              var resourcetype = this.getResourceTypeFromMimeType(mime)
              for (j = 0; j < this.form.sections[i].fields.length; j++) {
                if (this.form.sections[i].fields[j].predicate === 'dcterms:type') {
                  var rt = this.form.sections[i].fields[j]
                  rt.value = resourcetype
                  var preflabels
                  for (k = 0; k < this.vocabularies['resourcetype'].terms.length; k++) {
                    if (this.vocabularies['resourcetype'].terms[k]['@id'] === rt.value) {
                      preflabels = this.vocabularies['resourcetype'].terms[k]['skos:prefLabel']
                    }
                  }
                  rt['skos:prefLabel'] = []
                  Object.entries(preflabels).forEach(([key, value]) => {
                    rt['skos:prefLabel'].push({ '@value': value, '@language': key })
                  })
                }
              }
              this.form.sections.splice(i, 1, this.form.sections[i])
            }
          }
        }
      }
    },
    addPhaidrasubjectSection: function (afterSection) {
      let s = {
        title: 'Subject',
        type: 'phaidra:Subject',
        id: this.form.sections.length + 1,
        removable: true,
        multiplicable: true,
        fields: []
      }
      this.form.sections.splice(this.form.sections.indexOf(afterSection)+1, 0, s)
    },
    loadManagement: function (pid) {
      this.loadMembers(pid)
      this.loadDoc(pid)
    },
    loadDoc: function (pid) {
      var self = this
      
      this.members = []
      
      var params = {
        q: 'pid:"' + pid + '"',
        defType: 'edismax',
        wt: 'json',
        qf: 'pid^5'
      }
      
      var query = qs.stringify(params, { encodeValuesOnly: true, indices: false })
      var url = self.instance.solr + '/select?' + query
      var promise = fetch(url, {
        method: 'GET',
        mode: 'cors'
      })
          .then(function (response) { return response.json() })
          .then(function (json) {
            if (json.response.numFound > 0) {
              self.piddoc = json.response.docs[0]
            } else {
              self.piddoc = {}
            }
          })
          .catch(function (error) {
            console.log(error) // eslint-disable-line no-console
          })
      
      return promise
    },
    loadMembers: function (pid) {
      var self = this
      
      this.members = []
      
      var params = {
        q: 'ismemberof:"' + pid + '"',
        defType: 'edismax',
        wt: 'json',
        qf: 'ismemberof^5',
        fl: 'pid,cmodel,dc_title,created',
        sort: 'pos_in_' + pid.replace(':','_') + ' asc'
      }
      
      var query = qs.stringify(params, { encodeValuesOnly: true, indices: false })
      var url = self.instance.solr + '/select?' + query
      var promise = fetch(url, {
        method: 'GET',
        mode: 'cors'
      })
          .then(function (response) { return response.json() })
          .then(function (json) {
            if (json.response.numFound > 0) {
              self.members = json.response.docs
            } else {
              self.members = []
            }
          })
          .catch(function (error) {
            console.log(error) // eslint-disable-line no-console
          })
      
      return promise
    },
    loadMetadata: function (pid) {
      this.loadedMetadata = []
      var self = this
      var url = self.$store.state.settings.instance.api + '/object/' + pid + '/metadata?mode=resolved'
      var promise = fetch(url, {
        method: 'GET',
        mode: 'cors'
      })
          .then(function (response) { return response.json() })
          .then(function (json) {
            if (json.metadata['JSON-LD']) {
              return json.metadata['JSON-LD']
        }
      })
      .catch(function (error) {
        console.log(error) // eslint-disable-line no-console
      })
      return promise
    },
    loadDisplay: function() {
      this.displayjsonld = {}
      let self = this
      this.loadMetadata(self.pid).then(function (jsonld) { 
        self.displayjsonld = jsonld 
      })
    },
    loadEdit: function() {
      let self = this
      this.loadMetadata(self.pid).then(function (jsonld) { 
        self.editform = jsonLd.json2form(jsonld)
      })
    },
    loadSearch: function() {
      this.collection = ''
      this.collection = this.sampleCollection
    },
    login: function () {
      this.$store.dispatch('login', this.credentials)
    },
    logout: function () {
      this.$store.dispatch('logout')
      document.cookie = 'X-XSRF-TOKEN='
    },
    objectCreated: function (event) {
      this.$store.commit('setAlerts', [{ type: 'success', msg: 'Object ' + event + ' created' }])
    },
    objectSaved: function (event) {
      this.$store.commit('setAlerts', [{ type: 'success', msg: 'Metadata for object ' + event + ' saved' }])
    },
    orderSaved: function (event) {
      this.$store.commit('setAlerts', [{ type: 'success', msg: 'Order for object ' + event + ' saved' }])
    },
    objectDeleted: function () {
      this.$store.commit('setAlerts', [{ type: 'success', msg: 'Object was successfully deleted.' }])
    },
    toggleVisibility: function () {
      this.psvis = !this.psvis
    },    
    dismiss: function (alert) {
      this.$store.commit('clearAlert', alert)
    },
    getCookie: function (name) {
      var value = "; " + document.cookie
      var parts = value.split("; " + name + "=")
      if (parts.length == 2) {
        var val = parts.pop().split(";").shift()
        return val === ' ' ? null : val
      }
    },
    resetForm: function (cm) {
      if (cm === 'https://pid.phaidra.org/vocabulary/8MY0-BQDQ') {
        this.createContainerForm()
      } else {
        this.createSimpleForm()
      }
    },
    createSimpleForm: function () {
      this.form = {
        sections: [
          {
            title: 'General metadata',
            type: 'digitalobject',
            id: 1,
            fields: []
          },
          {
            title: 'Digitized object',
            type: 'phaidra:Subject',
            id: 2,
            fields: []
          },
          {
            title: 'Subject',
            type: 'phaidra:Subject',
            id: 3,
            multiplicable: true,
            fields: []
          },
          {
            title: 'File',
            id: 4,
            type: '',
            multiplicable: false,
            fields: []
          }
        ]
      }
      var rt = fields.getField('resource-type')
      rt.value = this.contentmodel
      this.form.sections[0].fields.push(rt)
      this.form.sections[0].fields.push(fields.getField('title'))
      this.form.sections[0].fields.push(fields.getField('description'))
      this.form.sections[0].fields.push(fields.getField('table-of-contents'))
      var gnd = fields.getField('gnd-subject')
      gnd.exactvoc = 'EthnographicName'
      gnd.label = 'Soziokulturelle Kategorie (GND)'
      this.form.sections[0].fields.push(gnd)
      this.form.sections[0].fields.push(fields.getField('keyword'))
      var lang = fields.getField('language')
      lang.value = 'deu'
      this.form.sections[0].fields.push(lang)
      this.form.sections[0].fields.push(fields.getField('role'))
      this.form.sections[0].fields.push(fields.getField('note'))
      let pf = fields.getField('project')
      pf.multiplicable = true
      this.form.sections[0].fields.push(pf)
      this.form.sections[0].fields.push(fields.getField('funder'))
      this.form.sections[0].fields.push(fields.getField('association'))
      this.form.sections[0].fields.push(fields.getField('bf-publication'))
      this.form.sections[0].fields.push(fields.getField('citation'))
      this.form.sections[1].fields.push(fields.getField('title'))
      this.form.sections[1].fields.push(fields.getField('role'))
      this.form.sections[1].fields.push(fields.getField('shelf-mark'))
      this.form.sections[1].fields.push(fields.getField('temporal-coverage'))
      this.form.sections[1].fields.push(fields.getField('provenance'))
      this.form.sections[1].fields.push(fields.getField('physical-location'))
      // eingangsdatum
      var accessiondate = fields.getField('date-edtf')
      accessiondate.type = 'phaidra:dateAccessioned'
      this.form.sections[1].fields.push(accessiondate)
      this.form.sections[1].fields.push(fields.getField('accession-number'))
      this.form.sections[1].fields.push(fields.getField('condition-note'))
      this.form.sections[1].fields.push(fields.getField('reproduction-note'))
      this.form.sections[1].fields.push(fields.getField('technique-vocab'))
      this.form.sections[1].fields.push(fields.getField('technique-text'))
      this.form.sections[1].fields.push(fields.getField('material-text'))
      this.form.sections[1].fields.push(fields.getField('carrier-type'))
      this.form.sections[1].fields.push(fields.getField('height'))
      this.form.sections[1].fields.push(fields.getField('width'))
      this.form.sections[1].fields.push(fields.getField('inscription'))
      this.form.sections[1].fields.push(fields.getField('spatial-getty'))
      var localname = fields.getField('spatial-text')
      localname.type = 'dcterms:spatial'
      localname.disabletype = true
      localname.label = 'Place (native name)'
      this.form.sections[1].fields.push(localname)

      this.form.sections[2].fields.push(fields.getField('title'))
      this.form.sections[2].fields.push(fields.getField('description'))
      this.form.sections[2].fields.push(fields.getField('shelf-mark'))
      this.form.sections[2].fields.push(fields.getField('temporal-coverage'))
      this.form.sections[2].fields.push(fields.getField('provenance'))
      this.form.sections[2].fields.push(fields.getField('physical-location'))
      this.form.sections[2].fields.push(fields.getField('role'))
      // eingangsdatum
      var accessiondate2 = fields.getField('date-edtf')
      accessiondate2.type = 'phaidra:dateAccessioned'
      this.form.sections[2].fields.push(accessiondate2)
      this.form.sections[2].fields.push(fields.getField('accession-number'))
      this.form.sections[2].fields.push(fields.getField('technique-text'))
      this.form.sections[2].fields.push(fields.getField('material-text'))
      this.form.sections[2].fields.push(fields.getField('height'))
      this.form.sections[2].fields.push(fields.getField('width'))
      this.form.sections[2].fields.push(fields.getField('depth'))

      this.form.sections[3].fields.push(fields.getField('file'))
      this.form.sections[3].fields.push(fields.getField('license'))
      this.form.sections[3].fields.push(fields.getField('rights'))
    },
    createContainerForm: function () {
      this.createSimpleForm()
      this.form.sections[3] = {
        title: 'File',
        id: 4,
        type: 'member',
        multiplicable: true,
        fields: []
      }
      var rt = fields.getField('resource-type')
      rt.value = 'https://pid.phaidra.org/vocabulary/8MY0-BQDQ'
      this.form.sections[3].fields.push(rt)
      this.form.sections[3].fields.push(fields.getField('file'))
      this.form.sections[3].fields.push(fields.getField('title'))
      this.form.sections[3].fields.push(fields.getField('description'))
      var mt = fields.getField('mime-type')
      mt.required = true
      this.form.sections[3].fields.push(mt)
      this.form.sections[3].fields.push(fields.getField('digitization-note'))
      this.form.sections[3].fields.push(fields.getField('role'))
      this.form.sections[3].fields.push(fields.getField('license'))
      this.form.sections[3].fields.push(fields.getField('rights'))
    }
  },
  mounted: function () {
    var token = this.getCookie('X-XSRF-TOKEN')
    if (token) {
      // TODO init userdata if setting token from cookie
      this.$store.commit('setToken', token)
    }

    this.$store.commit('setInstanceApi', this.apibaseurl)
    this.$store.commit('setInstanceSolr', this.solrbaseurl)
    this.$store.commit('setInstancePhaidra', this.phaidrabaseurl)
    this.$store.commit('setSuggester', { suggester: 'getty', url: 'https://ws.gbv.de/suggest/getty/' })
    this.$store.commit('setSuggester', { suggester: 'gnd', url: 'https://ws.gbv.de/suggest/gnd/' })
    this.$store.commit('initStore') // this commits initStore in every store module which has it

    this.createContainerForm()
  }
}
</script>

<style>
#app {
  font-family: "Roboto", sans-serif, Arial, Helvetica, sans-serif;
  font-size: 11.5pt;
  line-height: 1.42857143;
  color: black;
  background-color: white;
  font-weight: 300;
  text-rendering: optimizeLegibility;
}

.right {
  float: right;
}

.pdlabel {
  max-width: 100%;
}

#app .v-btn {
  text-transform: none;
}
#app .v-tabs__div {
  text-transform: none;
  font-weight: 300;
}
</style>

<style lang="stylus">
  @require './stylus/main'
</style>

