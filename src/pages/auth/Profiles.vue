<template lang="pug">
  .profiles
    h1 Profiles
    ul
      li(v-for="profile in profiles")
        router-link(v-if="profile.isSensei" :to="{name: 'dashboard', params: {dojoSlug: profile.dojo.handle}}").
          {{ profile.dojo.title }}
        router-link(v-else :to="{name: 'student-dashboard', params: {dojoSlug: profile.dojo.handle}}").
          {{ profile.dojo.title }}
    h2 ME
    pre {{ me }}
    h2 Profiles
    pre {{ profiles }}
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "profiles",
  apollo: {
    profiles: {
      query: gql`
        query {
          profiles {
            id
            isSensei
            dojo {
              id
              title
              handle
            }
          }
        }
      `
    },
    me: {
      query: gql`
        query {
          me {
            id
            email
          }
        }
      `
    }
  }
};
</script>
