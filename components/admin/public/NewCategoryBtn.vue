<template>
  <v-dialog v-model="addCateogryDialog" persistent max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn
        small
        color="primary"
        :text="btnText"
        class="mt-1 px-1"
        @click="addCategory"
        v-on="on"
      >
        Add New Category
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add New Category</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="newCategories.name"
          label="Name"
          outlined
          hint="The name is how it appears on your site."
          persistent-hint
          dense
          required
          clss="my-1"
        ></v-text-field>
        <v-text-field
          v-model="newCategories.slug"
          label="Slug"
          hint="The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens."
          persistent-hint
          outlined
          dense
          clss="my-1"
        ></v-text-field>
        <category-select
          dense
          label="Parent Category"
          outlined
          hint="Categories, unlike tags, can have a hierarchy. You might have a Jazz category, and under that have children categories for Bebop and Big Band. Totally optional."
          persistent-hint
          :value.sync="newCategories.parent"
          clss="my-1"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="addCateogryDialog = false">
          Close
        </v-btn>
        <v-btn color="primary" text @click="addCateogryDialog = false">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CategorySelect from '@/components/admin/post/CategorySelect'

export default {
  name: 'NewCategoryBtn',
  components: { CategorySelect },

  props: {
    btnText: { type: Boolean, default: false },
  },
  data() {
    return {
      newCategories: { name: null, slug: null, parent: null },
      addCateogryDialog: null,
    }
  },
  methods: {
    addCategory() {
      this.newCategories = { name: null, parent: null }
    },
  },
}
</script>

<style scoped></style>
