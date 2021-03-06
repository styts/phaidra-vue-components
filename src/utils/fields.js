import uuid from './uuid'

const fields = [
  {
    id: 'resource-type',
    fieldname: 'Resource type',
    predicate: 'dcterms:type',
    component: 'p-select',
    vocabulary: 'resourcetype',
    required: true,
    multiplicable: false,
    disabled: true,
    label: 'Resource type',
    value: '',
    'skos:prefLabel': [],
    definition: 'The nature of the resource. Example: Image, Text, Sound'
  },
  {
    id: 'object-type',
    fieldname: 'Object type',
    predicate: 'edm:hasType',
    component: 'p-select',
    vocabulary: 'objecttype',
    label: 'Object type',
    value: '',
    'skos:prefLabel': [],
    definition: 'This property relates a resource with the concepts it belongs to. It does not capture aboutness. Example: Photography, Railway bridge, Tribe'
  },
  {
    id: 'genre',
    fieldname: 'Genre',
    predicate: 'schema:genre',
    component: 'p-select',
    vocabulary: 'genre',
    label: 'Genre',
    value: '',
    'skos:prefLabel': [],
    definition: 'Genre of the creative work, broadcast channel or group. Example: Master thesis, Comedy, Late Renaissance'
  },
  {
    id: 'title',
    fieldname: 'Title',
    predicate: 'dce:title',
    component: 'p-title',
    type: 'bf:Title',
    required: true,
    multiplicable: true,
    multilingual: true,
    ordergroup: 'title',
    titleLabel: '',
    title: '',
    subtitle: '',
    subtitleLabel: '',
    hideSubtitle: false,
    language: '',
    definition: 'A name given to the resource. Typically, a Title will be a name by which the resource is formally known.'
  },
  {
    id: 'description',
    fieldname: 'Description',
    predicate: 'bf:note',
    type: 'bf:Note',
    component: 'p-text-field',
    multiplicable: true,
    multilingual: true,
    multiline: true,
    label: 'Description',
    value: '',
    language: '',
    definition: 'Information, usually in textual form, on attributes of a resource or some aspect of a resource.'
  },
  {
    id: 'abstract',
    fieldname: 'Abstract',
    predicate: 'bf:note',
    type: 'bf:Summary',
    component: 'p-text-field',
    multiplicable: true,
    multilingual: true,
    multiline: true,
    label: 'Abstract',
    value: '',
    language: '',
    definition: 'Summary or abstract of the resource described.'
  },
  {
    id: 'table-of-contents',
    fieldname: 'Table of contents',
    predicate: 'bf:tableOfContents',
    type: 'bf:TableOfContents',
    component: 'p-text-field',
    multiplicable: true,
    multilingual: true,
    multiline: true,
    label: 'Table of contents',
    value: '',
    language: '',
    definition: 'Table of contents of the described resource.'
  },
  {
    id: 'date-edtf',
    fieldname: 'Date',
    predicate: 'date',
    component: 'p-date-edtf',
    multiplicable: true,
    label: 'Date',
    value: '',
    dateLabel: '',
    type: 'created',
    hideType: false,
    definition: 'A point or period of time associated with an event in the lifecycle of the resource.'
  },
  {
    id: 'note',
    fieldname: 'Note',
    predicate: 'bf:note',
    type: 'phaidra:Remark',
    component: 'p-text-field',
    multilingual: true,
    multiline: true,
    label: 'Note',
    value: '',
    language: '',
    definition: 'Information, usually in textual form, on attributes of a resource or some aspect of a resource.'
  },
  {
    id: 'digitization-note',
    fieldname: 'Digitization note',
    predicate: 'bf:note',
    type: 'phaidra:DigitizationNote',
    component: 'p-text-field',
    multilingual: true,
    multiline: true,
    label: 'Digitization note',
    value: '',
    language: '',
    definition: 'Information, usually in textual form, on attributes of a resource or some aspect of a resource.'
  },
  {
    id: 'condition-note',
    fieldname: 'Condition',
    predicate: 'bf:note',
    type: 'phaidra:ConditionNote',
    component: 'p-text-field',
    multilingual: true,
    multiline: true,
    label: 'Condition',
    value: '',
    language: '',
    definition: 'Information, usually in textual form, on attributes of a resource or some aspect of a resource.'
  },
  {
    id: 'reproduction-note',
    fieldname: 'Reproduction note',
    predicate: 'bf:note',
    type: 'phaidra:ReproductionNote',
    component: 'p-text-field',
    label: 'Reproduction note',
    value: '',
    definition: 'Information, usually in textual form, on attributes of a resource or some aspect of a resource.'
  },
  {
    id: 'language',
    fieldname: 'Language',
    predicate: 'dcterms:language',
    component: 'p-select',
    vocabulary: 'lang',
    required: true,
    multiplicable: true,
    label: 'Language',
    value: '',
    definition: 'A language of the resource.'
  },
  {
    id: 'subtitle-language',
    fieldname: 'Language of subtitles',
    predicate: 'schema:subtitleLanguage',
    component: 'p-select',
    vocabulary: 'lang',
    multiplicable: true,
    label: 'Language of subtitles',
    value: '',
    definition: 'Languages in which subtitles/captions are available.'
  },
  {
    id: 'role',
    fieldname: 'Contribution',
    predicate: 'role',
    type: 'schema:Person',
    component: 'p-entity',
    multiplicable: true,
    showidentifier: false,
    ordered: true,
    institutionLabel: '',
    firstname: '',
    lastname: '',
    name: '',
    role: '',
    hideRole: false,
    definition: 'Function played or provided by a contributor, e.g., author, illustrator, etc.'
  },
  {
    id: 'keyword',
    fieldname: 'Keywords',
    predicate: 'dce:subject',
    component: 'p-keyword',
    suggester: 'keywordsuggester',
    multiplicable: true,
    multilingual: true,
    label: 'Keywords',
    value: '',
    language: '',
    definition: 'The topic of the resource, represented using keywords.'
  },
  {
    id: 'subject',
    fieldname: 'Subject',
    predicate: 'dcterms:subject',
    type: 'skos:Concept',
    component: 'p-select',
    vocabulary: '',
    multiplicable: true,
    label: 'Subject',
    value: '',
    'skos:prefLabel': [],
    definition: 'The topic of the resource, represented using a controlled vocabulary.'
  },
  {
    id: 'gnd-subject',
    fieldname: 'Subject (GND)',
    predicate: 'dcterms:subject',
    type: 'skos:Concept',
    component: 'p-subject-gnd',
    multiplicable: true,
    label: 'Subject (GND)',
    value: '',
    voc: 'SubjectHeading',
    exactvoc: '',
    'rdfs:label': [],
    'skos:prefLabel': [],
    loadedpreflabel: '',
    definition: 'The topic of the resource, represented using a controlled vocabulary.'
  },
  {
    id: 'study-plan',
    fieldname: 'Study plan',
    predicate: 'frapo:isOutputOf',
    type: 'aaiso:Programme',
    component: 'p-study-plan',
    multiplicable: true,
    multilingual: true,
    notation: '',
    name: '',
    nameLanguage: '',
    definition: 'Study plan.'
  },
  {
    id: 'series',
    fieldname: 'Journal/Series',
    predicate: 'rdau:P60193',
    type: 'schema:CreativeWork',
    component: 'p-series',
    label: 'Journal/Series',
    title: '',
    titlelanguage: '',
    volume: '',
    issue: '',
    issued: '',
    issn: '',
    identifier: '',
    definition: 'Relates a resource to a resource in which a part has been issued; a title of a larger resource appears on a part.'
  },
  {
    id: 'movieadaptation',
    fieldname: 'Is motion picture adaptation of',
    predicate: 'rdau:P60227',
    type: 'schema:CreativeWork',
    component: 'p-adaptation',
    label: 'Is motion picture adaptation of',
    title: '',
    subtitle: '',
    titlelanguage: '',
    firstname: '',
    lastname: '',
    name: '',
    role: '',
    definition: 'Relates a resource to a resource that is adapted as a motion picture.'
  },
  {
    id: 'project',
    fieldname: 'Project',
    predicate: 'frapo:isOutputOf',
    type: 'foaf:Project',
    component: 'p-project',
    name: '',
    nameLanguage: '',
    description: '',
    descriptionLanguage: '',
    identifier: '',
    homepage: '',
    definition: 'An administrative entity that enabled an endeavour such as a research investigation.'
  },
  {
    id: 'funder',
    fieldname: 'Funder',
    predicate: 'frapo:hasFundingAgency',
    component: 'p-funder',
    name: '',
    nameLanguage: '',
    identifier: '',
    definition: 'A funding agency that provided funding for the resource.'
  },
  {
    id: 'association',
    fieldname: 'Association',
    predicate: 'rdax:P00009',
    component: 'p-association',
    multiplicable: true,
    label: 'Association',
    value: '',
    'skos:prefLabel': [],
    definition: 'Relates an object to a corporate body who is associated with an object.'
  },
  {
    id: 'bf-publication',
    fieldname: 'Provision activity: Publication',
    predicate: 'bf:provisionActivity',
    component: 'p-bf-publication',
    multiplicable: true,
    label: 'Provision activity: Publication',
    publisherNameLabel: 'ORG_PUBLISHER',
    publishingPlaceLabel: 'Place',
    publishingDateLabel: 'Date',
    publisherName: '',
    publishingPlace: '',
    publishingDate: '',
    definition: 'Information relating to publication of a resource.'
  },
  {
    id: 'carrier-type',
    fieldname: 'Carrier type',
    predicate: 'rdau:P60048',
    component: 'p-select',
    vocabulary: 'carriertype',
    multiplicable: true,
    label: 'Carrier type',
    value: '',
    'skos:prefLabel': [],
    definition: 'Relates a resource to a categorization reflecting a format of a storage medium and housing of a carrier in combination with a type of intermediation device required to view, play, run, etc., the content of a resource.'
  },
  {
    id: 'citation',
    fieldname: 'Citation',
    predicate: 'citation',
    component: 'p-citation',
    multiplicable: true,
    citationLabel: 'Citation',
    identifierLabel: 'Identifier',
    identifier: '',
    type: '',
    citation: '',
    citationLanguage: '',
    disabletype: false,
    definition: 'The citations characterized may be either direct and explicit (as in the reference list of a journal article), indirect (e.g. a citation to a more recent paper by the same research group on the same topic), or implicit (e.g. as in artistic quotations or parodies, or in cases of plagiarism).'
  },
  {
    id: 'shelf-mark',
    fieldname: 'Shelf mark',
    predicate: 'bf:shelfMark',
    component: 'p-text-field',
    multiplicable: true,
    label: 'Call number',
    value: '',
    definition: 'Piece/item identifier, such as a call or other type of number.'
  },
  {
    id: 'temporal-coverage',
    fieldname: 'Temporal coverage',
    predicate: 'dcterms:temporal',
    component: 'p-text-field',
    label: 'Temporal coverage',
    multilingual: true,
    value: '',
    language: '',
    definition: 'Temporal characteristics of the resource. Indicates the period that the content applies to, i.e. that it describes.'
  },
  {
    id: 'provenance',
    fieldname: 'Provenance',
    predicate: 'dcterms:provenance',
    component: 'p-text-field',
    multiline: true,
    multilingual: true,
    label: 'Provenance',
    value: '',
    language: '',
    definition: 'A statement of any changes in ownership and custody of a resource since its creation that are significant for its authenticity, integrity, and interpretation.'
  },
  {
    id: 'physical-location-select-text',
    fieldname: 'Physical location (select)',
    predicate: 'bf:physicalLocation',
    component: 'p-select-text',
    label: 'Physical location',
    selectlabel: 'Physical location',
    multilingual: true,
    selectdisabled: false,
    selectvalue: '',
    textvalue: '',
    value: '',
    vocabulary: '',
    language: '',
    definition: 'Location in the holding agency where the item is shelved or stored. Select box value will be combined with text field.'
  },
  {
    id: 'physical-location',
    fieldname: 'Physical location',
    predicate: 'bf:physicalLocation',
    component: 'p-text-field',
    label: 'Physical location',
    multilingual: true,
    value: '',
    language: '',
    definition: 'Location in the holding agency where the item is shelved or stored.'
  },
  {
    id: 'accession-number',
    fieldname: 'Accession number',
    predicate: 'opaque:cco_accessionNumber',
    component: 'p-text-field',
    label: 'Accession number',
    value: '',
    definition: 'Use for identification number assigned to a particular donation or acquisition.'
  },
  {
    id: 'number-of-pages',
    fieldname: 'Number of pages',
    predicate: 'schema:numberOfPages',
    component: 'p-literal',
    label: 'Number of pages',
    value: '',
    definition: 'The number of pages in the book in the resource.'
  },
  {
    id: 'sound-characteristic',
    fieldname: 'Sound characteristic',
    predicate: 'bf:soundCharacteristic',
    component: 'p-literal',
    label: 'Sound characteristic',
    value: '',
    definition: 'Technical specification relating to the encoding of sound in a resource.'
  },
  {
    id: 'dce-format-vocab',
    fieldname: 'DC Format',
    predicate: 'dce:format',
    component: 'p-select',
    vocabulary: 'dceformat',
    multiplicable: true,
    label: 'Format',
    value: '',
    'skos:prefLabel': [],
    definition: 'The file format, physical medium, or dimensions of the resource.'
  },
  {
    id: 'supplementary-content',
    fieldname: 'Supplementary content',
    predicate: 'bf:supplementaryContent',
    type: 'bf:SupplementaryContent',
    component: 'p-text-field',
    multiplicable: true,
    multilingual: true,
    label: 'Supplementary content',
    value: '',
    language: '',
    definition: 'Material such as an index, bibliography, appendix intended to supplement the primary content of a resource.'
  },
  {
    id: 'award',
    fieldname: 'Award',
    predicate: 'bf:awards',
    type: 'skos:Concept',
    component: 'p-text-field',
    multiplicable: true,
    multilingual: true,
    label: 'Award',
    value: '',
    language: '',
    definition: 'Information on an award associated with the described resource.'
  },
  {
    id: 'audience',
    fieldname: 'Audience',
    predicate: 'dcterms:audience',
    type: 'skos:Concept',
    component: 'p-text-field',
    multiplicable: true,
    multilingual: true,
    label: 'Audience',
    value: '',
    language: '',
    definition: 'A class of entity for whom the resource is intended or useful.'
  },
  {
    id: 'audience-vocab',
    fieldname: 'Audience',
    predicate: 'dcterms:audience',
    type: 'skos:Concept',
    component: 'p-select',
    vocabulary: 'audience',
    label: 'Audience',
    value: '',
    'skos:prefLabel': [],
    definition: 'A class of entity for whom the resource is intended or useful.'
  },
  {
    id: 'regional-encoding',
    fieldname: 'Regional encoding',
    predicate: 'rdau:P60059',
    component: 'p-select',
    vocabulary: 'regionalencoding',
    label: 'Regional encoding',
    value: '',
    'skos:prefLabel': [],
    definition: 'A designation for one or more regions of the world for which a videodisc or video game carrier has been encoded, restricting playback to a device configured to decode it.'
  },
  {
    id: 'technique-vocab',
    fieldname: 'Technique (vocabulary)',
    predicate: 'vra:hasTechnique',
    type: 'vra:Technique',
    component: 'p-select',
    vocabulary: 'technique',
    label: 'Technique',
    value: '',
    'skos:prefLabel': [],
    definition: 'The production or manufacturing processes, techniques, and methods incorporated in the fabrication or alteration of the work or image.'
  },
  {
    id: 'technique-text',
    fieldname: 'Technique',
    predicate: 'vra:hasTechnique',
    type: 'vra:Technique',
    component: 'p-text-field',
    multilingual: true,
    multiplicable: true,
    label: 'Technique',
    value: '',
    language: '',
    'skos:prefLabel': [],
    definition: 'The production or manufacturing processes, techniques, and methods incorporated in the fabrication or alteration of the work or image.'
  },
  {
    id: 'material-vocab',
    fieldname: 'Material (vocabulary)',
    predicate: 'vra:material',
    type: 'vra:Material',
    component: 'p-select',
    vocabulary: 'material',
    label: 'Material',
    value: '',
    'skos:prefLabel': [],
    definition: 'The substance of which a work or an image is composed.'
  },
  {
    id: 'material-text',
    fieldname: 'Material',
    predicate: 'vra:material',
    type: 'vra:Material',
    component: 'p-text-field',
    multilingual: true,
    multiplicable: true,
    label: 'Material',
    value: '',
    language: '',
    definition: 'The substance of which a work or an image is composed.'
  },
  {
    id: 'height',
    fieldname: 'Height',
    predicate: 'schema:height',
    component: 'p-dimension',
    label: 'Height',
    unit: 'CMT',
    value: '',
    definition: 'The height of the item.'
  },
  {
    id: 'width',
    fieldname: 'Width',
    predicate: 'schema:width',
    component: 'p-dimension',
    label: 'Width',
    unit: 'CMT',
    value: '',
    definition: 'The width of the item.'
  },
  {
    id: 'depth',
    fieldname: 'Depth',
    predicate: 'schema:depth',
    component: 'p-dimension',
    label: 'Depth',
    unit: 'CMT',
    value: '',
    definition: 'The depth of the item.'
  },
  {
    id: 'weight',
    fieldname: 'Weight',
    predicate: 'schema:weight',
    component: 'p-dimension',
    label: 'Weight',
    unit: 'KGM',
    value: '',
    definition: 'The weight of the item.'
  },
  {
    id: 'duration',
    fieldname: 'Duration',
    predicate: 'schema:duration',
    component: 'p-duration',
    label: 'Duration',
    value: '',
    hideHours: false,
    hideMinutes: false,
    hideSeconds: false,
    definition: 'The duration of the item (movie, audio recording, event, etc.) in ISO 8601 date format.'
  },
  {
    id: 'inscription',
    fieldname: 'Inscription/Stamp',
    predicate: 'vra:hasInscription',
    component: 'p-text-field-suggest',
    suggester: 'inscriptionsuggester',
    multiplicable: true,
    multilingual: true,
    label: 'Inscription/Stamp',
    value: '',
    language: '',
    definition: 'All marks or written words added to the object at the time of production or in its subsequent history, including signatures, dates, dedications, texts, and colophons, as well as marks, such as the stamps of silversmiths, publishers, or printers.'
  },
  {
    id: 'spatial-getty',
    fieldname: 'Place (Getty TGN)',
    predicate: 'spatial',
    component: 'p-spatial-getty',
    multiplicable: true,
    voc: 'tgn',
    label: 'Place',
    value: '',
    type: '',
    disabletype: false,
    'rdfs:label': [],
    'skos:prefLabel': [],
    definition: 'Spatial characteristics of the resource. May be a named place or a location specified by its geographic coordinates.'
  },
  {
    id: 'spatial-text',
    fieldname: 'Place',
    predicate: 'spatial',
    component: 'p-spatial-text',
    multilingual: true,
    multiplicable: true,
    label: 'Place',
    value: '',
    type: '',
    disabletype: false,
    language: '',
    definition: 'Spatial characteristics of the resource. May be a named place or a location specified by its geographic coordinates.'
  },    
  {
    id: 'mime-type',
    fieldname: 'MIME type',
    predicate: 'ebucore:hasMimeType',
    component: 'p-select',
    vocabulary: 'mimetypes',
    label: 'MIME type',
    value: '',
    'skos:prefLabel': [],
    definition: 'The definition of the container if available as a MIME type.'
  },
  {
    id: 'license',
    fieldname: 'License',
    predicate: 'edm:rights',
    component: 'p-select',
    vocabulary: 'licenses',
    label: 'License',
    value: '',
    'skos:prefLabel': [],
    definition: 'The value will indicate the copyright, usage and access rights that apply to this digital representation.'
  },
  {
    id: 'rights',
    fieldname: 'Rights statement',
    predicate: 'dce:rights',
    component: 'p-text-field',
    multiline: true,
    multilingual: true,
    label: 'Rights statement',
    value: '',
    language: '',
    definition: 'Information about rights held in and over the resource. Typically, rights information includes a statement about various property rights associated with the resource, including intellectual property rights.'
  },
  {
    id: 'file',
    fieldname: 'File',
    predicate: 'ebucore:filename',
    component: 'input-file',
    label: 'File to upload',
    value: '',
    definition: 'File input.'
  },
  {
    id: 'filename-readonly',
    fieldname: 'Filename readonly',
    predicate: 'ebucore:filename',
    component: 'p-filename-readonly',
    label: '',
    value: '',
    readonly: true,
    definition: 'Filename readonly.'
  },
  {
    id: 'readonly',
    fieldname: 'Readonly',
    predicate: '',
    component: 'p-unknown-readonly',
    label: '',
    jsonld: '',
    readonly: true,
    definition: 'Readonly.'
  },
  {
    id: 'vocab-ext-readonly',
    fieldname: 'Vocabulary value readonly',
    predicate: 'dcterms:subject',
    type: 'skos:Concept',
    component: 'p-vocab-ext-readonly',
    label: '',
    'skos:prefLabel': [],
    'rdfs:label': [],
    value: '',
    readonly: true,
    definition: 'Vocabulary value readonly.'
  },
  {
    id: 'spatial-getty-readonly',
    fieldname: 'Getty spatial object  readonly',
    predicate: '',
    component: 'p-spatial-getty-readonly',
    label: '',
    'skos:prefLabel': [],
    'rdfs:label': [],
    coordinates: [],
    value: '',
    readonly: true,
    definition: 'Getty spatial object readonly.'
  }
]

const predicateOrder = [

  'dcterms:type',
  'edm:hasType',
  'schema:genre',
  
  'dce:title',
  'role',
  'bf:note',
  'bf:tableOfContents',
  
  'dcterms:language',
  'schema:subtitleLanguage',
  'dce:subject',
  'dcterms:subject',

  'dcterms:date',
  'dcterms:created',
  'dcterms:modified',
  'dcterms:available',
  'dcterms:issued',
  'dcterms:valid',
  'dcterms:dateAccepted',
  'dcterms:dateCopyrighted',
  'dcterms:dateSubmitted',
  'rdau:P60071',
  'phaidra:dateAccessioned',
  'date',

  'edm:rights',
  'dce:rights',
  'dcterms:provenance',

  'dcterms:spatial',
  'vra:placeOfCreation',
  'vra:placeOfRepository',
  'vra:placeOfSite',
  'spatial',

  'schema:numberOfPages',
  'bf:soundCharacteristic',
  'bf:supplementaryContent',
  'bf:awards',
  'dcterms:audience',
  'rdau:P60059',

  'ebucore:filename',
  'ebucore:hasMimeType',

  'opaque:cco_accessionNumber',
  'bf:shelfMark',
  'bf:physicalLocation',

  'vra:hasInscription',
  'vra:material',
  'vra:hasTechnique',
  'dce:format',
  'rdau:P60048',
  'schema:width',
  'schema:height',
  'schema:depth',
  'schema:weight',
  'schema:duration',

  'rdau:P60193',
  'bf:provisionActivity',
  'rdau:P60227',
  'frapo:hasFundingAgency',
  'frapo:isOutputOf',
  'rdax:P00009',
  'citation'
]

export default {
  getFields: function () {
    return fields
  },
  getEditableFields: function () {
    var editable = fields.filter(item => !(item.readonly))
    // hack: some bug in vuetify autocomplete can't handle the value property
    var newarr = []
    for (var i = 0; i < editable.length; i++) {
      var field = JSON.parse(JSON.stringify(editable[i]))
      delete field['value']
      newarr.push(field)
    }
    return newarr;
  },
  getField: function (id, ordergroup) {
    for (var i = 0; i < fields.length; i++) {
      if (fields[i]['id'] === id) {
        var field = JSON.parse(JSON.stringify(fields[i]))
        field.id = field.id + '_' + uuid.generate();
        field.ordergroup = ordergroup
        return field
      }
    }
  },
  getPredicateOrder: function () {
    return predicateOrder
  }
}
