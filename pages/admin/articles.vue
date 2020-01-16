<template>
  <div>
    <v-card class="elevation-1 mx-8 my-8">
      <v-card-title>
        <v-container fluid>
          <v-row justify="start">
            <v-col cols="12" sm="6" md="3" xl="2">
              <v-text-field
                v-model="search.text"
                :prepend-icon="mdiMagnify"
                label="Search"
                hide-details
                clearable
              />
            </v-col>

            <v-col cols="12" sm="6" md="3" xl="2">
              <category-select :chosen.sync="search.category" />
            </v-col>

            <v-col cols="12" sm="6" md="3" xl="2" align-self="end">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="search.postDate"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dateRangeText"
                    label="Post Date"
                    :prepend-icon="mdiCalendar"
                    readonly
                    hide-details
                    clearable
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="search.postDate"
                  type="month"
                  color="primary"
                  range
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(search.postDate)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="3" lg="2" xl="1" align-self="end">
              <v-btn small @click="query">Search</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>
      <v-divider />
      <v-data-table
        :headers="headers"
        :items="articles"
        :options.sync="options"
        :server-items-length="total"
        :loading="loading"
      >
        <template v-slot:header.views>
          <v-icon small title="views" v-text="mdiChartBar" />
        </template>
        <template v-slot:header.commentAmount>
          <v-icon small title="comments" v-text="mdiMessageReply" />
        </template>

        <template v-slot:item.tags="{ item }">
          <v-chip
            v-for="(tag, index) in item.tags"
            :key="index"
            class="mr-2"
            x-small
          >
            {{ tag.name }}
          </v-chip>
        </template>
        <template v-slot:item.postDate="{ item }">
          <span :title="$moment(item.postDate).format('YYYY-MM-DD HH:mm:ss')">
            {{ $moment(item.postDate).format('YYYY-MM-DD') }}
          </span>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon
            small
            class="mr-2"
            title="edit"
            @click="edit(item.id)"
            v-text="mdiPencil"
          />
          <v-icon
            small
            title="delete"
            @click="deleteItem(item.id)"
            v-text="mdiDelete"
          />
        </template> </v-data-table
    ></v-card>
  </div>
</template>

<script>
import {
  mdiDelete,
  mdiPencil,
  mdiChartBar,
  mdiMessageReply,
  mdiMagnify,
  mdiCalendar
} from '@mdi/js'
import CategorySelect from '@/components/admin/article/CategorySelect'

export default {
  name: 'List',
  layout: 'Admin',
  components: { CategorySelect },
  data() {
    return {
      mdiPencil,
      mdiDelete,
      mdiChartBar,
      mdiMessageReply,
      mdiMagnify,
      mdiCalendar,
      menu: false,
      search: { text: null, category: null, postDate: [] },
      total: 0,
      articles: [],
      loading: true,
      options: {},
      headers: [
        {
          text: 'Actions',
          value: 'action',
          sortable: false,
          width: 80
        },
        { text: 'Title', value: 'title' },
        {
          text: 'Category',
          value: 'category.name',
          sortable: false,
          width: 110
        },
        { text: 'Tags', value: 'tags', sortable: false, width: '20%' },
        { text: 'Views', value: 'views', width: 90 },
        { text: 'Comments', value: 'commentAmount', width: 120 },
        { text: 'Post Date', value: 'postDate', align: 'center', width: 120 }
      ]
    }
  },
  computed: {
    dateRangeText: {
      get() {
        return this.search.postDate.join(' ~ ')
      },
      set(value) {
        this.search.postDate = value || []
      }
    }
  },
  watch: {
    options: {
      handler() {
        this.getData()
      },
      deep: true
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true
      const { content, totalElements } = await this.$axios.$get(
        '/api/article-api/admin/articles',
        {
          params: this.options
        }
      )
      this.articles = content
      this.total = totalElements
      this.loading = false
    },
    getDesserts() {
      return []
    },
    edit(id) {
      console.log(`edit:${id}`)
    },
    deleteItem(id) {
      console.log(`delete:${id}`)
    },
    setDateRangeText(v) {
      this.search.postDate = v
    },
    query() {}
  },
  head() {
    return {
      title: 'Article List',
      meta: [
        {
          hid: 'Article List',
          name: 'Article List',
          content: 'Article List'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.search-input {
  max-width: 300px;
}
</style>
