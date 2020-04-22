<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn small color="primary" class="mt-1 px-1" @click="addTag" v-on="on">
        Add New Tag
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add New Tag</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="newTag.name"
          label="Name"
          hint="The name is how it appears on your site."
          persistent-hint
          outlined
          dense
          required
          clss="my-1"
        ></v-text-field>
        <v-text-field
          v-model="newTag.slug"
          label="Slug"
          hint="The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens."
          persistent-hint
          outlined
          dense
          clss="my-1"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="primary" text @click="dialog = false">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'NewTagBtn',
  data() {
    return {
      newTag: { name: null, slug: null, parent: null },
      dialog: null,
    }
  },
  methods: {
    addTag() {
      this.newTag = { name: null, parent: null }
    },
  },
}
</script>

<style scoped></style>
