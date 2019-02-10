<template>
  <div>
    <h1>Reset Password</h1>

    <el-form ref="resetPasswordForm" label-width="120px">
      <el-form-item label="New password">
        <el-input placeholder="Please input" v-model="newPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetPassword"
          >Reset password</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "reset-password",
  data() {
    return {
      newPassword: ""
    };
  },
  mounted() {
    this.$apollo.mutate({
      mutation: gql`
        mutation validateResetPasswordToken($userId: Int!, $token: String!) {
          validateResetPasswordToken(userId: $userId, token: $token)
        }
      `,
      variables: {
        userId: parseInt(this.$route.params.userId),
        token: this.$route.params.token
      },
      error(error) {
        console.log(error);
      }
    });
  },
  methods: {
    resetPassword() {
      this.$apollo.mutate({
        mutation: gql`
          mutation resetPasswordMutation(
            $userId: Int!
            $token: String!
            $newPassword: String!
          ) {
            resetPassword(
              userId: $userId
              token: $token
              newPassword: $newPassword
            )
          }
        `,
        variables: {
          userId: parseInt(this.$route.params.userId),
          token: this.$route.params.token,
          newPassword: this.newPassword
        },
        error(error) {
          console.log(error);
        }
      });
    }
  }
};
</script>
