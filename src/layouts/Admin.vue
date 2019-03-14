<template>
  <div>
    <header>
      <router-link to="/">Home</router-link> |

      <router-link :to="{ name: 'dashboard' }">dashboard</router-link> |
      <router-link :to="{ name: 'students' }">students</router-link> |
      <router-link :to="{ name: 'student', params: { studentId: 666 } }"
        >student</router-link
      >
      | <router-link :to="{ name: 'student-new' }">student-new</router-link> |
      <router-link :to="{ name: 'invoices' }">invoices</router-link> |
      <router-link :to="{ name: 'invoice', params: { invoiceId: 222 } }"
        >invoice</router-link
      >
      |
      <router-link :to="{ name: 'contribution-plans' }"
        >contribution-plans</router-link
      >
      |
      <router-link :to="{ name: 'plan', params: { planId: 333 } }"
        >plan</router-link
      >
      |
      <router-link :to="{ name: 'subscriptions' }">subscriptions</router-link> |
      <router-link :to="{ name: 'balance' }">balance</router-link> |
      <router-link :to="{ name: 'payouts' }">payouts</router-link> |
      <router-link :to="{ name: 'transactions' }">transactions</router-link> |
      <router-link :to="{ name: 'settings' }">settings</router-link> |
      <router-link :to="{ name: 'paymentsettings' }"
        >paymentsettings</router-link
      >
      |
    </header>
    <router-view />
  </div>
</template>

<style lang="scss">
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  background: #fff url(/images/logo.svg) center center no-repeat;
  border-bottom: 1px solid #f3f3ff;
}
</style>
