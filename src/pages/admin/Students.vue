<template>
  <div class="blocker">
    <ul class="studentList">
      <li v-for="student in students" :key="student.stripeId">
        <!-- <div class="student__avatar">
                <img
                  :src="`https://robohash.org/${student.user.email}?set=set4`"
                  alt=""
                  width="30"
                />
              </div> -->
        <div class="student__name">{{ faker.name.findName() }}</div>
        <div class="student__link">
          <!-- {{ student }} -->
          <router-link
            :to="{
              name: 'student',
              params: { studentId: student.stripeId }
            }"
          >
            <i class="fas fa-external-link-alt"></i>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import gql from "graphql-tag";
import faker from "faker";

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
  },
  computed: {
    faker() {
      return faker;
    }
  },
  methods: {
    loadStudent() {
      this.$router.push({
        name: "student-new",
        dojoSlug: this.$route.params.dojoSlug
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.studentList {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    // margin: 0px 0 20px 0;
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    .student {
      // &__avatar {
      //   width: 50px;
      // }
      &__name {
        flex: 1;
        // font-weight: 600;
      }
      &__link a {
        font-size: 14px;
      }
    }
    a {
      padding-left: 20px;
      text-decoration: none;
      color: #434343;
      // font-weight: bold;
      // font-size: 16px;
    }
  }
}
</style>
