<template>
  <div class="signup">
    <h1>Signup</h1>

    <el-form ref="verificationForm" label-width="120px">
      <el-form-item label="Dojo e-mail">
        <el-input v-model="email" placeholder="Please input"></el-input>
      </el-form-item>

      <el-form-item label="Dojo name">
        <el-input v-model="title" placeholder="Please input"></el-input>
      </el-form-item>

      <el-form-item label="Dojo URL">
        <el-input v-model="handle" placeholder="" @input="checkHandle">
          <template slot="prepend"></template>
          <i
            slot="suffix"
            class="el-input__icon"
            :class="
              handleAvailable ? 'el-icon-check good' : 'el-icon-error error'
            "
          >
          </i>
        </el-input>
      </el-form-item>

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

      <el-form-item label="Password">
        <el-input
          v-model="password"
          placeholder="Please input"
          type="password"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="signup">Get started</el-button>
      </el-form-item>

      <span class="errors">{{ errors.message }}</span>
    </el-form>
  </div>
</template>

<script>
import gql from "graphql-tag";

import faker from "faker";

export default {
  name: "Signup",
  data() {
    return {
      errors: { message: "" },
      country: "NL",
      title: `${faker.hacker.noun()} Dojo`,
      handle: `${faker.hacker.noun()}`,
      email: faker.internet.exampleEmail().toLowerCase(),
      password: "qwertyqwerty",
      handleAvailable: false
    };
  },
  methods: {
    checkHandle() {
      console.log(this.handle);
      this.$apollo
        .query({
          query: gql`
            query checkHandle($handle: String!) {
              isHandleAvailable(handle: $handle) {
                available
              }
            }
          `,
          variables: {
            handle: this.handle
          }
        })
        .then(data => {
          this.handleAvailable = data.data.isHandleAvailable.available;
        });
    },
    signup() {
      this.errors = "";
      if (!this.handleAvailable) {
        this.errors = {
          message: "This handle is already taken."
        };
        return false;
      }
      this.$apollo
        .mutate({
          mutation: gql`
            mutation(
              $country: String!
              $title: String!
              $handle: String!
              $email: String!
              $password: String!
            ) {
              signUp(
                country: $country
                title: $title
                handle: $handle
                email: $email
                password: $password
              ) {
                token
              }
            }
          `,
          variables: {
            country: this.country,
            title: this.title,
            handle: this.handle,
            email: this.email,
            password: this.password
          }
        })
        .then(() => {
          // console.log("setting token");
          // localStorage.setItem("apollo-token", data.data.signUp.token);
          // location.href = `/${this.handle}/`;

          location.href = `/profiles`;
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
  color: red;
}
.good {
  color: green;
}
.errors {
  color: red;
}
</style>
