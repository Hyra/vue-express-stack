<template>
  <div class="students-new">
    <h1>New Student</h1>
    <el-form ref="verificationForm" label-width="120px">
      <el-form-item label="E-mail">
        <el-input v-model="email" placeholder="Please input"></el-input>
      </el-form-item>
      <el-form-item label="Firstname">
        <el-input v-model="firstname" placeholder="Please input"></el-input>
      </el-form-item>
      <el-form-item label="Lastname">
        <el-input v-model="lastname" placeholder="Please input"></el-input>
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
