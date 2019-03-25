<template>
  <div class="blocker">
    <div class="blocker__header">
      <h1>Subscriptions</h1>

      <router-link
        class="no-underline"
        :to="{
          name: 'student-new',
          params: { dojoSlug: $route.params.dojoSlug }
        }"
        ><button>
          <i class="far fa-calendar-alt"></i> Add new subscription
        </button></router-link
      >
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
    </ul>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Subscriptions",
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
    }
  }
};
</script>
