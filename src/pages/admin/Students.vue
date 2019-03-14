<template>
  <div class="students">
    <div class="content-box">
      <div class="view-box">
        <div class="container">
          <h1>Students</h1>
          <ul>
            <li v-for="student in students" :key="student.id" class="blsock">
              <router-link
                :to="{ name: 'student', params: { studentId: student.id } }"
                >Load student</router-link
              >
              {{ student }}
            </li>
          </ul>
        </div>
        <div class="aside-sticky"><div class="aside-wrap">ASIDE</div></div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Students",
  apollo: {
    students: {
      query: gql`
        query getStudents($dojoSlug: String!) {
          students: getStudents(dojoSlug: $dojoSlug) {
            id
            stripeId
            isSensei
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
