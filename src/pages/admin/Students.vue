<template>
  <div class="students">
    <h1>Students</h1>
    <pre>{{ students }}</pre>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "students",
  apollo: {
    students: {
      query: gql`
        query getStudents($dojoSlug: String!) {
          students: getStudents(dojoSlug: $dojoSlug) {
            id
            stripeId
            user {
              id
              email
            }
          }
        }
      `,
      variables() {
        return {
          dojoSlug: this.$route.params.dojoSlug
        };
      }
    }
  }
};
</script>
