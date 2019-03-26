<template>
  <div class="blocker">
    <div class="blocker__header">
      <h1>Subscription</h1>
      <router-link
        class="no-underline"
        :to="{
          name: 'student-edit',
          params: {
            dojoSlug: $route.params.dojoSlug,
            studentId: $route.params.studentId
          }
        }"
        ><button type="danger">
          <i class="fas fa-trash-alt"></i> Cancel Subscription
        </button></router-link
      >
    </div>

    <el-row>
      <el-col :span="6"><strong>Customer</strong></el-col>
      <el-col :span="18">Someone here</el-col>
    </el-row>

    <el-row>
      <el-col :span="6"><strong>Subscribed since</strong></el-col>
      <el-col :span="18">March 20, 2018</el-col>
    </el-row>

    <el-row>
      <el-col :span="6"><strong>Current period</strong></el-col>
      <el-col :span="18">February 24, 2019 to February 31, 2019</el-col>
    </el-row>

    <el-row>
      <el-col :span="6"><strong>Billing method</strong></el-col>
      <el-col :span="18">Send invoice</el-col>
    </el-row>

    <hr />

    <h2>Invoices</h2>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="amount" label="Amount" width="100">
      </el-table-column>
      <el-table-column prop="status" label="Status" width="120">
      </el-table-column>
      <el-table-column prop="invoice_nr" label="Invoice Nr." width="180">
      </el-table-column>
      <el-table-column prop="payment_due" label="Payment due" width="180">
      </el-table-column>
      <el-table-column prop="created" label="Created"> </el-table-column>
    </el-table>

    <!-- 
    <el-row>
      <el-col :span="4"><strong>Amount</strong></el-col>
      <el-col :span="4"><strong>Status</strong></el-col>
      <el-col :span="4"><strong>Invoice Nr.</strong></el-col>
      <el-col :span="4"><strong>Payment due</strong></el-col>
      <el-col :span="4"><strong>Created</strong></el-col>
    </el-row>
    <el-row v-for="item in 10">
      <el-col :span="4">€ {{ getRandomAmount() }}</el-col>
      <el-col :span="4">Open</el-col>
      <el-col :span="4">5EB33C4-0001</el-col>
      <el-col :span="4">April 25, 2019</el-col>
      <el-col :span="4">March 25, 2019</el-col>
    </el-row> -->

    <!-- <strong>Next invoice</strong><br />
    €30.00 on Mar 31, 2019 -->
  </div>
</template>

<script>
// import gql from "graphql-tag";
// import moment from "moment";
import faker from "faker";

export default {
  name: "Subscription",
  computed: {
    tableData() {
      return [
        {
          amount: `€${faker.random.number({ min: 5, max: 100 })}`,
          status: "Open",
          invoice_nr: "5EB33C4-0001",
          payment_due: "April 25, 2019",
          created: "March 25, 2019"
        },
        {
          amount: `€${faker.random.number({ min: 5, max: 100 })}`,
          status: "Open",
          invoice_nr: "5EB33C4-0001",
          payment_due: "April 25, 2019",
          created: "March 25, 2019"
        },
        {
          amount: `€${faker.random.number({ min: 5, max: 100 })}`,
          status: "Open",
          invoice_nr: "5EB33C4-0001",
          payment_due: "April 25, 2019",
          created: "March 25, 2019"
        },
        {
          amount: `€${faker.random.number({ min: 5, max: 100 })}`,
          status: "Open",
          invoice_nr: "5EB33C4-0001",
          payment_due: "April 25, 2019",
          created: "March 25, 2019"
        }
      ];
    }
  },
  methods: {
    getRandomAmount() {
      return faker.random.number({ min: 5, max: 100 });
    }
  },
  apollo: {
    // student: {
    //   query: gql`
    //     query getStudents($dojoSlug: String!, $student: String!) {
    //       student: getStudent(dojoSlug: $dojoSlug, student: $student) {
    //         stripeId
    //         isSensei
    //         firstName
    //         lastName
    //         createdAt
    //         user {
    //           email
    //         }
    //       }
    //     }
    //   `,
    //   variables() {
    //     return {
    //       dojoSlug: this.$route.params.dojoSlug,
    //       student: this.$route.params.studentId
    //     };
    //   },
    //   error(error) {
    //     if (error.message.indexOf("No access") > -1) {
    //       this.$router.push({
    //         name: "login"
    //       });
    //     }
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped></style>
