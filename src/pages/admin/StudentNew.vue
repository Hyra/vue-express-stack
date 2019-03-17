<template>
  <div class="students">
    <div class="content-box">
      <div class="view-box">
        <div class="container">
          <!-- <h1>New Student</h1> -->
          <div class="blocker">
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
            <el-form
              ref="newStudentForm"
              :rules="rules"
              :model="newStudentForm"
              label-width="120px"
              label-position="left"
            >
              <el-form-item label="E-mail" prop="email">
                <el-input
                  v-model="newStudentForm.email"
                  placeholder="Please input"
                ></el-input>
              </el-form-item>
              <el-form-item label="Firstname" prop="firstName">
                <el-input
                  v-model="newStudentForm.firstName"
                  placeholder="Please input"
                ></el-input>
              </el-form-item>
              <el-form-item label="Lastname" prop="lastName">
                <el-input
                  v-model="newStudentForm.lastName"
                  placeholder="Please input"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  :loading="processingForm"
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
        firstName: "",
        lastName: ""
      },
      rules: {
        email: [
          { required: true, message: "Please input Email", trigger: "blur" },
          { type: "email", message: "Email is not valid", trigger: "blur" }
        ],
        firstName: [
          { required: true, message: "Please input firstname", trigger: "blur" }
        ],
        lastName: [
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
                  $firstName: String!
                  $lastName: String!
                ) {
                  newStudent(
                    dojoSlug: $dojoSlug
                    email: $email
                    firstName: $firstName
                    lastName: $lastName
                  ) {
                    id
                    stripeId
                  }
                }
              `,
              variables: {
                dojoSlug: this.$route.params.dojoSlug,
                email: this.newStudentForm.email,
                firstName: this.newStudentForm.firstName,
                lastName: this.newStudentForm.lastName
              },
              update: (data, res) => {
                // console.log(res.data.newStudent.id);
                // this.processingForm = false;
                this.$router.push({
                  name: "student",
                  params: {
                    dojoSlug: this.$route.params.dojoSlug,
                    studentId: res.data.newStudent.stripeId
                  }
                });
              }
            })
            .catch(e => {
              this.processingForm = false;
              this.errorMessage = e.message;
            });
        } else {
          this.processingForm = false;
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
