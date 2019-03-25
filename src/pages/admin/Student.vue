<template>
  <div v-if="student" class="blocker">
    <div class="blocker__header">
      <h1>{{ student.firstName }} {{ student.lastName }}</h1>
      <router-link
        class="no-underline"
        :to="{
          name: 'student-edit',
          params: {
            dojoSlug: $route.params.dojoSlug,
            studentId: $route.params.studentId
          }
        }"
        ><button><i class="fas fa-edit"></i> Edit</button></router-link
      >
    </div>
    Joined {{ joinDateAgo }} at {{ joinDate }}
  </div>
</template>

<script>
import gql from "graphql-tag";
import moment from "moment";

export default {
  name: "Student",
  apollo: {
    student: {
      query: gql`
        query getStudents($dojoSlug: String!, $student: String!) {
          student: getStudent(dojoSlug: $dojoSlug, student: $student) {
            stripeId
            isSensei
            firstName
            lastName
            createdAt
            user {
              email
            }
          }
        }
      `,
      variables() {
        return {
          dojoSlug: this.$route.params.dojoSlug,
          student: this.$route.params.studentId
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
  },
  computed: {
    joinDateAgo() {
      return moment(parseInt(this.student.createdAt)).fromNow();
    },
    joinDate() {
      return moment(parseInt(this.student.createdAt)).format("MMMM Do YYYY");
    }
  }
};
</script>
