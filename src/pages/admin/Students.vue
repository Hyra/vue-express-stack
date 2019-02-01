<template>
  <div class="students">
    <h1>Students</h1>
    <ul>
      <li v-for="student in students" :key="student.id">{{ student }}</li>
    </ul>
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
      },
      error(error) {
        if (error.message.indexOf("No access") > -1) {
          this.$router.push({
            name: "login"
          });
        }
      }
    }
  }
};
</script>
