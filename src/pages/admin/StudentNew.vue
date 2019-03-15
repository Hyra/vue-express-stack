<template>
  <div class="students">
    <div class="content-box">
      <div class="view-box">
        <div class="container">
          <!-- <h1>New Student</h1> -->
          <div class="holder">
            <el-form
              ref="verificationForm"
              label-width="120px"
              label-position="top"
            >
              <el-form-item label="E-mail">
                <el-input v-model="email" placeholder="Please input"></el-input>
              </el-form-item>
              <el-form-item label="Firstname">
                <el-input
                  v-model="firstname"
                  placeholder="Please input"
                ></el-input>
              </el-form-item>
              <el-form-item label="Lastname">
                <el-input
                  v-model="lastname"
                  placeholder="Please input"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  v-loading="this.$apollo.loading"
                  type="primary"
                  @click="addStudent"
                  >Add student</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="aside-sticky"><div class="aside-wrap"></div></div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "StudentsNew",
  data() {
    return {
      email: "a",
      firstname: "a",
      lastname: "a"
    };
  },
  methods: {
    addStudent() {
      this.$apollo.mutate({
        mutation: gql`
          mutation(
            $dojoSlug: String!
            $email: String!
            $firstname: String!
            $lastname: String!
          ) {
            newStudent(
              dojoSlug: $dojoSlug
              email: $email
              firstname: $firstname
              lastname: $lastname
            ) {
              id
              stripeId
            }
          }
        `,
        variables: {
          dojoSlug: this.$route.params.dojoSlug,
          email: this.email,
          firstname: this.firstname,
          lastname: this.lastname
        },
        update: () => {
          this.$router.push({
            name: "students",
            dojoSlug: this.$route.params.dojoSlug
          });
          // console.log(store);
          // console.log(newStudent);
          // this.$emit("myEvent");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.holder {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
  box-shadow: 0 0 1px 0 rgba(61, 119, 180, 0.12),
    0 0.25rem 12px 0 rgba(91, 139, 199, 0.24);
  padding: 20px;
}
</style>
