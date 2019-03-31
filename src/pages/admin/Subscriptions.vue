<template>
  <div class="blocker">
    <el-dialog
      title="Add new subscription"
      :visible.sync="addingSubscription"
      width="40%"
    >
      <el-form
        ref="addSubscriptionForm"
        :rules="addSubscriptionRules"
        :model="addSubscriptionForm"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="Student" prop="student">
          <el-select
            v-model="addSubscriptionForm.student"
            placeholder="Select"
            style="width: 100%"
          >
            <el-option
              v-for="student in students"
              :key="student.stripeId"
              :label="student.user.email"
              :value="student.stripeId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Plan" prop="plan">
          <el-select
            v-model="addSubscriptionForm.plan"
            placeholder="Select"
            style="width: 100%"
          >
            <el-option
              v-for="plan in plans"
              :key="plan.id"
              :label="
                `${plan.product.name} - ${plan.nickname} (${parseAmount(
                  plan.amount,
                  plan.currency,
                  false
                )} / ${plan.interval})`
              "
              :value="plan.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Start date" prop="startDate">
          <el-date-picker
            v-model="addSubscriptionForm.startDate"
            type="date"
            placeholder="Pick a day"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addingSubscription = false">Never mind</el-button>
        <el-button
          :loading="$apollo.loading"
          type="primary"
          @click="doAddSubscription"
          >Create subscription</el-button
        >
      </span>
    </el-dialog>
    <div class="blocker__header">
      <h1>Subscriptions</h1>
      <button @click="openAddSubscriptionDialog">
        <i class="far fa-calendar-alt"></i> Add new subscription
      </button>
    </div>
    <ul class="list">
      <li>
        <div class="flexer">
          <div><strong>Student</strong></div>
          <div><strong>Status</strong></div>
          <div><strong>Membership plan</strong></div>
          <div><strong>Billing</strong></div>
        </div>
      </li>
      <li v-for="subscription in subscriptions" :key="subscription.id">
        <router-link
          class="flexer"
          :to="{
            name: 'subscription',
            params: { subscription: subscription.id }
          }"
        >
          <div>{{ subscription.customer.email }}</div>
          <div>{{ subscription.status }}</div>
          <div>
            {{ subscription.plan.product.name }} -
            {{ subscription.plan.nickname }}
          </div>
          <div>{{ subscription.billing }}</div>
        </router-link>
      </li>
      <li v-if="subscriptions && !subscriptions.length">
        <center>
          <br />
          You have not created any subscriptions for your students yet.
        </center>
      </li>
    </ul>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Subscriptions",
  data() {
    return {
      errorMessage: "",
      processingForm: false,
      addingSubscription: false,
      addSubscriptionRules: {
        student: [
          {
            required: true,
            message: "Please select a student",
            trigger: "blur"
          }
        ],
        plan: [
          { required: true, message: "Please select a plan", trigger: "blur" }
        ],
        startDate: [
          {
            required: true,
            message: "Please select a start date",
            trigger: "blur"
          }
        ]
      },
      addSubscriptionForm: {
        student: "",
        plan: "",
        startDate: ""
      }
    };
  },
  methods: {
    openAddSubscriptionDialog() {
      this.errorMessage = "";
      this.addingSubscription = true;
    },
    doAddSubscription() {
      this.errorMessage = "";
      this.processingForm = true;
      this.$refs["addSubscriptionForm"].validate(valid => {
        if (valid) {
          this.$apollo.mutate({
            mutation: gql`
              mutation(
                $dojoSlug: String!
                $student: String!
                $plan: String!
                $start: Int!
              ) {
                addStudentSubscription(
                  dojoSlug: $dojoSlug
                  student: $student
                  plan: $plan
                  start: $start
                ) {
                  result
                  message
                }
              }
            `,
            variables: {
              dojoSlug: this.$route.params.dojoSlug,
              student: this.addSubscriptionForm.student,
              plan: this.addSubscriptionForm.plan,
              start:
                new Date(this.addSubscriptionForm.startDate).getTime() / 1000 -
                new Date(
                  this.addSubscriptionForm.startDate
                ).getTimezoneOffset() *
                  1000
            },
            update: () => {
              this.$apollo.queries.subscriptions.refetch().then(() => {
                this.addSubscriptionForm = {
                  student: "",
                  plan: "",
                  startDate: ""
                };
                this.addingSubscription = false;
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
      });
    }
  },
  apollo: {
    subscriptions: {
      query: gql`
        query($dojoSlug: String!) {
          subscriptions: getSubscriptions(dojoSlug: $dojoSlug) {
            id
            created
            days_until_due
            current_period_start
            current_period_end
            status
            billing
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
          dojoSlug: this.$route.params.dojoSlug
        };
      }
    },
    students: {
      query: gql`
        query($dojoSlug: String!) {
          students: getStudents(dojoSlug: $dojoSlug) {
            id
            stripeId
            user {
              email
            }
          }
        }
      `,
      variables() {
        return {
          dojoSlug: this.$route.params.dojoSlug
        };
      }
    },
    plans: {
      query: gql`
        query($dojoSlug: String!) {
          plans: getPlans(dojoSlug: $dojoSlug) {
            id
            nickname
            amount
            currency
            interval
            product {
              name
            }
          }
        }
      `,
      variables() {
        return {
          dojoSlug: this.$route.params.dojoSlug
        };
      }
    }
  }
};
</script>

<style lang="scss">
.el-picker-panel__icon-btn {
  box-shadow: none;
}
.el-date-table td span {
  font-size: 14px;
}
</style>
