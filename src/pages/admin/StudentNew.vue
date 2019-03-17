<template>
  <div class="students">
    <div class="content-box">
      <div class="view-box">
        <div class="container">
          <!-- <h1>New Student</h1> -->
          <div class="holder">
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
            <el-form
              ref="newStudentForm"
              :rules="rules"
              :model="newStudentForm"
              label-width="120px"
              label-position="top"
            >
              <el-form-item label="E-mail" prop="email">
                <el-input
                  v-model="newStudentForm.email"
                  placeholder="Please input"
                ></el-input>
              </el-form-item>
              <el-form-item label="Firstname" prop="firstname">
                <el-input
                  v-model="newStudentForm.firstname"
                  placeholder="Please input"
                ></el-input>
              </el-form-item>
              <el-form-item label="Lastname" prop="lastname">
                <el-input
                  v-model="newStudentForm.lastname"
                  placeholder="Please input"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  :loading="this.processingForm"
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
      newStudentForm: {
        email: "",
        firstname: "",
        lastname: ""
      },
      rules: {
        email: [
          { required: true, message: "Please input Email", trigger: "blur" },
          { type: "email", message: "Email is not valid", trigger: "blur" }
        ],
        firstname: [
          { required: true, message: "Please input firstname", trigger: "blur" }
        ],
        lastname: [
          { required: true, message: "Please input lastname", trigger: "blur" }
        ]
      },
      processingForm: false,
      errorMessage: ""
    };
  },
  methods: {
    addStudent() {
      this.errorMessage = "";
      this.processingForm = true;
      this.$refs["newStudentForm"].validate(valid => {
        if (valid) {
          this.$apollo
            .mutate({
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
                email: this.newStudentForm.email,
                firstname: this.newStudentForm.firstname,
                lastname: this.newStudentForm.lastname
              },
              update: () => {
                // this.processingForm = false;
                this.$router.push({
                  name: "students",
                  dojoSlug: this.$route.params.dojoSlug
                });
              }
            })
            .catch(e => {
              this.processingForm = false;
              this.errorMessage = e.message;
            });
        } else {
          return false;
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
