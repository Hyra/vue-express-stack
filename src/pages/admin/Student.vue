<template>
  <div class="student">
    <div class="content-box">
      <div class="view-box">
        <div v-loading="$apollo.loading" class="container">
          <!-- <h1>New Student</h1> -->
          <div v-if="student" class="blocker">
            <div class="blocker__header">
              <h1>{{ student.firstName }} {{ student.lastName }}</h1>
              <span> <v-icon name="pencil-alt" scale="1" /> </span>
            </div>
            Joined {{ joinDateAgo }} at {{ joinDate }}
          </div>
        </div>
        <div class="aside-sticky"><div class="aside-wrap"></div></div>
      </div>
    </div>
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
