<template>
  <div class="blocker">
    <div class="blocker__header">
      <h1>
        Editing {{ editStudentForm.firstName }} {{ editStudentForm.lastName }}
      </h1>
    </div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <el-form
      ref="editStudentForm"
      :rules="rules"
      :model="editStudentForm"
      label-width="120px"
      label-position="left"
    >
      <el-form-item label="E-mail" prop="email">
        <el-input
          v-model="editStudentForm.email"
          placeholder="Please input"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="Firstname" prop="firstName">
        <el-input
          v-model="editStudentForm.firstName"
          placeholder="Please input"
        ></el-input>
      </el-form-item>
      <el-form-item label="Lastname" prop="lastName">
        <el-input
          v-model="editStudentForm.lastName"
          placeholder="Please input"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="processingForm" type="primary" @click="editStudent"
          >Update</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "StudentEdit",
  apollo: {
    student: {
      query: gql`
        query getStudent($dojoSlug: String!, $student: String!) {
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
      update(data) {
        if (data.student) {
          this.editStudentForm = {
            email: data.student.user.email,
            firstName: data.student.firstName,
            lastName: data.student.lastName
          };
        }
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
  data() {
    return {
      editStudentForm: {
        email: "",
        firstName: "",
        lastName: ""
      },
      rules: {
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
    editStudent() {
      this.errorMessage = "";
      this.processingForm = true;
      this.$refs["editStudentForm"].validate(valid => {
        if (valid) {
          this.$apollo
            .mutate({
              mutation: gql`
                mutation(
                  $dojoSlug: String!
                  $student: String!
                  $firstName: String!
                  $lastName: String!
                ) {
                  editStudent(
                    dojoSlug: $dojoSlug
                    student: $student
                    firstName: $firstName
                    lastName: $lastName
                  ) {
                    stripeId
                    firstName
                    lastName
                  }
                }
              `,
              variables: {
                dojoSlug: this.$route.params.dojoSlug,
                student: this.$route.params.studentId,
                firstName: this.editStudentForm.firstName,
                lastName: this.editStudentForm.lastName
              },
              update: (data, res) => {
                // console.log(res.data.editStudent);
                this.processingForm = false;
                this.$router.push({
                  name: "student",
                  params: {
                    dojoSlug: this.$route.params.dojoSlug,
                    studentId: res.data.editStudent.stripeId
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
