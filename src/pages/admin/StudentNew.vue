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
