<template>
  <div>
    <h1>Log in</h1>

    <el-form ref="verificationForm" label-width="120px">
      <el-form-item label="E-mail">
        <el-input placeholder="Please input" v-model="email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          placeholder="Please input"
          type="password"
          v-model="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">Login</el-button>
      </el-form-item>
    </el-form>
    <span class="errors">{{ errors.message }}</span>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "login",
  data() {
    return {
      email: "sensei@testdojo.nl",
      password: "testtest",
      errors: {
        message: ""
      }
    };
  },
  methods: {
    login() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation signIn($email: String!, $password: String!) {
              signIn(email: $email, password: $password) {
                token
              }
            }
          `,
          variables: {
            email: this.email,
            password: this.password
          }
        })
        .then(data => {
          // localStorage.setItem("apollo-token", data.data.signIn.token);
          console.log(data);
          location.href = `/profiles`;
        })
        .catch(() => {
          this.errors = {
            message: "Invalid login."
          };
        });
    }
  }
};
</script>
