<template>
  <div>
    <h1>Forgot password</h1>

    <el-form ref="forgotPasswordForm" label-width="120px" v-if="!requested">
      <el-form-item label="E-mail">
        <el-input placeholder="Please input" v-model="email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="requestPasswordlink"
          >Send me a new password</el-button
        >
      </el-form-item>
    </el-form>

    <div v-else>
      If we can find {{ email }} in our system you will receive an e-mail
      shortly with instructions how to reset your password!
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "forgot-password",
  data() {
    return {
      requested: false,
      email: ""
    };
  },
  methods: {
    requestPasswordlink() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation ForgotPassword($email: String!) {
              forgotPassword(email: $email)
            }
          `,
          variables: {
            email: this.email
          }
        })
        .then(() => {
          this.$router.push({
            to: "/login"
          });
          // this.requested = true;
          // localStorage.setItem("apollo-token", data.data.signIn.token);
          // console.log(data);
          // location.href = `/profiles`;
        })
        .catch(() => {
          // this.errors = {
          //   message: "Invalid email."
          // };
        });
    }
  }
};
</script>
