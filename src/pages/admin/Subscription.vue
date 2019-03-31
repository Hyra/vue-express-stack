<template>
  <div v-if="subscription" v-loading="$apollo.loading" class="blocker">
    <el-dialog
      title="Cancel subscription"
      :visible.sync="cancelingSubscription"
      width="30%"
    >
      <el-form
        ref="cancelSubscription"
        :rules="cancelSubscriptionRules"
        :model="cancelSubscriptionForm"
        label-width="120px"
        label-position="left"
      >
        When do you want this subscription to end? <br /><br />
        <el-radio
          v-model="cancelSubscriptionForm.cancelImmediately"
          :label="true"
          >Cancel immediately</el-radio
        >
        <br /><br />
        <el-radio
          v-model="cancelSubscriptionForm.cancelImmediately"
          :label="false"
          >Cancel at the end of the current period on
          {{ timeDate(subscription.current_period_end) }}</el-radio
        >
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelingSubscription = false">Never mind</el-button>
        <el-button
          :loading="$apollo.loading"
          type="primary"
          @click="doCancelSubscription"
          >Cancel subscription</el-button
        >
      </span>
    </el-dialog>

    <div class="blocker__header">
      <h1>Subscription</h1>
      <button type="danger" @click="openCancelSubscriptionDialog">
        <i class="fas fa-trash-alt"></i> Cancel Subscription
      </button>
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
// import faker from "faker";

export default {
  name: "Subscription",
  data() {
    return {
      cancelingSubscription: false,
      cancelSubscriptionRules: {},
      cancelSubscriptionForm: {
        cancelImmediately: true
      }
    };
  },
  methods: {
    openCancelSubscriptionDialog() {
      this.cancelingSubscriptionForm = {
        cancelImmediately: true
      };
      this.cancelingSubscription = true;
    },
    doCancelSubscription() {
      this.$apollo.mutate({
        mutation: gql`
          mutation(
            $dojoSlug: String!
            $subscription: String!
            $cancelImmediately: Boolean!
          ) {
            deleteStudentSubscription(
              dojoSlug: $dojoSlug
              subscription: $subscription
              cancelImmediately: $cancelImmediately
            ) {
              result
              message
            }
          }
        `,
        variables: {
          dojoSlug: this.$route.params.dojoSlug,
          subscription: this.$route.params.subscription,
          cancelImmediately: this.cancelSubscriptionForm.cancelImmediately
        },
        update: () => {
          this.$router.push({
            name: "subscriptions"
          });
        },
        error(error) {
          if (error.message.indexOf("No access") > -1) {
            this.$router.push({
              name: "login"
            });
          }
        }
      });
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
