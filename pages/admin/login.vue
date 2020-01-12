<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" lg="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Admin Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    name="Username"
                    type="text"
                    autofocus
                  >
                    <template v-slot:prepend>
                      <v-icon v-text="mdiAccount" />
                    </template>
                  </v-text-field>

                  <v-text-field
                    label="Password"
                    name="password"
                    type="password"
                  >
                    <template v-slot:prepend>
                      <v-icon v-text="mdiLock" />
                    </template>
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mdiAccount, mdiLock } from '@mdi/js'

export default {
  name: 'Login',
  layout: 'Admin',
  data() {
    return { mdiAccount, mdiLock, source: '1' }
  },
  head() {
    return {
      title: 'login',
      meta: [
        {
          hid: 'login',
          name: 'login',
          content: 'admin login'
        }
      ]
    }
  }
}
</script>
