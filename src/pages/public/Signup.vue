<template>
  <div class="signup">
    <h1>Signup</h1>
    {{ errors.message }}
    <el-form ref="verificationForm" label-width="120px">
      <el-form-item label="Country">
        <el-select v-model="country" filterable auto-complete="off">
          <el-option label="Australia" value="AU" />
          <el-option label="Austria" value="AT" />
          <el-option label="Belgium" value="BE" />
          <el-option label="Canada" value="CA" />
          <el-option label="Denmark" value="DK" />
          <el-option label="Finland" value="FI" />
          <el-option label="France" value="FR" />
          <el-option label="Germany" value="DE" />
          <el-option label="Hong Kong" value="HK" />
          <el-option label="Ireland" value="IE" />
          <el-option label="Italy" value="IT" />
          <el-option label="Japan" value="JP" />
          <el-option label="Luxembourg" value="LU" />
          <el-option label="Netherlands" value="NL" />
          <el-option label="New Zealand" value="NZ" />
          <el-option label="Norway" value="NO" />
          <el-option label="Portugal" value="PT" />
          <el-option label="Singapore" value="SG" />
          <el-option label="Spain" value="ES" />
          <el-option label="Sweden" value="SE" />
          <el-option label="Switzerland" value="CH" />
          <el-option label="United Kingdom" value="GB" />
          <el-option label="United States" value="US" />
        </el-select>
      </el-form-item>

      <el-form-item label="Dojo name">
        <el-input placeholder="Please input" v-model="title"></el-input>
      </el-form-item>
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
        <el-button type="primary" @click="signup">Update</el-button>
      </el-form-item>
      {{ errors.message }}
    </el-form>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "signup",
  data() {
    return {
      errors: {},
      country: "Netherlands",
      title: "dffd",
      email: "dffdfd@dfdffd.nl",
      password: "sdsdds"
    };
  },
  methods: {
    signup() {
      this.errors = "";
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($username: String!, $email: String!, $password: String!) {
              signUp(username: $username, email: $email, password: $password) {
                token
              }
            }
          `,
          variables: {
            username: this.title,
            email: this.email,
            password: this.password
          }
        })
        .then(data => {
          console.log("setting token");
          localStorage.setItem("apollo-token", data.data.signUp.token);
          // TODO: redirect to welcome page
        })
        .catch(error => {
          console.log("error", error.graphQLErrors);
          this.errors = error.graphQLErrors[0];
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  border: 1px solid red;
}
</style>
