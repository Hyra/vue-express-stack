<template>
  <div class="students">
    <div class="content-box">
      <div class="view-box">
        <div class="container">
          <!-- <h1>Students overview.</h1> -->
          <ul class="studentList">
            <li v-for="student in students" :key="student.id">
              <div class="student__avatar">
                <img
                  :src="`https://robohash.org/${student.user.email}?set=set4`"
                  alt=""
                  width="30"
                />
              </div>
              <div class="student__name">{{ faker.name.findName() }}</div>
              <div class="student__link">
                <router-link
                  :to="{ name: 'student', params: { studentId: student.id } }"
                >
                  View student
                </router-link>
              </div>
            </li>
          </ul>
        </div>
        <div class="aside-sticky">
          <div class="aside-wrap">
            <ul class="aside-actions">
              <li><button @click="loadStudent">Add new student</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
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
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
  box-shadow: 0 0 1px 0 rgba(61, 119, 180, 0.12),
    0 0.25rem 12px 0 rgba(91, 139, 199, 0.24);
  li {
    // margin: 0px 0 20px 0;
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    .student {
      &__avatar {
        width: 50px;
      }
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
