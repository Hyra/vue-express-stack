<template>
  <div v-loading="$apollo.loading" class="blocker">
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
      <el-col :span="6"><strong>Plan</strong></el-col>
      <el-col :span="18"
        >{{ subscription.plan.product.name }} -
        {{ subscription.plan.nickname }} @
        {{
          parseAmount(
            subscription.plan.amount,
            subscription.plan.currency,
            false
          )
        }}
        / {{ subscription.plan.interval }}</el-col
      >
    </el-row>

    <el-row>
      <el-col :span="6"><strong>Customer</strong></el-col>
      <el-col :span="18">{{ subscription.customer.email }}</el-col>
    </el-row>

    <el-row>
      <el-col :span="6"><strong>Subscribed since</strong></el-col>
      <el-col :span="18">{{ timeDate(subscription.created) }}</el-col>
    </el-row>

    <el-row>
      <el-col :span="6"><strong>Current period</strong></el-col>
      <el-col :span="18"
        >{{ timeDate(subscription.current_period_start) }} to
        {{ timeDate(subscription.current_period_end) }}</el-col
      >
    </el-row>

    <el-row>
      <el-col :span="6"><strong>Billing method</strong></el-col>
      <el-col :span="18">{{ subscription.billing }}</el-col>
    </el-row>

    <hr />

    <h2>Invoices</h2>

    <el-table :data="invoices" style="width: 100%">
      <el-table-column label="Amount" width="100">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          {{ parseAmount(scope.row.amount_due, scope.row.currency, false) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Status" width="120">
      </el-table-column>
      <el-table-column prop="number" label="Invoice Nr." width="180">
      </el-table-column>
      <el-table-column label="Payment due" width="180">
        <template slot-scope="scope">
          {{ timeDate(scope.row.due_date) }}
        </template>
      </el-table-column>
      <el-table-column label="Created">
        <template slot-scope="scope">
          {{ timeDate(scope.row.created) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import gql from "graphql-tag";
// import moment from "moment";
import faker from "faker";

export default {
  name: "Subscription",
  methods: {
    getRandomAmount() {
      return faker.random.number({ min: 5, max: 100 });
    }
  },
  apollo: {
    subscription: {
      query: gql`
        query($dojoSlug: String!, $subscription: String!) {
          subscription: getSubscription(
            dojoSlug: $dojoSlug
            subscription: $subscription
          ) {
            id
            created
            days_until_due
            billing
            current_period_start
            current_period_end
            customer {
              id
              email
            }
            plan {
              id
              nickname
              interval
              interval_count
              amount
              currency
              product {
                id
                name
              }
            }
          }
        }
      `,
      variables() {
        return {
          dojoSlug: this.$route.params.dojoSlug,
          subscription: this.$route.params.subscription
        };
      },
      error(error) {
        if (error.message.indexOf("No access") > -1) {
          this.$router.push({
            name: "login"
          });
        }
      }
    },
    invoices: {
      query: gql`
        query($dojoSlug: String!, $subscription: String!) {
          invoices: getSubscriptionInvoices(
            dojoSlug: $dojoSlug
            subscription: $subscription
          ) {
            id
            number
            receipt_number
            paid
            status
            amount_due
            amount_paid
            amount_remaining
            total
            subtotal
            billing
            created
            currency
            customer {
              id
              email
            }
            due_date
            invoice_pdf
            period_start
            period_end
          }
        }
      `,
      variables() {
        return {
          dojoSlug: this.$route.params.dojoSlug,
          subscription: this.$route.params.subscription
        };
      },
      error(error) {
        if (error.message.indexOf("No access") > -1) {
          this.$router.push({
            name: "login"
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
