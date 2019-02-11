<template lang="pug">
  .profiles
    p We found the following profiles for your account. Choose which one you want to access.
    ul
      li(v-for="profile in profiles")
        router-link(v-if="profile.isSensei" :to="{name: 'dashboard', params: {dojoSlug: profile.dojo.handle}}").
          {{ profile.dojo.title }}
        router-link(v-else :to="{name: 'student-dashboard', params: {dojoSlug: profile.dojo.handle}}").
          {{ profile.dojo.title }}
    //- h2 ME
    //- pre {{ me }}
    //- h2 Profiles
    //- pre {{ profiles }}
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Profiles",
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
      `,
      result(data) {
        if (data.data.profiles.length === 1) {
          const profile = data.data.profiles[0];

          if (profile.isSensei) {
            this.$router.push({
              name: "dashboard",
              params: { dojoSlug: profile.dojo.handle }
            });
          } else {
            this.$router.push({
              name: "student-dashboard",
              params: { dojoSlug: profile.dojo.handle }
            });
          }
        }
      }
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
